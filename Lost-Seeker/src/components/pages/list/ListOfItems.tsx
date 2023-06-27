import Item from "./Item.tsx"
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore"

const ListOfItems = async (app: any) => {
  const db = getFirestore(app)
  const ref = collection(db, "items")
  const q = query(ref, orderBy("time"), limit(10))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {})

  return <div></div>
}

export default ListOfItems
