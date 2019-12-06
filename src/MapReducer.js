import firebase from 'firebase/app'

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

    case "loading": {
      return {...state, loading: true}
    }
    case "getTrips": {
      return {...state, trips: action.payload, loading: false }
    }
    case "getTripsByUserId": {
      return {...state, userProfile: {...state.userProfile, usersTrips: action.payload, loading: false}}
    }
    case "setCurrentTrip": {
      return {...state, currentTrip: action.payload, loading: false}
    }
    case "setTracksByTripId": {
      return{...state, currentTrip: {...state.currentTrip, tracks: action.payload, loading: false}}
    }
    case "setPoints": {
      return { ...state, uploadPoints: action.payload, loading: false };
    }
    case "setCurrentTrackById": {
      return{...state, currentTrack: action.payload, loading: false}
    }
    case "getCurrentTrackEventsByTrackId": {
      return{ ...state, currentTrack: {...state.currentTrack, events: action.payload, loading: false}}
    }
    case "getPhotosByTrack": {
      return{...state, currentTrackPhotos: action.payload, loading: false}
    }
    case "authstatechanged": {
      // console.log('authstatechanged')
      return { ...state, user: action.payload, loading: false}
    }
    case "setUserData": {
      // return {...state, user: {...state.user, data: action.payload} }
      return {...state, userProfile: action.payload, loading: false}
    }
    case "getAllImages": {
      return {...state, images: action.payload, loading: false}
    }
    case "setCurrentPhoto": {
      return {...state, currentPhoto: action.payload, loading: false}
    }
    case "signout": {
      firebase.auth().signOut()
      return state
    }
    case "goToTrip": {
      console.log(action.payload)
      return
    }
    case "goToMyTrips": {
      // console.log(`/id/${state.user.uid}/mytrips`)
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
