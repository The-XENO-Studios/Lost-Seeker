import { useInView } from "react-intersection-observer";
import { BsCalendar } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";

interface Props {
  data: any;
  key: any;
}

const Item = ({ data, key }: Props) => {
  const [ref, inView] = useInView();

  function QuizPage() {
    console.log("");
  }

  const time = new Date(
    data.time?.seconds * 1000 + data.time?.nanoseconds / 1000000
  );

  const year = time?.getFullYear();
  const month = time?.getMonth();
  const date = time?.getDate();

  return (
    <div
      ref={ref}
      onClick={QuizPage}
      key={key}
      className={`w-64 text-black h-80 rounded-lg shadow-xl drop-shadow bg-white Item flex flex-col items-center justify-between ${
        inView
          ? "bg-opacity-100 blur-0 translate-x-0"
          : "opacity-0 blur-[5px] translate-x-[-100%]"
      } transition-all duration-[650ms] hover:scale-105`}
    >
      <div className="font-bold text-3xl mt-5 break-words">
        {data.nameOfObject}
      </div>
      <div className="mb-5 flex flex-col items-center">
        <div className="text-lightGray text-center font-bold text-xl break-words mt-5 flex items-center gap-1">
          <FaMapLocationDot size={20} />
          {data.placeName}
        </div>
        <div className="text-lightGray font-bold text-center flex items-center mt-3 gap-1">
          <BsCalendar size={20} />
          {`${month}/${date}/${year}`}
        </div>
      </div>
    </div>
  );
};

export default Item;
