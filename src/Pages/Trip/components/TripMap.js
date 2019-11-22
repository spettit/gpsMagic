import React, {useRef, useEffect, useContext} from 'react'
import MapContext from "../../../MapContext"
import randomcolor from 'randomcolor'


let google = window.google

let bounds = new google.maps.LatLngBounds();
let map
let poly

const options = {
    zoom: 15,
    center: { lat: 0, lng: 0 },
    disableDefaultUI: true,
  gestureHandling: 'none',
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

const TripMap = () => {
  const { dispatch, state } = useContext(MapContext)
    const mapContainer = useRef(null)
    useEffect(() => {
        map = new google.maps.Map(mapContainer.current, options);
    }, [])

    useEffect(() => {
      bounds = new google.maps.LatLngBounds()
    })

    useEffect(() => {
      if(poly){
        poly.setMap(null)
      }
        if(state.currentTracks && state.currentTracks.length > 0){
            state.currentTracks.forEach(track => {
                addPoly(track.data.minified_points)
                console.log(track.data.minified_points)
            })
        }
    }, [dispatch, state.currentTracks, state.points, state.uploadPoints])

    return (
        <div ref={mapContainer} style={{ width: "400px", height: "400px", margin: "10px"}} />
    )
}

export default TripMap