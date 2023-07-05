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
        placeholder="Option"
        value={optionName}
        onChange={(e) => setoptionName(e.currentTarget.value)}
      />
    </div>
  );
};

export default Option;
