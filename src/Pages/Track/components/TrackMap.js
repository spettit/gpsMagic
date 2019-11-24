import React, {useRef, useEffect, useContext} from 'react'
import MapContext from "../../../MapContext"

let google = window.google

let bounds = new google.maps.LatLngBounds();
let map
let poly
let marker

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

function addMarker(lat, lng){
  marker = new google.maps.Marker({position: {lat, lng}, map})
}

const TrackMap = (props) => {
  const { state } = useContext(MapContext)
    const mapContainer = useRef(null)
    useEffect(() => {
        map = new google.maps.Map(mapContainer.current, options);
    }, [])

    useEffect(() => {bounds = new google.maps.LatLngBounds()})

    useEffect(() => {
      if(poly){poly.setMap(null)}
      if(state.currentTrack){addPoly(state.currentTrack.minified_points)}}, [state.currentTrack])

      useEffect(() => {
        if(state.currentTrack.minified_points){
          addMarker(state.currentTrack.minified_points[0].lat, state.currentTrack.minified_points[0].lng)
        }
        
      }, [state.currentTrack.minified_points])

      useEffect(() => {

        if(marker && props.marker){
          marker.setPosition(new google.maps.LatLng(props.marker.lat, props.marker.lng))
        }
        
      })


    return (
        <div ref={mapContainer} style={{ width: "500px", height: "500px"}} />
    )
}

export default TrackMap