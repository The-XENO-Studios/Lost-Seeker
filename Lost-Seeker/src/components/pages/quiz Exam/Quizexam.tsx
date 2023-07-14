import { useEffect, useState } from "react";
import QuestionExam from "./QuestionExam";

interface Props {
  tempQuizData: any;
}

const Quizexam = ({ tempQuizData }: Props) => {
  const [QuestionAnswers, setQuestionAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    setQuestionAnswers(Array(tempQuizData.length).fill(true));
  }, [tempQuizData]);

  const handleQuestionAnswers = (i: number, bool: boolean) => {
    setQuestionAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[i] = bool;
      return newAnswers;
    });
  };

  return (
    <div>
      <div className="p-6 mt-10">
        <h1 className="text-4xl font-bold">Quiz about the item of request</h1>
        <p className="text-lg text-lightGray  lg:w-3/5 xl:w-2/5 mt-2">
          You are close to your item. Just answer these question to verify you
          as the owner. This process is necessary because we need to be sure
          about the ownership.
        </p>
        <div className="mt-8 bg-whiteGray rounded-lg p-4">
          <h2 className="text-2xl font-bold">Answer the follwing questions</h2>
          <p className="text-lg text-lightGray">
            Click on the correct answers. Multiple answers can be correct.
          </p>
          <div className="mt-4 pl-2">
            {tempQuizData.map((e: any, i: number) => {
              return (
                <QuestionExam
                  QuestionData={e}
                  index={i}
                  passIsAnswerWrong={handleQuestionAnswers}
                />
              );
            })}
            <button
              className="bg-black text-white rounded-lg mt-4  w-36 flex items-center justify-center py-2 text-lg font-bold transition-transform hover:scale-95 border-2 border-black"
              onClick={() => {
                console.log(QuestionAnswers.includes(true));
              }}
            >
              Click
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizexam;
