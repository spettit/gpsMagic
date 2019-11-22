import firebase from './firebase'
// import "firebase/firestore";
import "firebase/storage"

const storage = firebase.storage()


export function uploadImageToStorage(file, metadata) {
    console.log(metadata)
    const storageRef = storage.ref('images/'+file.name)
    const task = storageRef.put(file, metadata)
    return task
}