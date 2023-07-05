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
    <div>
      <input
        type="text"
        value={question.QuestionName}
        placeholder="Question"
        onChange={(e) => {
          setQuestion({
            QuestionName: e.currentTarget.value,
            Options: question.Options,
          });
        }}
      />
      <div>
        {question.Options.map((_value, index) => {
          return <Option data={handleOption} index={index} key={index} />;
        })}
      </div>
      <button
        className="bg-black text-white rounded-lg w-32 flex items-center justify-center py-2 text-base font-bold transition-transform hover:scale-95 border-2 border-black"
        onClick={AddOption}
      >
        Add option
      </button>
    </div>
  );
};

export default Question;
