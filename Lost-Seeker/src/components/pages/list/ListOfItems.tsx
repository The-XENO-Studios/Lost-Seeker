import { useState } from "react";
import Item from "./Item";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { FirebaseApp } from "firebase/app";

interface Props{
  app: FirebaseApp
}

const ListOfItems = ({app}: Props) => {

  const [finalItem, setFinalItem] = useState<any>();
  const [items, setItems] = useState<any>([]);

  const db = getFirestore(app);
  const ref = collection(db, 'items');
  const q = query(ref, orderBy("time"), limit(10));
  getDocs(q).then((snapShot)=>{
    snapShot.docs.forEach((doc)=>{
      setItems((currentArray: any) => {
        return [...currentArray, doc]
      });
      setFinalItem(doc);
    })
  })

  return (
    <>
      {items.map((item: any)=>{
        <Item nameOfObject={item.name} place={item.place} time={item.time} />
      })}
    </>
  )
}

export default ListOfItems