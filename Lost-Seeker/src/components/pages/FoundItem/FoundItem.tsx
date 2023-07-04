import { Navigate } from "react-router-dom";
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

interface Props {
  user: any;
}

function FoundItem({ user }: Props) {
  if (!user) {
    return <Navigate to="/register" />;
  }

  const [nameOfObject, setNameOfObject] = useState("");
  const [contact, setContact] = useState("");
  const [place, setPlace] = useState<any>();
  const [mapPos, setMapPos] = useState<any>();
  const [placeName, setPlaceName] = useState<any>();

  const [contactType, setContactType] = useState<"email" | "phone">("email");

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
    setMapPos(position.latlng);
    setPlace([position.latlng.lat, position.latlng.lng]);
  };

  const Submit = async (e: any) => {
    e.preventDefault();
    if (!place) {
      alert("Choose a Location");
    } else {
      const docRef = await addDoc(ref, {
        nameOfObject: nameOfObject,
        place: new GeoPoint(place[0], place[1]),
        placeName: placeName,
        time: serverTimestamp(),
        questions: {},
        messages: {},
        contactInfo: contact,
      }).then(() => {
        return <Navigate to="/list" />;
      });
    }
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

        <form className="lg:w-3/5 xl:w-2/5 mt-12 flex flex-col gap-4  pb-8">
          <div>
            <label
              htmlFor="found_item"
              className="block mb-2 text-base font-medium text-gray-900 "
            >
              Found item
            </label>
            <input
              type="text"
              id="found_item"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter the type of item you found"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-base font-medium text-gray-900 "
            >
              Short description
            </label>
            <textarea
              id="description"
              rows={4}
              className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Enter a short description about where and what you found"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-base font-medium text-gray-900 "
            >
              Enter a way to reach you
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  onChange={(e) =>
                    setContactType(e.target.value as "email" | "phone")
                  }
                  id="email-radio-1"
                  type="radio"
                  checked={contactType === "email"}
                  name="email-radio"
                  value="email"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="email-radio-1"
                  className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={(e) =>
                    setContactType(e.target.value as "email" | "phone")
                  }
                  id="email-radio-2"
                  type="radio"
                  checked={contactType === "phone"}
                  name="email-radio"
                  value="phone"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="email-radio-2"
                  className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300"
                >
                  Phone
                </label>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 mt-2">
              <input
                disabled={contactType === "phone"}
                readOnly={contactType === "phone"}
                type="email"
                id="email"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  contactType === "phone" && "cursor-not-allowed"
                }`}
                placeholder="Enter your email."
                required
              />
              <p className="text-center">or</p>
              <input
                disabled={contactType === "email"}
                readOnly={contactType === "email"}
                type="tel"
                id="phone"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                  contactType === "email" && "cursor-not-allowed"
                }`}
                placeholder="Enter your phone number."
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="item_address"
              className="block mb-2 text-base font-medium text-gray-900 "
            >
              Address item was found
            </label>
            <input
              type="text"
              id="item_address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter the adress the item was found."
              required
            />
          </div>

          <div>
            <label
              htmlFor="pin_address"
              className="block mb-2 text-base font-medium text-gray-900 "
            >
              Pin found items address on map
            </label>
            <button
              onClick={(e) => {
                e.preventDefault();

                mapRef.current.showModal();
                setMap(true);
              }}
              className="bg-white text-text_primary border-2 border-text_primary rounded-lg w-32 flex items-center justify-center py-2 text-base font-bold transition-transform hover:scale-95"
            >
              Open Map
            </button>
          </div>

          <button className="bg-black text-white rounded-lg mt-4  w-36 flex items-center justify-center py-2 text-lg font-bold transition-transform hover:scale-95 border-2 border-black">
            Submit Report
          </button>
        </form>
      </div>

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
            {mapPos && <Marker position={mapPos}></Marker>}
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
