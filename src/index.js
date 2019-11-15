import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';

import './index.css';
import AppRouter from './AppRouter';
import * as serviceWorker from './serviceWorker';

require('dotenv').config()

console.log(process.env.projectId)

// import 'firebase/firestore'
// import 'firebase/storage'

var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: "gpxmagic",
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
  };
  firebase.initializeApp(config);

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
