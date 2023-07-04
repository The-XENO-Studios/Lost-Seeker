import { Navigate } from "react-router-dom";
import NavBar from "../../shared/NavBar";
import { useRef, useState } from "react";
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

interface Props {
  user: any;
}

function FoundItem({ user }: Props) {
  if (!user) {
    return <Navigate to="/register" />;
  }

  const [nameOfObject, setNameOfObject] = useState("");
  const [place, setPlace] = useState();

  const ref = collection(db, "items");

  const [onTop, setOnTop] = useState(false);

  const mapRef = useRef<any>();
  const mRef = useRef<any>();

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  const [mapOn, setMap] = useState(false);

  const handleMapClick = (position: any) => {
    setPlace(position.latlng);
  };

  const Submit = (e: any) => {
    e.preventDefault();
    if (!place) {
      alert("Choose a Location");
    } else {
      /*const docRef = addDoc(ref, {
    nameOfObject: nameOfObject,
    place: "A location",
    time: serverTimestamp(),
    questions: {},
    messages: {},
    contactInfo: "Contact Info of that person who found it.",
  });*/
    }
  };

  return (
    <div>
      <NavBar onTop={onTop} links={["List", "Contribute"]} />
      <h1 className="absolute top-[90px] text-center w-[100%] font-extrabold text-3xl  md:text-2xl lg:text-3xl text-black">
        Report Found Item
      </h1>
      <form className="w-[90%] h-[100%] absolute top-[200px] left-5 flex flex-col gap-5 bg-blue rounded-md">
        <div className="ml-4">
          <label className="font-extrabold text-lg  md:text-lg lg:text-xl text-black">
            Name Of Object:
          </label>
          <input
            type="text"
            value={nameOfObject}
            onChange={(e) => setNameOfObject(e.currentTarget.value)}
            required
          />
        </div>
        <button
          className="w-36 h-36 font-extrabold text-lg  md:text-lg lg:text-xl text-black"
          onClick={(e) => {
            e.preventDefault();
            mapRef.current.showModal();
            setMap(true);
          }}
        >
          Map Button
        </button>
        <button onClick={Submit}>Submit</button>
      </form>
      <dialog ref={mapRef} className="bg-transparent">
        <div
          className="absolute right-[20px] top-[20px] z-[401] cursor-pointer"
          onClick={() => {
            mapRef.current.close();
            setMap(false);
          }}
        >
          <AiOutlineCloseCircle size={50} />
        </div>
        <div
          className="absolute right-[30px] bottom-[50px] z-[401] cursor-pointer"
          onClick={() => {
            mRef.current.locate();
          }}
        >
          <BiSolidLocationPlus size={50} />
        </div>
        {mapOn && (
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            ref={mRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onMapClick={handleMapClick} />
          </MapContainer>
        )}
      </dialog>
    </div>
  );
}

interface MapProps {
  onMapClick: any;
}

function LocationMarker({ onMapClick }: MapProps) {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      onMapClick(e);
    },
    locationfound(e: any) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <>
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </>
  );
}

export default FoundItem;
