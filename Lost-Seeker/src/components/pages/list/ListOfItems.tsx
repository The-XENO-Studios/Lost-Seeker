import { useEffect, useRef, useState } from "react";
import Item from "./Item";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  startAfter,
} from "firebase/firestore";
import NavBar from "../../shared/NavBar";
import { db } from "../../../App";

import Quizexam from "../quiz Exam/Quizexam";

import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function ListOfItems() {
  const [finalItem, setFinalItem] = useState<any>();
  const [items, setItems] = useState<any>([]);
  const [onTop, setOnTop] = useState(true);

  const ref = collection(db, "items");
  const q = query(ref, orderBy("time"), limit(10));

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    getDocs(q).then((snapShot) => {
      const updatedItems = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems([...items, ...updatedItems]);
      setFinalItem(snapShot.docs[snapShot.docs.length - 1]);
    });

    return () => {
      setFinalItem(null);
      setItems([]);
    }; // Cleanup the listener when the component unmounts
  }, []);

  const [examData, setExamData] = useState<any>([]);
  const dialogRef = useRef<any>();

  const handleExamData = (data: any) => {
    setExamData(data);
    dialogRef.current.showModal();
  };

  const navigate = useNavigate();

  const GetMoreData = () => {
    const que = query(ref, orderBy("time"), limit(10), startAfter(finalItem));
    getDocs(que).then((snapShot) => {
      const updatedItems = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems([...items, ...updatedItems]);
      setFinalItem(snapShot.docs[snapShot.docs.length - 1]);
    });
  };

  const handleMoreDataAdd = () => {
    GetMoreData();
  };

  return (
    <div onScroll={handleScroll}>
      <NavBar onTop={onTop} links={["Found Report", "Contribute"]} />
      <div className="absolute top-28 flex flex-row-reverse flex-wrap gap-3 w-[97vw] justify-center">
        {items.map((item: any, i: number) => {
          const isFinal = i === items.length - 1;
          return (
            <Item
              data={item}
              key={item.id}
              examData={handleExamData}
              navigate={navigate}
              isFinal={isFinal}
              callMoreData={isFinal ? handleMoreDataAdd : null}
            />
          );
        })}
      </div>
      <dialog
        ref={dialogRef}
        className="bg-transparent w-[90%] h-[90%] bg-white rounded-lg focus:outline-none"
      >
        <div
          className="absolute right-[30px] top-[30px] z-[401] cursor-pointer"
          onClick={() => {
            dialogRef.current.close();
          }}
        >
          <AiFillCloseCircle size={36} />
        </div>
        <Quizexam tempQuizData={examData} />
      </dialog>
    </div>
  );
}

export default ListOfItems;
