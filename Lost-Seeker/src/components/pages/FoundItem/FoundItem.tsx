import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../../shared/NavBar";
import { useRef, useState } from "react";
import { db } from "../../../App";
import {
  GeoPoint,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
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
import Quiz from "./Quiz";

import { LeafletMouseEvent } from "leaflet";
import AddressInput from "./components/AddressInput";
import ContactInput from "./components/ContactInput";
import DescriptionInput from "./components/DescriptionInput";
import MapInputDialog from "./components/MapInputDialog";
import ObjectTypeInput from "./components/ObjectTypeInput";
import PinAddressButton from "./components/PinAddressButton";

interface Props {
  user: any;
}

function FoundItem({ user }: Props) {
  const [nameOfObject, setNameOfObject] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState<any>();
  const [mapPos, setMapPos] = useState<any>();
  const [placeName, setPlaceName] = useState<any>("");
  const [numberContact, setNumberContact] = useState("");
  const [emailContact, setEmailContact] = useState("");

  const [formData, setFormData] = useState({
    objectType: "",
    description: "",
    place: [0, 0],
    addressPlace: "",
    phoneContact: "",
    emailContact: "",
  });

  const navigate = useNavigate();

  const [contactType, setContactType] = useState<"email" | "phone">("email");

  const ref = collection(db, "items");

  const [onTop, setOnTop] = useState(false);

  const mapRef = useRef<any>();

  const [mapOn, setMap] = useState(false);

  const handleMapClick = (position: LeafletMouseEvent) => {
    setMapPos(position.latlng);
    setPlace([position.latlng.lat, position.latlng.lng]);
  };

  const Submit = async (e: any) => {
    e.preventDefault();
    if (!place) {
      alert("Choose a Location");
    } else {
      await addDoc(ref, {
        nameOfObject: nameOfObject,
        description: description,
        place: new GeoPoint(place[0], place[1]),
        placeName: placeName,
        time: serverTimestamp(),
        questions: {},
        messages: {},
        contactInfo: contactType === "email" ? emailContact : numberContact,
      }).then(() => {
        navigate("/list");
      });
    }
  };

  if (!user) {
    return <Navigate to="/register" />;
  }

  return (
    <div className="flex flex-col  w-screen overflow-x-hidden h-screen relative">
      <NavBar onTop={onTop} links={["List", "Contribute"]} />
      <div className="mt-40 px-8 md:px-12">
        <h1 className="text-4xl font-bold">Found Report</h1>
        <p className="text-lg text-lightGray  lg:w-3/5 xl:w-2/5 mt-2">
          Thank you reporting this lost item. The owner will be happy to get it
          back! Just fill out this form and you are done.
        </p>

        <form className="lg:w-3/5 xl:w-2/5 mt-12 flex flex-col gap-4  pb-8">
          <ObjectTypeInput
            onChange={(value) => {
              setFormData((prevData) => ({ ...prevData, objectType: value }));
            }}
            value={formData.objectType}
          />
          <DescriptionInput
            onChange={(value) => {
              setFormData((prevData) => ({ ...prevData, description: value }));
            }}
            value={formData.description}
          />
          <ContactInput
            onChangeEmail={(value) => {
              setFormData((prevData) => ({ ...prevData, emailContact: value }));
            }}
            onChangePhone={(value) => {
              setFormData((prevData) => ({ ...prevData, phoneContact: value }));
            }}
            valueEmail={formData.emailContact}
            valuePhone={formData.phoneContact}
          />
          <AddressInput
            onChange={(value) => {
              setFormData((prevData) => ({ ...prevData, addressPlace: value }));
            }}
            value={formData.addressPlace}
          />

          <PinAddressButton
            onClick={(e) => {
              e.preventDefault();

              mapRef.current.showModal();
              setMap(true);
            }}
          />

          <Quiz />

          <button
            className="bg-black text-white rounded-lg mt-4  w-36 flex items-center justify-center py-2 text-lg font-bold transition-transform hover:scale-95 border-2 border-black"
            onClick={Submit}
          >
            Submit Report
          </button>
        </form>
      </div>

      <MapInputDialog
        onMapClick={(position) => handleMapClick(position)}
        setMap={(value) => setMap(value)}
        mapRef={mapRef}
        mapPos={mapPos}
        mapOn={mapOn}
      />
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
