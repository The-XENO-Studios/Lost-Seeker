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
        onClick={() => {
          console.log(QuestionAnswers.includes(true));
        }}
      >
        Click
      </button>
    </div>
  );
};

export default Quizexam;
