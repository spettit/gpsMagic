import React, { useRef, useEffect } from "react";

let google = window.google;
let bounds = new google.maps.LatLngBounds();
let map;
let poly;

const options = {
  zoom: 15,
  center: { lat: 51.319571, lng: 0.315287 },
  styles: [
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off"
        }
      ]
    }
  ]
};

function addPoly(points, totalDistance, setTotalDistance) {
  if (!points || points.length < 1) {
    return null;
  }
  points.forEach(point => {
    bounds.extend(point);
  });
  poly = new google.maps.Polyline({
    path: points,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
    map
  });
  map.fitBounds(bounds);
  var lengthInMeters = google.maps.geometry.spherical.computeLength(
    poly.getPath()
  );
  // only set totaldistance first time cos it is less accurate once the gps has been filtered
  if (totalDistance < 1) {
    setTotalDistance(Math.floor(lengthInMeters));
  }
}

const UploadMap = props => {
  const mapContainer = useRef(null);
  useEffect(() => {
    map = new google.maps.Map(mapContainer.current, options);
  }, []);

  useEffect(() => {
    if (poly) {
      poly.setMap(null);
    }
    addPoly(props.points, props.totalDistance, props.setTotalDistance);
  }, [props.points, props.setTotalDistance, props.totalDistance]);

  bounds = new google.maps.LatLngBounds();

  return <div ref={mapContainer} style={{ width: "500px", height: "500px" }} />;
};

export default UploadMap;
