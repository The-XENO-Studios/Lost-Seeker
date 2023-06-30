interface Props {
  nameOfObject: string;
  place: string;
  time: string;
  keyProp: any;
}

const Item = ({ nameOfObject, place, time, keyProp }: Props) => {
  function QuizPage() {
    console.log("");
  }

  return (
    <div
      onClick={QuizPage}
      key={keyProp}
      className="w-[150px] h-[200px] rounded-lg shadow-xl bg-[#59c3ec] Item relative flex flex-col flex-shrink-0 items-center"
    >
      <div className="font-bold text-3xl mt-5 break-words">{nameOfObject}</div>
      <div className="font-bold text-xl break-words mt-3">{place}</div>
      <div className="font-bold text-base absolute bottom-3">{time}</div>
    </div>
  );
};

export default Item;
