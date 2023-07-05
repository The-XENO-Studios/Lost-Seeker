import { useEffect, useState } from "react";

function Quiz() {
  const [question, setQuestion] = useState<any>([]);

  const AddQuestion = (e: any) => {
    e.preventDefault();

    setQuestion([...question, {}]);
  };

  const handleQuestion = (data: any, index: number) => {
    setQuestion((old: any) => {
      old[index] = data;
    });
  };

  return (
    <>
      <label
        htmlFor="quiz"
        className="block mb-2 text-base font-medium text-gray-900 "
      >
        Add questions to verify owner
      </label>
      <div>
        {question.map((_value: any, index: number) => {
          return (
            <Question
              passDataToParent={handleQuestion}
              key={index}
              index={index}
            />
          );
        })}
      </div>
      <button
        className="bg-black text-white rounded-lg w-32 flex items-center justify-center py-2 text-base font-bold transition-transform hover:scale-95 border-2 border-black"
        onClick={AddQuestion}
      >
        Add a question
      </button>
    </>
  );
}

export default Quiz;

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
          setQuestion({ QuestionName: question.QuestionName, Options: [] });
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
