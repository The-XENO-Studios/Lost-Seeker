import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiSolidLocationPlus } from "react-icons/bi";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { Icon } from "leaflet";
import MapIconPicture from "/shopping-bag.png";

export default function MapInputDialog({
  setMap,
  mapRef,
  mapOn,
  mapPos,
  onMapClick,
}: {
  setMap: (value: boolean) => void;
  mapRef: any;
  mapOn: boolean;
  mapPos: LatLngExpression;
  onMapClick: (position: LeafletMouseEvent) => void;
}) {
  const mRef = useRef<any>();
  const markerIcon = new Icon({
    iconUrl: MapIconPicture,
    iconSize: [38, 38],
  });

  return (
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
          <LocationMarker onMapClick={onMapClick} icon={markerIcon} />
          <LeafletgeoSearch />
          {mapPos && <Marker position={mapPos} icon={markerIcon}></Marker>}
        </MapContainer>
      )}
    </dialog>
  );
}

interface MapProps {
  onMapClick: any;
  icon: any;
}

function LocationMarker({ onMapClick, icon }: MapProps) {
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
      <Marker position={position} icon={icon}>
        <Popup>You are here</Popup>
      </Marker>
    </>
  );
}

function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      marker: MapIconPicture,
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, []);

  return null;
}
