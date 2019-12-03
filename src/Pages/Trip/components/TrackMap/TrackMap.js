import React, {useRef, useEffect, useContext} from 'react'
import MapContext from "../../../../MapContext"

import sailing from '../../../../Icons/sailing.png'
import motorcycling from '../../../../Icons/motorcycling.svg'
import pic from '../../../../Icons/photo-24px.svg'


let google = window.google

let bounds = new google.maps.LatLngBounds();
let map
let poly
let marker
let modeIcon

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



const TrackMap = (props) => {
  const { state, dispatch } = useContext(MapContext)
    const mapContainer = useRef(null)

    if(state.currentTrip.type === 'motorcycling') {
      modeIcon = motorcycling
    } else {
      modeIcon = sailing
    }

    function addMarker(lat, lng){
      marker = new google.maps.Marker({position: {lat, lng}, map})

        marker.setIcon(modeIcon)

      }
      
    


    useEffect(() => {
        map = new google.maps.Map(mapContainer.current, options);
    }, [])

    useEffect(() => {bounds = new google.maps.LatLngBounds()})

    useEffect(() => {
      if(poly){poly.setMap(null)}
      if(props.polylinepoints){addPoly(props.polylinepoints)}}, [props.polylinepoints, state.currentTrack])

      useEffect(() => {
        if(props.polylinepoints && props.polylinepoints.length > 0){
          addMarker(props.polylinepoints[0].lat, props.polylinepoints[0].lng)
        }
           
      }, [props.polylinepoints])

      useEffect(() => {

        if(marker && props.marker){
          marker.setPosition(new google.maps.LatLng(props.marker.lat, props.marker.lng))
        }
        
      })

      useEffect(() => {
        if(props.images && props.images.length > 0){
          props.images.forEach((photo, index) => {
            const startpoint = photo.points[0]
            const photoMarker = new google.maps.Marker()
            photoMarker.setMap(map)
            photoMarker.setPosition(new google.maps.LatLng(startpoint.lat, startpoint.lng))
            photoMarker.setIcon(pic)
          })
        }
      }, [dispatch, props, state.currentTrackPhotos])


    return (
        <div ref={mapContainer} style={{ width: "100%", height: "500px"}} />
    )
}

export default TrackMap