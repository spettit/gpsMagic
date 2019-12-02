import React, {useRef, useEffect, useContext} from 'react'
import MapContext from "../../../MapContext"

import  pic from '../../../Icons/video-solid.svg'
import bike from '../../../Icons/motorcycling.svg'

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
  marker.setIcon(bike)
}

const TrackMap = (props) => {
  const { state, dispatch } = useContext(MapContext)
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

      useEffect(() => {
        if(state.currentTrackPhotos && state.currentTrackPhotos.length > 0){
          console.log(state.currentTrackPhotos)
          state.currentTrackPhotos.forEach((photo, index) => {
            const photoMarker = new google.maps.Marker()
            photoMarker.setMap(map)
            photoMarker.setPosition(new google.maps.LatLng(state.currentTrackPhotos[index].coords.lat, state.currentTrackPhotos[index].coords.lng))
            // photoMarker.addListener("click", () => dispatch({type: "setCurrentPhoto", payload: state.currentTrackPhotos[index]}))
            photoMarker.addListener("click", () => props.setLatestPhoto(state.currentTrackPhotos[index]))
            photoMarker.setIcon(pic)
          })
        }
      }, [dispatch, props, state.currentTrackPhotos])


    return (
        <div ref={mapContainer} style={{ width: "100%", height: "500px"}} />
    )
}

export default TrackMap