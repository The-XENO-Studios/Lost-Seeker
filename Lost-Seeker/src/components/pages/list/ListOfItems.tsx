import { useState } from "react";
import Item from "./Item";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { FirebaseApp } from "firebase/app";
import LandingNavBar from "../landing/components/LandingNavBar";
import { Navigate } from "react-router-dom";

interface Props{
  app: FirebaseApp;
  user: any;
}

const ListOfItems = ({app, user}: Props) => {

  if(!user){
    return <Navigate to="/"/>
  }

  const [finalItem, setFinalItem] = useState<any>();
  const [items, setItems] = useState<any>([]);

  const db = getFirestore(app);
  const ref = collection(db, 'items');
  const q = query(ref, orderBy("time"), limit(10));
  getDocs(q).then((snapShot)=>{
    snapShot.docs.forEach((doc)=>{
      setItems((currentArray: any) => {
        return [...currentArray, doc.data]
      });
      setFinalItem(doc);
    })
  })

  return (
    <div>
      <LandingNavBar />
    </div>
  )
}

export default ListOfItems