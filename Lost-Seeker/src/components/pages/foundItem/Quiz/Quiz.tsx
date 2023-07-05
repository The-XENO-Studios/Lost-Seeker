import { useState } from "react";
import Question from "./Question";

interface Props {
  PassData: (data: any) => void;
}

function Quiz({ PassData }: Props) {
  const [question, setQuestion] = useState<any>([]);

  const AddQuestion = (e: any) => {
    e.preventDefault();

    setQuestion([...question, {}]);
  };

  const handleQuestion = (data: any, index: number) => {
    const newData = question;
    newData[index] = data;
    setQuestion(newData);
  };

  PassData(question);

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
