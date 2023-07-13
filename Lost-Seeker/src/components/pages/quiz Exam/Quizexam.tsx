import { useState } from "react";
import QuestionExam from "./QuestionExam";

interface Props {
  tempQuizData: any;
}

const Quizexam = ({ tempQuizData }: Props) => {
  const [QuestionAnswers, setQuestionAnswers] = useState<any>([]);

  return (
    <div>
      {tempQuizData.map((e: any, i: number) => {
        return <QuestionExam QuestionData={e} index={i} />;
      })}
    </div>
  );
};

export default Quizexam;
