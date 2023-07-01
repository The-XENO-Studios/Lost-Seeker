import { Navigate } from "react-router-dom";
import NavBar from "../../shared/NavBar";
import { useState } from "react";
import { db } from "../../../App";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface Props {
  user: any;
}

function FoundItem({ user }: Props) {
  if (!user) {
    return <Navigate to="/register" />;
  }

  const [nameOfObject, setNameOfObject] = useState();

  const ref = collection(db, "items");

  const docRef = addDoc(ref, {
    nameOfObject: nameOfObject,
    place: "A location",
    time: serverTimestamp(),
    questions: {},
    messages: {},
    contactInfo: "Contact Info of that person who found it.",
  });

  const [onTop, setOnTop] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  return (
    <div>
      <NavBar onTop={onTop} links={["List", "Contribute"]} />
      <div></div>
    </div>
  );
}

export default FoundItem;
