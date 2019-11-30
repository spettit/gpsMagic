import React, { useState } from "react";
import FilePicker from "./components/FilePicker";
import UploadMap from "./components/UploadMap";
import UploadPointsList from "./components/UploadPointsList";
import Meta from "./components/Meta";

import calcDistanceBetweenPoints from "./utils/calculateDistanceBetweenPoints";
import calculateHeadingFromPoints from "./utils/calculateHeadingFromPoints";
import sortPointsByTimestamp from "./utils/sortPointsByTimestamp";
import calculateCardinalFromHeading from "./utils/calculateCardinalFromHeading";

let TrackUpload = props => {
  const [points, setPoints] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);

  function sortByTimestamp() {
    const newPoints = sortPointsByTimestamp(points);
    setPoints(newPoints);
  }

  // function filter () {
  //   const newPoints = points.filter((point, index) => {
  //     return(index % 2 === 1)
  //   })
  //   setPoints(newPoints)
  // }

  function filterByDistance500() {
    let newPoints = [];
    const lastPoint = points.pop();
    newPoints.push(points[0]);
    for (let i = 0; i < points.length; i++) {
      if (
        calcDistanceBetweenPoints(
          { lat: points[i].lat, lng: points[i].lng },
          {
            lat: newPoints[newPoints.length - 1].lat,
            lng: newPoints[newPoints.length - 1].lng
          }
        ) >= 500
      ) {
        newPoints.push(points[i]);
      }
    }
    newPoints.push(lastPoint);
    setPoints(newPoints);
  }

  function calcDistances() {
    const newPoints = points.map((point, index, points) => {
      if (index > 0) {
        return {
          ...point,
          distance: calcDistanceBetweenPoints(
            { lat: point.lat, lng: point.lng },
            { lat: points[index - 1].lat, lng: points[index - 1].lng }
          )
        };
      }
      return {
        ...point,
        distance: calcDistanceBetweenPoints(
          { lat: point.lat, lng: point.lng },
          { lat: point.lat, lng: point.lng }
        )
      };
    });
    setPoints(newPoints);
  }

  function calcDurations() {
    const newPoints = points.map((point, index, points) => {
      if (index > 0 && point.distance) {
        return {
          ...point,
          duration: point.timestamp - points[index - 1].timestamp
        };
      }
      return { ...point, duration: 0 };
    });
    setPoints(newPoints);
  }

  function calcSpeed() {
    const newPoints = points.map((point, index, points) => {
      if (index > 0 && point.distance && point.duration) {
        return { ...point, speed: (point.distance / point.duration) * 3600 };
      }
      return { ...point, speed: 0 };
    });
    setPoints(newPoints);
  }

  function calcHeadings() {
    const newPoints = points.map((point, index, points) => {
      if (index < points.length - 1) {
        return {
          ...point,
          heading: calculateHeadingFromPoints(
            { lat: point.lat, lng: point.lng },
            { lat: points[index + 1].lat, lng: points[index + 1].lng }
          )
        };
      }
      return {
        ...point,
        heading: calculateHeadingFromPoints(
          { lat: point.lat, lng: point.lng },
          { lat: point.lat, lng: point.lng }
        )
      };
    });
    setPoints(newPoints);
  }

  function calcCardinals() {
    const newPoints = points.map(point => {
      return {
        ...point,
        cardinal: calculateCardinalFromHeading(point.heading)
      };
    });
    setPoints(newPoints);
  }

  return (
    <div>
      <div className="top-spacer" />
      <div>Add a GPX file</div>
      <div className="top-spacer"></div>
      <FilePicker setPoints={setPoints} />
      <button onClick={sortByTimestamp}>sort</button>
      <button onClick={filterByDistance500}>filter 500</button>
      <button onClick={calcDistances}>distances</button>
      <button onClick={calcHeadings}>headings</button>
      <button onClick={calcCardinals}>cardinals</button>
      <button onClick={calcDurations}>durations</button>
      <button onClick={calcSpeed}>speed</button>
      <div style={{ display: "flex" }}>
        <UploadMap
          points={points}
          totalDistance={totalDistance}
          setTotalDistance={setTotalDistance}
        />
        <Meta points={points} totalDistance={totalDistance} />
      </div>
      <UploadPointsList points={points} />
    </div>
  );
};

export default TrackUpload;
