import { Navigate } from "react-router-dom";
import NavBar from "../../shared/NavBar";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../App";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Leaflet.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiSolidLocationPlus } from "react-icons/bi";
import { latLng, latLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "./components/Modal";
interface Props {
  user: any;
}

function FoundItem({ user }: Props) {
  const [onTop, setOnTop] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /*const docRef = addDoc(ref, {
    nameOfObject: nameOfObject,
    place: "A location",
    time: serverTimestamp(),
    questions: {},
    messages: {},
    contactInfo: "Contact Info of that person who found it.",
  });*/

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  return (
    <>
      {user ? (
        <>
          {showModal && <Modal hideModal={() => setShowModal(false)} />}
          <>
            <NavBar onTop={onTop} links={["List", "Contribute"]} />
            <button
              className="w-36 h-36 mt-11"
              onClick={() => setShowModal(true)}
            >
              Map Button
            </button>
          </>
        </>
      ) : (
        <Navigate to="/register" />
      )}
    </>
  );
}

export default FoundItem;
