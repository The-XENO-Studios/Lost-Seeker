import { useInView } from "react-intersection-observer";

interface Props {
  data: any;
}

const Item = ({ data }: Props) => {
  const [ref, inView] = useInView();

  function QuizPage() {
    console.log("");
  }

  return (
    <div
      ref={ref}
      onClick={QuizPage}
      key={data.id}
      className={`w-[150px] text-whiteGray h-[200px] rounded-[16px] shadow-xl shadow-[#000] bg-[#17141d] Item relative flex flex-col flex-shrink-0 items-center ${
        inView
          ? "bg-opacity-100 blur-0 translate-x-0"
          : "opacity-0 blur-[5px] translate-x-[-100%]"
      } transition-all duration-[650ms] hover:scale-110`}
    >
      <div className="font-bold text-3xl mt-5 break-words">
        {data.nameOfObject}
      </div>
      <div className="font-bold text-xl break-words mt-3">{data.place}</div>
      <div className="font-bold text-base absolute bottom-3">{data.time}</div>
    </div>
  );
};

export default Item;
