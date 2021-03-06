import firebase from "./firebase";
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
      return { ...doc.data(), id: doc.id,  };
    });
    dispatch({ type: "getTrips", payload: docs });
  });
}

export function getAllTripsByUserId(userid, dispatch) {
  let trips = [];
  const tripRef = firebase
    .firestore()
    .collection("trips")
    .where("uid", "==", userid);
  // .orderBy("meta.starttime", "desc");
  tripRef.get().then(snap => {
    trips = snap.docs;
    const docs = trips.map(doc => {
      return { ...doc.data(), id: doc.id,  };
    });
    dispatch({ type: "getTripsByUserId", payload: docs });
  });
}

export function getTripBySlug(slug, dispatch) {
  const tripRef = firebase
    .firestore()
    .collection("trips")
    .where("slug", "==", slug);
  tripRef.get().then(snap => {
    const data = { ...snap.docs[0].data(), id: snap.docs[0].id};
    dispatch({ type: "setCurrentTrip", payload: data });
    setCurrentTripTracks(snap.docs[0].id, dispatch);
  });
}

function setCurrentTripTracks(tripId, dispatch) {
  let tracks = [];
  const trackRef = firebase
    .firestore()
    .collection("tracks")
    .where("trip", "==", tripId)
    .orderBy("start_time");
  trackRef.get().then(snap => {
    tracks = snap.docs;
    const docs = tracks.map(doc => {
      return { ...doc.data(), id: doc.id };
    });
    dispatch({ type: "setTracksByTripId", payload: docs });
  });
}

export function getCurrentTrackById(trackId, dispatch) {
  const trackRef = firebase
    .firestore()
    .collection("tracks")
    .doc(trackId);
  trackRef
    .get()
    .then(doc =>
      dispatch({
        type: "setCurrentTrackById",
        payload: { ...doc.data(), id: doc.id }
      })
    );
    getCurrentTrackEventsByTrackId(trackId, dispatch)
}

export function getCurrentTrackEventsByTrackId(trackId, dispatch) {
  const trackRef = firebase
    .firestore()
    .collection("tracks")
    .doc(trackId)
    .collection("events")
    .orderBy("starttime")
  trackRef
    .get()
    .then(event => {
      const events = event.docs.map(doc => {
        return( {...doc.data(), points: JSON.parse(doc.data().x_points), id: doc.id, })
      })
      dispatch({ type: "getCurrentTrackEventsByTrackId", payload: events})
    });
}

export function addImageToTrack(track, file, url) {
  firebase
    .firestore()
    .collection("images")
    .doc()
    .set({
      name: file.name,
      lastModified: file.lastModified,
      size: file.size,
      imageUrl: url,
      track: track
    });
}

export function addCoverImageToTrip(tripId, imageURL, thumbUrl) {
  firebase
    .firestore()
    .collection("trips")
    .doc(tripId)
    .set({
      image: imageURL,
      thumbnail: thumbUrl
    }, {merge: true});
}

export function getImagesByTrack(track, dispatch) {
  let images = [];
  firebase
    .firestore()
    .collection("images")
    .where("track", "==", track)
    .get()
    .then(snap => {
      images = snap.docs;
      const docs = images.map(doc => {
        return { id: doc.id, data: doc.data() };
      });
      dispatch({ type: "getAllImages", payload: docs });
    });
}

export function getUseDetailsByUID(uid, dispatch) {
  if (!uid) {
    dispatch({ type: "setUserData", payload: {} });
  } else {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then(user => dispatch({ type: "setUserData", payload: user.data() }));
  }
}

export function addUserProfile(uid, email, first_name, last_name) {
  const data = { email: email, first_name: first_name, last_name: last_name };
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set(data);
}

export function getPhotosByTrack(trackId, dispatch) {
  console.log("getting photos")
  let photos = [];
  const trackRef = firebase
    .firestore()
    .collection("photos")
    .where("track", "==", trackId)
    .orderBy("timestamp");
  trackRef.get().then(snap => {
    console.log("snap")
    photos = snap.docs;
    const docs = photos.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    dispatch({ type: "getPhotosByTrack", payload: docs });
  });
}

export function addNewTrip(data, dispatch) {
  firebase
  .firestore()
  .collection("trips")
  .add(data)
  .then(ref => {
    // dispatch({type: "goToMyTrips"})
  })
}

export function addNewTrack(data) {
  firebase
  .firestore()
  .collection("tracks")
  .add(data)
}

export function uploadEventPoints(trackId, data) {
  firebase
  .firestore()
  .collection("tracks")
  .doc(trackId)
  .collection("events")
  .add(data)
}

export function uploadMinifiedPoints(trackId, data) {
  firebase
  .firestore()
  .collection("tracks")
  .doc(trackId)
  .set({"minified_points": data}, {merge: true})
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
