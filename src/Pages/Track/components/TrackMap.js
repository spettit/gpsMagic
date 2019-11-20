import React, {useRef, useEffect, useContext} from 'react'
import MapContext from "../../../MapContext"

let google = window.google

const bounds = new google.maps.LatLngBounds();
let map
let poly

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

function addPoly(points) {
  
    if(!points || points.length < 1) {
        return null
    }
   

    points.forEach(point => {
      bounds.extend(point);
    });
    poly = new google.maps.Polyline({
      path: points,
      geodesic: true,
      strokeColor: 'rebeccapurple',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map
    });
    map.fitBounds(bounds);
    // var lengthInMeters = google.maps.geometry.spherical.computeLength(poly.getPath());
    // const pointCount = points.length
    // dispatch({type: "setDistance", payload: {lengthInMeters, pointCount}})
    // alert("polyline is "+lengthInMeters+" long");
    // google.maps.event.addListener(poly, 'click', (e) => {
    //   console.log('click!', e)
    //   poly.setOptions({editable: true})
    // });
}

const TrackMap = () => {
  const { dispatch, state } = useContext(MapContext)
    const mapContainer = useRef(null)
    useEffect(() => {
        map = new google.maps.Map(mapContainer.current, options);
    }, [])

    useEffect(() => {
      if(poly){poly.setMap(null)}
      if(state.currentTrack){addPoly(state.currentTrack.minified_points)}}, [state.currentTrack])


    return (
        <div ref={mapContainer} style={{ width: "500px", height: "500px"}} />
    )
}

export default TrackMap