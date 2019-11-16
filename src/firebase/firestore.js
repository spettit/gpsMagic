import firebase from "firebase/app";
import "firebase/firestore";
// import "firebase/storage"

// var storage = firebase.storage();

export function getAllTracks(dispatch) {
  let tracks = [];
  const trackRef = firebase
    .firestore()
    .collection("test")
    .orderBy("meta.starttime", "desc");
  trackRef.get().then(snap => {
    tracks = snap.docs;
    const docs = tracks.map(doc => {
      return { id: doc.id, meta: doc.data() };
    });
    dispatch({ type: "getTracks", payload: docs });
  });
}

export function getFullGPS(dispatch, id) {
  const trackRef = firebase
    .firestore()
    .collection("test")
    .doc(id)
    .collection("gps")
    .doc("allPointsJSON");
  trackRef
    .get()
    .then(doc =>
      dispatch({ type: "loadGPS", payload: JSON.parse(doc.data().points) })
    );
}

export function getAllTrips(dispatch) {
  let trips = [];
  const trackRef = firebase.firestore().collection("trips");
  // .orderBy("meta.starttime", "desc");
  trackRef.get().then(snap => {
    trips = snap.docs;
    const docs = trips.map(doc => {
      return { id: doc.id, data: doc.data() };
    });
    dispatch({ type: "getTrips", payload: docs });
  });
}

export function getAllTypes(dispatch) {
  const trackRef = firebase.firestore().collection("types");
  let types = []
  trackRef.get().then(snap => {
    types = snap.docs;
    const docs = types.map(doc => {
      return { id: doc.id, data: doc.data() };
    });
    dispatch({ type: "getTypes", payload: docs });
  });
}

export function uploadTrip(trip) {
  console.log(trip)
  // const trackRef = firebase.firestore().collection("trips");
  // trackRef.doc(trip.name).set({
  //   type: trip.type
  // })
}