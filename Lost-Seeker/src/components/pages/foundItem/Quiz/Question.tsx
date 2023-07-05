import { useState, useEffect } from "react";
import Option from "./Option";

interface PropsQuestion {
  passDataToParent: (data: any, index: number) => void;
  index: number;
}

const Question = ({ passDataToParent, index }: PropsQuestion) => {
  const [question, setQuestion] = useState({
    QuestionName: "",
    Options: [{ value: "", isCorrect: false }],
  });

  const AddOption = (e: any) => {
    e.preventDefault();

    setQuestion({
      QuestionName: question.QuestionName,
      Options: [...question.Options, { value: "", isCorrect: false }],
    });
  };

  const handleOption = (
    optionValue: string,
    index: number,
    isCorrect: boolean
  ) => {
    const optionsArr = question.Options;
    optionsArr[index].value = optionValue;
    optionsArr[index].isCorrect = isCorrect;
    setQuestion({
      QuestionName: question.QuestionName,
      Options: optionsArr,
    });
  };

  useEffect(() => {
    passDataToParent(question, index);
  }, [question]);

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={question.QuestionName}
        placeholder="Enter a question."
        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        onChange={(e) => {
          setQuestion({
            QuestionName: e.currentTarget.value,
            Options: question.Options,
          });
        }}
      />
      <div className="h-[1px] w-full bg-lightGray "></div>
      <div className="flex flex-col gap-2 pl-4 ">
        {question.Options.map((_value, index) => {
          return <Option data={handleOption} index={index} key={index} />;
        })}
      </div>
      <button
        className="ml-4 bg-white text-text_primary border-2 border-text_primary rounded-lg w-full flex items-center justify-center py-2 text-base font-bold transition-transform hover:scale-95"
        onClick={AddOption}
      >
        +
      </button>
    </div>
  );
};

export default Question;
