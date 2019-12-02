import React, { useContext, useState, useEffect } from "react";

import moment from "moment";
import MapContext from "../../../../MapContext";

import TrackMap from "./TrackMap";
import EventList from './EventList'

var interval;

function TrackMapContainer(props) {
  const { state } = useContext(MapContext);
  const startDate = moment(state.currentTrack.start_time).clone();
  const [theDate, setTheDate] = useState(moment());
  const [lastPoint, setLastPoint] = useState({ lat: 0, lng: 0 });
  const [nextPoint, setnextPoint] = useState({ lat: 0, lng: 0 });
  const [lastPointIndex, setLastPointIndex] = useState(0);
  const [markerCoords, setMarkerCoords] = useState({ lat: 0, lng: 0 });
  // const [running, setRunning] = useState(false)
  const [count, setCount] = useState(0);
  // const [latestPhoto, setLatestPhoto] = useState({});
  // const [latestPhotoIndex, setLatestPhotoIndex] = useState(0);

  

  useEffect(() => {
    const points = state.currentTrack.minified_points;
    if (points && points.length > 0) {
      for (let i = lastPointIndex; i < points.length; i++) {
        if (points[i].timestamp > theDate.valueOf()) {
          setLastPoint(points[i - 1]);
          setnextPoint(points[i]);
          setLastPointIndex(i - 1);
          return;
        }
      }
    }
  }, [
    lastPointIndex,
    setnextPoint,
    state.currentTrack.minified_points,
    theDate
  ]);

  useEffect(() => {
    const duration =
      parseInt(nextPoint.timestamp) - parseInt(lastPoint.timestamp);
    const part = parseInt(theDate.valueOf()) - parseInt(lastPoint.timestamp);
    const fraction = part / duration;
    const markerlat =
      lastPoint.lat + (nextPoint.lat - lastPoint.lat) * fraction;
    const markerlng =
      lastPoint.lng + (nextPoint.lng - lastPoint.lng) * fraction;
    setMarkerCoords({ lat: markerlat, lng: markerlng });
    // console.log(markerlat, markerlng)
  }, [lastPoint, nextPoint, theDate]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTheDate(startDate.add(count, "m")), [count]);

  return (
    <div style={{ width: "100%" }}>
      {startDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}
      <TrackMap marker={markerCoords} />
      <button
        onClick={() => {
          interval = setInterval(() => {
            setCount(count => count + 1);
          }, 60);
        }}
      >
        run
      </button>
      <button onClick={() => clearInterval(interval)}>Stop</button>
      <div>{theDate.format("DD/MM/YYYY HH:mm:ss")}</div>
      <EventList />
    </div>
  );
}

export default TrackMapContainer;
