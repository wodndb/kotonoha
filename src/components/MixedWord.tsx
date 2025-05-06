import { cn } from "@/lib/utils";

interface WordProps {
  wordComponents: {
    char: string;
    reading: string;
    type: "kanji" | "hiragana";
  }[];
  isCorrect?: boolean;
}

export default function MixedWord({ wordComponents, isCorrect }: WordProps) {
  return (
    <div
      className={cn("flex border divide-x rounded-lg", {
        "border-gray-300 divide-gray-300": isCorrect === undefined,
        "bg-green-100 border-green-500 divide-green-500 ": isCorrect === true,
        "bg-red-100 border-red-500 divide-red-500": isCorrect === false,
      })}
    >
      {wordComponents.map((item, index) => (
        <div
          key={index}
          className="relative w-30 h-30 flex items-center justify-center text-6xl font-medium text-gray-700"
        >
          <div className="absolute w-0 h-full border-dashed border-l border-gray-300 top-0 left-1/2" />
          <div className="absolute w-full h-0 border-dashed border-b border-gray-300 top-1/2 left-0" />
          {item.type === "kanji" && isCorrect !== undefined && (
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl font-normal text-gray-500">
              {item.reading}
            </span>
          )}
          <span className="relative">{item.char}</span>
        </div>
      ))}
    </div>
  );
}
