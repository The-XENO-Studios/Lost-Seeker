import { useState, useEffect } from "react";

interface PropsOptions {
  data: (arg0: string, index: number, isCorrect: boolean) => void;
  index: any;
}

const Option = ({ data, index }: PropsOptions) => {
  const [optionName, setoptionName] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  useEffect(() => {
    data(optionName, index, isCorrect);
  }, [optionName, isCorrect]);
  return (
    <div>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder="Enter an optional answer."
        value={optionName}
        onChange={(e) => setoptionName(e.currentTarget.value)}
      />
    </div>
  );
};

export default Option;
