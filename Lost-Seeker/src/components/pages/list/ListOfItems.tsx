import { useEffect, useState } from "react";
import Item from "./Item";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import NavBar from "../../shared/NavBar";
import { db } from "../../../App";

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
    <div onScroll={handleScroll}>
      <NavBar onTop={onTop} links={["Found Report", "Contribute"]} />
      <div className="absolute top-28 flex flex-row-reverse flex-wrap gap-3 w-[100vw] justify-center">
        {items.map((item: any) => {
          return <Item data={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}

export default ListOfItems;
