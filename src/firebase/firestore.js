import firebase from './firebase'
import "firebase/firestore";
// import "firebase/storage"

// var storage = firebase.storage();

export function getAllTrips(dispatch) {
  let trips = [];
  const tripRef = firebase.firestore().collection("trips");
  // .orderBy("meta.starttime", "desc");
  tripRef.get().then(snap => {
    trips = snap.docs;
    const docs = trips.map(doc => {
      return { id: doc.id, data: doc.data() };
    });
    dispatch({ type: "getTrips", payload: docs });
  });
}

export function getAllTripsByUserId(userid, dispatch) {
  let trips = [];
  const tripRef = firebase.firestore().collection("trips").where("uid", "==", userid);
  // .orderBy("meta.starttime", "desc");
  tripRef.get().then(snap => {
    trips = snap.docs;
    const docs = trips.map(doc => {
      return { id: doc.id, data: doc.data() };
    });
    dispatch({ type: "getTrips", payload: docs });
  });
}

export function getTripBySlug(slug, dispatch) {
  const tripRef = firebase.firestore().collection("trips").where("slug", "==", slug);
  tripRef.get().then(snap => {
    const data = snap.docs[0].data()
    dispatch({type: "setCurrentTrip", payload: data})
    setCurrentTripTracks(snap.docs[0].id, dispatch)
  })
}

function setCurrentTripTracks(tripId, dispatch) {
  console.log(tripId)
    let tracks = []
    const trackRef = firebase.firestore().collection("tracks").where("trip", "==", tripId).orderBy("start_time")
    trackRef.get().then(snap => {
      tracks = snap.docs;
      const docs = tracks.map(doc => {
        return { id: doc.id, data: doc.data() };
      });
      dispatch({ type: "setTracksByTripId", payload: docs });
    });
  
}


export function getCurrentTrackById(trackId, dispatch) {
  const trackRef = firebase.firestore().collection("tracks").doc(trackId)
  trackRef.get()
  .then((doc) => dispatch({ type: "setCurrentTrackById", payload: {...doc.data(), id: doc.id}}) )
}

export function addImageToTrack(track, file, url) {
  firebase.firestore().collection("images").doc().set({
    name: file.name,
    lastModified: file.lastModified,
    size: file.size,
    imageUrl: url,
    track: track
  })
}

export function getImagesByTrack(track, dispatch) {
  let images = []
  firebase.firestore().collection("images").where("track", "==", track).get()
  .then(snap => {
    images = snap.docs
    const docs = images.map(doc => {
      return {id: doc.id, data: doc.data()}
    })
    dispatch({ type: "getAllImages", payload: docs})
  })
}

export function getUseDetailsByUID(uid, dispatch) {
  if(!uid) {
    dispatch({type: "setUserData", payload: {}})
  }else{
    firebase.firestore().collection("users").doc(uid).get()
    .then(user => dispatch({type: "setUserData", payload: user.data()}))
  }
}

// export function getAllTracks(dispatch) {
//   let tracks = [];
//   const trackRef = firebase
//     .firestore()
//     .collection("test")
//     .orderBy("meta.starttime", "desc");
//   trackRef.get().then(snap => {
//     tracks = snap.docs;
//     const docs = tracks.map(doc => {
//       return { id: doc.id, meta: doc.data() };
//     });
//     dispatch({ type: "getTracks", payload: docs });
//   });
// }

// export function getFullGPS(dispatch, id) {
//   const trackRef = firebase
//     .firestore()
//     .collection("test")
//     .doc(id)
//     .collection("gps")
//     .doc("allPointsJSON");
//   trackRef
//     .get()
//     .then(doc =>
//       dispatch({ type: "loadGPS", payload: JSON.parse(doc.data().points) })
//     );
// }



// export function getAllTypes(dispatch) {
//   const trackRef = firebase.firestore().collection("types");
//   let types = []
//   trackRef.get().then(snap => {
//     types = snap.docs;
//     const docs = types.map(doc => {
//       return { id: doc.id, data: doc.data() };
//     });
//     dispatch({ type: "getTypes", payload: docs });
//   });
// }

// export function uploadTrip(trip) {
//   console.log(trip)
//   // const trackRef = firebase.firestore().collection("trips");
//   // trackRef.doc(trip.name).set({
//   //   type: trip.type
//   // })
// }