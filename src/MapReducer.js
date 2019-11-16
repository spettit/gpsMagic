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
    case "getTrips": {
      return {...state, trips: action.payload}
    }
    case "setPoints": {
      return { ...state, uploadPoints: action.payload };
    }
    case "authstatechanged": {
      console.log('authstatechanged')
      return { ...state, user: action.payload}
    }
    case "signout": {
      console.log('signout')
      firebase.auth().signOut()
      return state
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
