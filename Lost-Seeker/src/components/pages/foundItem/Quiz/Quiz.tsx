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
        className="block text-base font-medium text-gray-900 "
      >
        Add questions to verify owner
      </label>
      {question.length >= 1 && (
        <div className="flex flex-col gap-8">
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
      )}
      <button
        className="bg-white text-text_primary border-2 border-text_primary rounded-lg w-32 flex items-center justify-center py-2 text-base font-bold transition-transform hover:scale-95"
        onClick={AddQuestion}
      >
        Add a question
      </button>
    </>
  );
}

export default Quiz;
