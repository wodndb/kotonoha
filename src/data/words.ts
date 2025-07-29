import { prisma } from "@/prisma";
import "server-only";
import { Components, ComponentsSchema } from "./components";
import { Word as PrismaWord } from "@/app/generated/prisma";

export type Word = Pick<
  PrismaWord,
  "text" | "level" | "reading" | "hasKanji"
> & {
  components: Components;
};

export class WordNotFoundError extends Error {
  constructor(id: number) {
    super(`Word with id ${id} not found`);
    this.name = "WordNotFoundError";
  }
}

export class WordValidationError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(`Word validation error: ${message}`);
    this.name = "WordValidationError";
  }
}

export async function getWord(id: number): Promise<Word> {
  try {
    const word = await prisma.word.findUnique({
      where: { id },
    });

    if (!word) {
      throw new WordNotFoundError(id);
    }

    // components는 Json[]이므로 직접 파싱
    let parsedComponents: Components;
    try {
      parsedComponents = ComponentsSchema.parse(word.components);
    } catch (zodError) {
      throw new WordValidationError(
        `Invalid components format for word ${id}`,
        zodError
      );
    }

    return {
      text: word.text,
      level: word.level,
      reading: word.reading,
      hasKanji: word.hasKanji,
      components: parsedComponents,
    };
  } catch (error) {
    if (
      error instanceof WordNotFoundError ||
      error instanceof WordValidationError
    ) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Database error while fetching word ${id}: ${message}`);
  }
}

export async function getWords(): Promise<Word[]> {
  try {
    const words = await prisma.word.findMany({
      orderBy: {
        text: "asc",
      },
    });

    return words.map((word) => {
      try {
        const parsedComponents = ComponentsSchema.parse(word.components);

        return {
          text: word.text,
          level: word.level,
          reading: word.reading,
          hasKanji: word.hasKanji,
          components: parsedComponents,
        };
      } catch (zodError) {
        console.error(`Invalid components for word ${word.id}:`, zodError);
        // 실패한 경우 기본값 반환
        return {
          text: word.text,
          level: word.level,
          reading: word.reading,
          hasKanji: word.hasKanji,
          components: [], // 기본값
        };
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Database error while fetching words: ${message}`);
  }
}

export async function addWord(data: Word): Promise<void> {
  try {
    await prisma.word.create({
      data: {
        text: data.text,
        level: data.level,
        reading: data.reading,
        hasKanji: data.hasKanji,
        components: data.components, // 타입 검사로 이미 안전함
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Database error while creating word: ${message}`);
  }
}

export async function updateWord(
  id: number,
  data: Partial<Word>
): Promise<void> {
  try {
    // 단어 존재 확인
    const existingWord = await prisma.word.findUnique({
      where: { id },
    });

    if (!existingWord) {
      throw new WordNotFoundError(id);
    }

    // components가 있는 경우만 업데이트 (타입 검사로 이미 안전함)
    await prisma.word.update({
      where: { id },
      data: {
        ...(data.text !== undefined && { text: data.text }),
        ...(data.level !== undefined && { level: data.level }),
        ...(data.reading !== undefined && { reading: data.reading }),
        ...(data.hasKanji !== undefined && { hasKanji: data.hasKanji }),
        ...(data.components !== undefined && { components: data.components }),
      },
    });
  } catch (error) {
    if (error instanceof WordNotFoundError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Database error while updating word ${id}: ${message}`);
  }
}

export async function deleteWord(id: number): Promise<void> {
  try {
    // 단어 존재 확인
    const existingWord = await prisma.word.findUnique({
      where: { id },
    });

    if (!existingWord) {
      throw new WordNotFoundError(id);
    }

    await prisma.word.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof WordNotFoundError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Database error while deleting word ${id}: ${message}`);
  }
}

// 트랜잭션을 사용한 배치 작업 (모두 성공하거나 모두 실패)
export async function addWords(words: Word[]): Promise<void> {
  try {
    await prisma.$transaction(async (tx) => {
      for (const word of words) {
        await tx.word.create({
          data: {
            text: word.text,
            level: word.level,
            reading: word.reading,
            hasKanji: word.hasKanji,
            components: word.components,
          },
        });
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Batch insert failed: ${message}`);
  }
}

// 개별 처리 (일부 실패해도 성공한 것은 유지)
export async function addWordsIndividually(
  words: Word[]
): Promise<{ success: number; failed: number; errors: string[] }> {
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const word of words) {
    try {
      await addWord(word);
      success++;
    } catch (error) {
      failed++;
      const message = error instanceof Error ? error.message : "Unknown error";
      errors.push(`Failed to add word "${word.text}": ${message}`);
    }
  }

  return { success, failed, errors };
}
