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
import "leaflet/dist/leaflet.css";
import "./Leaflet.css";
import Quiz from "./Quiz/Quiz";

import { geohashForLocation, Geopoint } from "geofire-common";

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

interface IFormData {
  objectType: string;
  description: string;
  place: [number, number] | null;
  addressPlace: string;
  contactType: "email" | "phone";
  phoneContact: string;
  emailContact: string;
}

function FoundItem({ user }: Props) {
  const [mapPos, setMapPos] = useState<any>();
  const [question, setQuestion] = useState([]);

  const [formData, setFormData] = useState<IFormData>({
    objectType: "",
    description: "",
    place: null,
    addressPlace: "",
    contactType: "email",
    phoneContact: "",
    emailContact: "",
  });

  const navigate = useNavigate();

  const ref = collection(db, "items");

  const [onTop, setOnTop] = useState(false);

  const mapRef = useRef<any>();

  const [mapOn, setMap] = useState(false);

  const handleMapClick = (position: LeafletMouseEvent) => {
    setMapPos(position.latlng);

    setFormData((prevData) => ({
      ...prevData,
      place: [position.latlng.lat, position.latlng.lng],
    }));
  };

  const Submit = async (e: any) => {
    e.preventDefault();

    if (!formData.place) {
      alert("Choose a Location");
    } else if (question?.length < 3) {
      alert("Add at least three Questions");
    } else {
      const point: Geopoint = [formData.place[0], formData.place[1]];
      await addDoc(ref, {
        nameOfObject: formData.objectType,
        description: formData.description,
        place: new GeoPoint(formData.place[0], formData.place[1]),
        geohash: geohashForLocation(point),
        placeName: formData.addressPlace,
        lat: formData.place[0],
        lng: formData.place[1],
        time: serverTimestamp(),
        questions: question,
        messages: {},
        contactInfo:
          formData.contactType === "email"
            ? formData.emailContact
            : formData.phoneContact,
      }).then(() => {
        navigate("/list");
      });
    }
  };

  if (!user) {
    return <Navigate to="/register" />;
  }

  const GetQuestionData = (data: any) => {
    setQuestion(data);
  };

  return (
    <div className="flex flex-col  w-screen overflow-x-hidden h-screen relative">
      <NavBar onTop={onTop} links={["List", "Contribute"]} />
      <div className="mt-40 px-8 md:px-12">
        <h1 className="text-4xl font-bold">Found Report</h1>
        <p className="text-lg text-lightGray  lg:w-3/5 xl:w-2/5 mt-2">
          Thank you reporting this lost item. The owner will be happy to get it
          back! Just fill out this form and you are done.
        </p>

        <form
          onSubmit={Submit}
          className="lg:w-3/5 xl:w-2/5 mt-12 flex flex-col gap-4  pb-8"
        >
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
            onChangeType={(value) => {
              setFormData((prevData) => ({
                ...prevData,
                contactType: value as "email" | "phone",
              }));
            }}
            onChangeEmail={(value) => {
              setFormData((prevData) => ({ ...prevData, emailContact: value }));
            }}
            onChangePhone={(value) => {
              setFormData((prevData) => ({ ...prevData, phoneContact: value }));
            }}
            valueType={formData.contactType}
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

          <Quiz PassData={GetQuestionData} />

          <button className="bg-black text-white rounded-lg mt-4  w-36 flex items-center justify-center py-2 text-lg font-bold transition-transform hover:scale-95 border-2 border-black">
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

export default FoundItem;
