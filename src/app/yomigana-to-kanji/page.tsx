"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MixedWord from "@/components/MixedWord";
import { ja } from "@/dummy/ja";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Kana from "@/components/Kana";

export default function Page() {
  const jaData = ja;
  const [idx, setIdx] = useState<number>(0);
  const [reading, setReading] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReading(e.target.value);
  };

  const handleSubmit = () => {
    setIsCorrect(reading === jaData[idx].word);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      {isCorrect === undefined ? (
        <Kana value={jaData[idx].reading} />
      ) : (
        <MixedWord
          wordComponents={jaData[idx].components}
          isCorrect={isCorrect}
        />
      )}
      {isCorrect === undefined ? (
        <Input
          className="w-48 md:text-2xl md:p-5 text-center"
          title="Reading (hiragana)"
          value={reading}
          onChange={handleInputChange}
        />
      ) : (
        <div
          className={cn("text-2xl", {
            "text-green-500": isCorrect,
            "text-red-500": !isCorrect,
          })}
        >
          {isCorrect ? "정답입니다!" : "틀렸습니다!"}
        </div>
      )}
      {isCorrect === undefined ? (
        <Button onClick={handleSubmit}>제출</Button>
      ) : (
        <div className="text-2xl">
          <Button
            className="ml-2"
            onClick={() => {
              setIdx((prev) => (prev + 1) % jaData.length);
              setIsCorrect(undefined);
              setReading("");
            }}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
}
