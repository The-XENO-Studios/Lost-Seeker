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
    <div onClick={QuizPage} key={keyProp}>
      <div>{nameOfObject}</div>
      <div>{place}</div>
      <div>{time}</div>
    </div>
  );
};

export default Item;
