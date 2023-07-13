import { useEffect, useState } from "react";

interface Props {
  QuestionData: any;
  index: number;
}

const QuestionExam = ({ QuestionData }: Props) => {
  const [optionsArray, setOptionsArray] = useState<boolean[]>([]);

  const [isAnswerWrong, setIsAnswerWrong] = useState(false);

  useEffect(() => {
    setOptionsArray(Array(QuestionData.Options.length).fill(false));
  }, [QuestionData]);

  const handleCorrectDataPass = (index: number, bool: boolean) => {
    const options = optionsArray;
    options[index] = bool;
    setOptionsArray(options);
  };

  useEffect(() => {
    console.log(isAnswerWrong);
  }, [isAnswerWrong]);

  return (
    <div>
      <div>{QuestionData.QuestionName}</div>
      <div className="flex gap-1 flex-col">
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
      <button
        onClick={() => {
          setIsAnswerWrong(optionsArray.includes(false));
        }}
      >
        Click
      </button>
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
  }, [checked, OptionData.isCorrect, index, passIsCorrectData]);

  return (
    <div
      className={`w-16 h-10 ${checked ? "bg-blue" : "bg-transparent"}`}
      onClick={() => {
        checked ? setChecked(false) : setChecked(true);
      }}
    >
      {OptionData.value}
    </div>
  );
};
