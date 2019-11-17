import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
// import * as firebaseui from 'firebaseui'

import './index.css';
import AppRouter from './AppRouter';
import * as serviceWorker from './serviceWorker';

const env = require('./firebaseconfig.json')

console.log(".env", env)

// import 'firebase/firestore'
// import 'firebase/storage'

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

//   var ui = new firebaseui.auth.AuthUI(firebase.auth());

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
