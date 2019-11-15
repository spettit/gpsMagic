import React, { useRef, useEffect, useContext } from "react";
import MapContext from "../MapContext";

const google = window.google;

var map;

const options = {
  zoom: 2,
  center: { lat: 0, lng: 0 },
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

function addMarkers(trips) {
  let myicon;
  trips.forEach(trip => {
    if (trip.data.flag_coords) {
      myicon = `https://firebasestorage.googleapis.com/v0/b/gpxmagic.appspot.com/o/icons%2F${trip.data.type}.png?alt=media&token=b96d95ad-32ad-4872-a9eb-3c83fa597e7c`;
      const flag = {
        lat: trip.data.flag_coords.lat,
        lng: trip.data.flag_coords.lng
      };
      const marker = new google.maps.Marker({
        position: flag,
        map: map,
        icon: myicon
      });
    }
  });
}

const Map = () => {
  const { state } = useContext(MapContext);
  const mapContainer = useRef(null);
  useEffect(() => {
    map = new google.maps.Map(mapContainer.current, options);
  }, []);

  useEffect(() => addMarkers(state.trips), [state.trips]);

  return <div className={"map"} ref={mapContainer} />;
};

export default Map;
