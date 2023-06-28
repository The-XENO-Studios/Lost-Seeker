
interface Props {
  nameOfObject: string;
  place: string;
  time: string;
}

const Item = ( {nameOfObject, place, time}: Props ) => {

  function QuizPage(){

  }

  return (
    <div onClick={QuizPage}>
      <div>{nameOfObject}</div>
      <div>{place}</div>
      <div>{time}</div>
    </div>
  )
}

export default Item