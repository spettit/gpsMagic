import firebase from './firebase'
import { addUserProfile } from './firestore'

export const signUp = (email, password, first_name, last_name) => {
    try {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        // .then((credential) => console.log(credential.user.uid))
        .then((credential) => addUserProfile(credential.user.uid, email, first_name, last_name))
    }
    catch(error) {
        console.log(error)
    }
}

export const signIn = (email, password) => {
    try {
        firebase.auth().signInWithEmailAndPassword(email, password)
    }
    catch(error) {
        console.log(error)
    }
}

