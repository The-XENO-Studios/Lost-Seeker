import { useEffect, useState } from "react";
import Item from "./Item";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import ListNavBar from "./ListNavBar";

interface Props {
  app: FirebaseApp;
}

function ListOfItems({ app }: Props) {
  const [finalItem, setFinalItem] = useState<any>();
  const [items, setItems] = useState<any>([]);

  const db = getFirestore(app);
  const ref = collection(db, "items");
  const q = query(ref, orderBy("time"), limit(10));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapShot) => {
      const updatedItems = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems([...items, ...updatedItems]);
      setFinalItem(items[items.length - 1]);
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  return (
    <div>
      <ListNavBar />
      <div className="absolute top-28 flex flex-row-reverse flex-wrap gap-3 w-[100vw] justify-center">
        {items.map((item: any) => {
          return (
            <Item
              nameOfObject={item.nameOfObject}
              place={item.place}
              time={item.time}
              keyProp={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ListOfItems;
