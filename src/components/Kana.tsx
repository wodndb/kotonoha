interface KanaProps {
  value: string;
}

export default function Kana({ value }: KanaProps) {
  const splitted = value.split("");
  return (
    <div className="flex border divide-x rounded-lg border-gray-300 divide-gray-300">
      {splitted.map((item, index) => (
        <div
          key={index}
          className="relative w-30 h-30 flex items-center justify-center text-6xl font-medium text-gray-700"
        >
          <div className="absolute w-0 h-full border-dashed border-l border-gray-300 top-0 left-1/2" />
          <div className="absolute w-full h-0 border-dashed border-b border-gray-300 top-1/2 left-0" />
          <span className="relative">{item}</span>
        </div>
      ))}
    </div>
  );
}
