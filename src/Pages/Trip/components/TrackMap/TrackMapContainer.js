import React, { useContext, useState, useEffect } from "react";
import {uploadMinifiedPoints} from '../../../../firebase/firestore'

import moment from "moment";
import MapContext from "../../../../MapContext";

import TrackMap from "./TrackMap";
import EventList from './EventList'

var interval;

function TrackMapContainer(props) {
  const { state } = useContext(MapContext);
  const startDate = moment(state.currentTrack.start_time).clone();
  const [theDate, setTheDate] = useState(moment());
  const [ points, setPoints ] = useState([])
  const [ images, setImages] = useState([])
  const [lastPoint, setLastPoint] = useState({ lat: 0, lng: 0 });
  const [nextPoint, setnextPoint] = useState({ lat: 0, lng: 0 });
  const [lastPointIndex, setLastPointIndex] = useState(0);
  const [markerCoords, setMarkerCoords] = useState({ lat: 0, lng: 0 });
  // const [running, setRunning] = useState(false)
  const [count, setCount] = useState(0);
  // const [latestPhoto, setLatestPhoto] = useState({});
  // const [latestPhotoIndex, setLatestPhotoIndex] = useState(0);

  useEffect(() => {
    if (state.currentTrack && state.currentTrack.events && state.currentTrack.events[0] && state.currentTrack.events[0].points) {
      state.currentTrack.events.forEach(event => {
        if(event.type === "gps"){
          setPoints((points) => [...points, ...event.points])
        } else if(event.type === "image") {
          setImages([...images, event])
        }
        
      })
  }
      // eslint-disable-next-line react-hooks/exhaustive-deps
}, [state.currentTrack])
  

  useEffect(() => {
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
    
  }, [lastPointIndex, points, setLastPointIndex, theDate]);

// eslint-disable-next-line react-hooks/exhaustive-deps

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

  function minifyPoints() {
     const minipoints = points.filter((point, index, points) => {
      const divisor = Math.floor(points.length/100)+1
          return (index%divisor===0)
    })
    uploadMinifiedPoints(state.currentTrack.id, minipoints)
  }

  return (
    <div style={{ width: "100%" }}>
      {startDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}
      <TrackMap polylinepoints={points} marker={markerCoords} images={images} />
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
      <button onClick={minifyPoints}>minify points</button>
    </div>
  );
}

export default TrackMapContainer;
