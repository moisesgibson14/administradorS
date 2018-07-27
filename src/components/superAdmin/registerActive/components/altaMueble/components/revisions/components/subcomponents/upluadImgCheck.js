import firebase from 'firebase'
import async from 'async'
import uuid from 'uuid'

function uploadFiles(e, callback, callbackPercentage, folder) {
    let files = []
    let name = uuid.v4()
    const task = firebase.storage().ref(`/${folder}/${name}`).put(e)
    task.on('state_changed', snapshot => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        callbackPercentage(percentage)
    }, error => { console.log(error.message) }, () => {
        files = files.concat(task.snapshot.downloadURL)
        console.log(files);
        callback(files)
    }
    )
}

export default uploadFiles
