import { useEffect, useRef, useState } from "react";
import Item from "./Item";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  startAt,
  endAt,
  Timestamp,
  where,
  Query,
} from "firebase/firestore";
import NavBar from "../../shared/NavBar";
import { db } from "../../../App";

import Quizexam from "../quiz Exam/Quizexam";

import MapInputDialog from "../foundItem/components/MapInputDialog";

import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { Geopoint, distanceBetween, geohashQueryBounds } from "geofire-common";
import { LeafletMouseEvent } from "leaflet";

function ListOfItems() {
  const [finalItem, setFinalItem] = useState<any>();
  const [items, setItems] = useState<any>([]);
  const [onTop, setOnTop] = useState(false);

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
    getDocs(q).then((snapShot) => {
      const updatedItems = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems([...items, ...updatedItems]);
      setFinalItem(snapShot.docs[snapShot.docs.length - 1]);
    });

    return () => {
      setFinalItem(null);
      setItems([]);
    }; // Cleanup the listener when the component unmounts
  }, []);

  const [examData, setExamData] = useState<any>([]);
  const dialogRef = useRef<any>();

  const handleExamData = (data: any) => {
    setExamData(data);
    dialogRef.current.showModal();
  };

  const navigate = useNavigate();

  const GetMoreData = () => {
    const time = Timestamp.fromDate(new Date(filterTime));
    let que: Query;
    if (mapPos) {
      getMoreLocationQueryData();
      return;
    }
    if (filterName?.trim() != "" && !filterTime) {
      que = query(
        ref,
        orderBy("time"),
        limit(10),
        where("nameOfObject", "==", `${filterName}`),
        startAfter(finalItem)
      );
    } //If Time But not Name filtered
    else if (filterName?.trim() == "" && filterTime) {
      que = query(
        ref,
        orderBy("time"),
        limit(10),
        where("time", "<=", time),
        startAfter(finalItem)
      );
    } //If both filtered
    else if (filterName?.trim() != "" && filterTime) {
      que = query(
        ref,
        orderBy("time"),
        limit(10),
        where("nameOfObject", "==", `${filterName}`),
        where("time", "<=", time),
        startAfter(finalItem)
      );
    } //If none filtered
    else {
      que = query(ref, orderBy("time"), limit(10), startAfter(finalItem));
    }

    getDocs(que).then((snapShot) => {
      const updatedItems = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems([...items, ...updatedItems]);
      setFinalItem(snapShot.docs[snapShot.docs.length - 1]);
    });
  };

  const handleMoreDataAdd = () => {
    GetMoreData();
  };

  //---------------------------Geo Query-----------------------------

  const [mapPos, setMapPos] = useState<any>();
  const [mapOn, setMap] = useState(false);
  const mapRef = useRef<any>();

  const getLocationQueryData = () => {
    const center: Geopoint = [mapPos.lat, mapPos.lng];
    const radiusInM = 50 * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
      let que: Query;
      if (filterName?.trim() != "") {
        que = query(
          ref,
          orderBy("geohash"),
          startAt(b[0]),
          endAt(b[1]),
          limit(10),
          where("nameOfObject", "==", `${filterName}`)
        );
      } else {
        que = query(
          ref,
          orderBy("geohash"),
          startAt(b[0]),
          endAt(b[1]),
          limit(10)
        );
      }

      promises.push(getDocs(que));
    }

    // Collect all the query results together into a single list
    Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs: any[] | PromiseLike<any[]> = [];

        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get("lat");
            const lng = doc.get("lng");

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
              matchingDocs.push(doc);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        const updatedItems = matchingDocs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems([...updatedItems]);
        setFinalItem(items[items.length - 1]);
      });
  };

  const getMoreLocationQueryData = () => {
    const center: Geopoint = [mapPos.lat, mapPos.lng];
    const radiusInM = 50 * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
      let que: Query;
      if (filterName?.trim() != "") {
        que = query(
          ref,
          orderBy("geohash"),
          startAt(b[0]),
          endAt(b[1]),
          limit(10),
          where("nameOfObject", "==", `${filterName}`),
          startAfter(finalItem)
        );
      } else {
        que = query(
          ref,
          orderBy("geohash"),
          startAt(b[0]),
          endAt(b[1]),
          limit(10),
          startAfter(finalItem)
        );
      }

      promises.push(getDocs(que));
    }

    // Collect all the query results together into a single list
    Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs: any[] | PromiseLike<any[]> = [];

        for (const snap of snapshots) {
          for (const doc of snap.docs) {
            const lat = doc.get("lat");
            const lng = doc.get("lng");

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
              matchingDocs.push(doc);
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        const updatedItems = matchingDocs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems([...items, ...updatedItems]);
        setFinalItem(items[items.length - 1]);
      });
  };

  const handleMapClick = (position: LeafletMouseEvent) => {
    setMapPos(position.latlng);
    getLocationQueryData;
  };

  //-------------Filter Data--------------

  const [filterName, setFilterName] = useState<string>("");
  const [filterTime, setFilterTime] = useState<string>("");

  const FilterItems = () => {
    const time = Timestamp.fromDate(new Date(filterTime));
    let que: Query;
    if (mapPos) {
      getLocationQueryData();
      return;
    }
    if (filterName?.trim() != "" && !filterTime) {
      que = query(
        ref,
        orderBy("time"),
        limit(10),
        where("nameOfObject", "==", `${filterName}`)
      );
    } //If Time But not Name filtered
    else if (filterName?.trim() == "" && filterTime) {
      que = query(ref, orderBy("time"), limit(10), where("time", "<=", time));
    } //If both filtered
    else if (filterName?.trim() != "" && filterTime) {
      que = query(
        ref,
        orderBy("time"),
        limit(10),
        where("nameOfObject", "==", `${filterName}`),
        where("time", "<=", time)
      );
    } //If none filtered
    else {
      que = query(ref, orderBy("time"), limit(10));
    }

    getDocs(que).then((snapShot) => {
      const updatedItems = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems([...updatedItems]);
      setFinalItem(snapShot.docs[snapShot.docs.length - 1]);
    });
  };

  //------------Reset Filters--------------

  const ResetFilters = () => {
    setFilterName("");
    setFilterTime("");
    setMapPos(null);
  };

  return (
    <div onScroll={handleScroll}>
      <NavBar onTop={onTop} links={["Found Report", "Contribute"]} />

      <MapInputDialog
        onMapClick={(position) => handleMapClick(position)}
        setMap={(value) => setMap(value)}
        mapRef={mapRef}
        mapPos={mapPos}
        mapOn={mapOn}
      />
      <div className="pt-20 flex flex-col">
        <div className="py-20 sm:py-10 px-2 md:px-4 lg:px-20">
          <div className="h-20 rounded-lg flex flex-row justify-between items-center">
            <h3 className="text-3xl font-bold hidden xl:block">Found Items</h3>
            <div className="flex flex-col items-end">
              <div className="flex flex-row flex-wrap md:flex-nowrap items-center gap-1 md:gap-2">
                <button
                  className="text-white whitespace-nowrap bg-black hover:scale-95 font-medium rounded-lg text-md px-2 md:px-3 h-9 md:h-11  flex justify-center items-center transition-transform"
                  onClick={FilterItems}
                >
                  Apply Filter
                </button>
                <button
                  className="text-white whitespace-nowrap bg-black hover:scale-95 font-medium rounded-lg text-md px-2 md:px-3 h-9 md:h-11 flex justify-center items-center transition-transform"
                  onClick={ResetFilters}
                >
                  Reset Filters
                </button>
                <input
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.currentTarget.value)}
                  placeholder="Name To Search"
                  className="bg-gray border border-whiteGray text-black text-md rounded-lg  block w-fit px-3 placeholder:text-black h-9 md:h-11"
                  required
                />

                <input
                  disabled={mapPos ? true : false}
                  type="date"
                  name="Date"
                  id=""
                  className="text-black bg-gray h-9 md:h-11 rounded-lg flex justify-center items-center px-2 md:px-3 outline-none hover:scale-95 transition-transform disabled:cursor-not-allowed disabled:bg-red disabled:bg-opacity-30"
                  value={filterTime}
                  onChange={(e) => setFilterTime(e.currentTarget.value)}
                />
                <button
                  disabled={filterTime ? true : false}
                  className="text-black bg-gray hover:scale-95 font-medium rounded-lg text-md px-2 md:px-3 h-9 md:h-11 flex justify-center items-center transition-transform disabled:cursor-not-allowed disabled:bg-red disabled:bg-opacity-30"
                  onClick={(e) => {
                    e.preventDefault();

                    mapRef.current.showModal();
                    setMap(true);
                  }}
                >
                  Filter by Location
                </button>
              </div>
              {mapPos && (
                <p className="font-normal text-md text-lightGray">
                  The location and date filter can not be applied at the same
                  time.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap px-20 py-6 gap-4">
          {items.map((item: any, i: number) => {
            const isFinal = i === items.length - 1;
            return (
              <Item
                data={item}
                key={item.id}
                examData={handleExamData}
                navigate={navigate}
                isFinal={isFinal}
                callMoreData={isFinal ? handleMoreDataAdd : null}
              />
            );
          })}
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="bg-transparent w-[90%] h-[90%] bg-white rounded-lg focus:outline-none"
      >
        <div
          className="absolute right-[30px] top-[30px] z-[401] cursor-pointer"
          onClick={() => {
            dialogRef.current.close();
          }}
        >
          <AiFillCloseCircle size={36} />
        </div>
        <Quizexam tempQuizData={examData} />
      </dialog>
    </div>
  );
}

export default ListOfItems;
