import firebase from 'firebase/app';

const env = require('./firebaseconfig.json')

var config = {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    databaseURL: env.databaseURL,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId
  };
  firebase.initializeApp(config);

  export default firebase