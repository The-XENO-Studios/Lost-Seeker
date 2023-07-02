import { useInView } from "react-intersection-observer"

interface Props {
  data: any
}

const Item = ({ data }: Props) => {
  const [ref, inView] = useInView()

  function QuizPage() {
    console.log("")
  }

  return (
    <div
      ref={ref}
      onClick={QuizPage}
      key={data.id}
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
        <div className="text-lightGray text-center font-bold text-xl break-words mt-5 flex items-center">
          <img src="IcOutlineLocationOn.svg" alt="location logo" />
          {data.place}
        </div>
        <div className="text-lightGray font-bold text-center flex items-center mt-3">
          <img src="IcOutlineCalendarToday.svg" alt="calendar logo" />
          {data.time}
        </div>
      </div>
    </div>
  )
}

export default Item
