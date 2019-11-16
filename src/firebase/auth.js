import firebase from 'firebase/app'

export const signUp = (email, password) => {
    try {
        firebase.auth().createUserWithEmailAndPassword(email, password)
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

