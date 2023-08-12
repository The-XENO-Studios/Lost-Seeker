import { useEffect, useLayoutEffect, useState } from "react";

interface Props {
  QuestionData: any;
  index: number;
  passIsAnswerWrong: (i: number, bool: boolean) => void;
}

const QuestionExam = ({ QuestionData, index, passIsAnswerWrong }: Props) => {
  const [optionsArray, setOptionsArray] = useState<boolean[]>([]);

  useLayoutEffect(() => {
    setOptionsArray(Array(QuestionData.Options.length).fill(false));
  }, [QuestionData]);

  const handleCorrectDataPass = (index: number, bool: boolean) => {
    setOptionsArray((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = bool;
      return newOptions;
    });
  };

  useEffect(() => {
    passIsAnswerWrong(index, optionsArray.includes(false));
  }, [optionsArray, index]);

  return (
    <div className="">
      <div className="text-2xl font-bold py-2">{QuestionData.QuestionName}</div>
      <div className="flex gap-1 flex-col pl-2">
        {QuestionData.Options.map((e: any, i: number) => {
          return (
            <Option
              OptionData={e}
              index={i}
              passIsCorrectData={handleCorrectDataPass}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionExam;

interface OptionProps {
  OptionData: any;
  index: number;
  passIsCorrectData: (index: number, bool: boolean) => void;
}

const Option = ({ OptionData, index, passIsCorrectData }: OptionProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isCorrect = checked === OptionData.isCorrect;
    passIsCorrectData(index, isCorrect);
  }, [checked, index, OptionData.isCorrect]);

  return (
    <div
      className={`w-full md:w-1/3 h-fit border-2 border-black rounded-md p-2 cursor-pointer hover:scale-[0.98] transition-transform ${
        checked ? "bg-lightBlue" : "bg-transparent"
      }`}
      onClick={() => {
        setChecked((prevChecked) => !prevChecked);
      }}
    >
      {OptionData.value}
    </div>
  );
};
