import firebase from 'firebase/app'
import { navigate } from '@reach/router'

function MapReducer(state, action) {
  switch (action.type) {
    // case "getTracks": {
    //   return {...state, tracks: action.payload}
    // }
    // case "getTypes": {
    //   return {...state, types: action.payload}
    // }
    // case "setType": {
    //   // return {...state, types: action.payload}
    //   console.log(action.payload)
    //   return state
    // }
    case "getTrips": {
      return {...state, trips: action.payload}
    }
    case "setCurrentTrip": {
      return {...state, currentTrip: action.payload}
    }
    case "setTracksByTripId": {
      return{...state, currentTracks: action.payload}
    }
    case "setPoints": {
      return { ...state, uploadPoints: action.payload };
    }
    case "setCurrentTrackById": {
      return{...state, currentTrack: action.payload}
    }
    case "getPhotosByTrack": {
      return{...state, currentTrackPhotos: action.payload}
    }
    case "authstatechanged": {
      // console.log('authstatechanged')
      return { ...state, user: action.payload}
    }
    case "setUserData": {
      return {...state, userProfile: action.payload}
    }
    case "getAllImages": {
      return {...state, images: action.payload}
    }
    case "setCurrentPhoto": {
      return {...state, currentPhoto: action.payload}
    }
    case "signout": {
      firebase.auth().signOut()
      return state
    }
    case "goToMyTrips": {
      console.log(`/id/${state.user.uid}/mytrips`)
      // navigate(`/id/${state.user.uid}/mytrips`)
      return
    }
    // case "field": {
    //   return {...state, newTrip: {...state.newTrip, [action.fieldName]: action.payload}}
    // }
    // case "log": {
    //   console.log("dispatch");
    // }
    // case "loadGPS": {
    //   return {...state, points: action.payload}
    // }
    // case "reset": {
    //   return {...state, newTrip: {...state.newTrip, name: '', type: '', flag_coords: null}}
    // }
    default: {
      return state;
    }
  }
}

export default MapReducer;
