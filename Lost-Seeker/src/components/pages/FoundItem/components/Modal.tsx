import { collection } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiSolidLocationPlus } from "react-icons/bi";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { db } from "../../../../App";

export default function Modal({ hideModal }: { hideModal: () => void }) {
  const [nameOfObject, setNameOfObject] = useState();
  const [place, setPlace] = useState();

  const ref = collection(db, "items");

  const mapRef = useRef<any>();
  const mRef = useRef<any>();
  return (
    <div className="h-screen w-screen bg-black bg-opacity-30 flex flex-row justify-center items-center z-10 fixed ">
      <div
        ref={mapRef}
        className="bg-transparent relative bg-white shadow-md p-4 rounded-xl"
      >
        <div
          className="absolute right-[20px] top-[20px] z-[401] cursor-pointer "
          onClick={() => hideModal()}
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
        <div>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            ref={mRef}
            className="w-96 h-96"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
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
