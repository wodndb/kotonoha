export const ja: {
  id: number;
  type: string;
  word: string;
  reading: string;
  components: { char: string; reading: string; type: "kanji" | "hiragana" }[];
}[] = [
  {
    id: 1,
    type: "kanji",
    word: "間隔",
    reading: "かんかく",
    components: [
      { char: "間", reading: "かん", type: "kanji" },
      { char: "隔", reading: "かく", type: "kanji" },
    ],
  },
  {
    id: 2,
    type: "kanji",
    word: "感激",
    reading: "かんげき",
    components: [
      { char: "感", reading: "かん", type: "kanji" },
      { char: "激", reading: "げき", type: "kanji" },
    ],
  },
  {
    id: 3,
    type: "kanji",
    word: "願望",
    reading: "がんぼう",
    components: [
      { char: "願", reading: "がん", type: "kanji" },
      { char: "望", reading: "ぼう", type: "kanji" },
    ],
  },
  {
    id: 4,
    type: "kanji",
    word: "損害",
    reading: "そんがい",
    components: [
      { char: "損", reading: "そん", type: "kanji" },
      { char: "害", reading: "がい", type: "kanji" },
    ],
  },
  {
    id: 5,
    type: "kanji",
    word: "企画",
    reading: "きかく",
    components: [
      { char: "企", reading: "き", type: "kanji" },
      { char: "画", reading: "かく", type: "kanji" },
    ],
  },
];
