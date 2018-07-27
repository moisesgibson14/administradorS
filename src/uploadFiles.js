import firebase from 'firebase'
import async from 'async'
import uuid from 'uuid'

function uploadFiles(e, callback, callbackPercentage, folder) {
    if (e.target.files.length > 0) {
        let files = []
        async.forEach(e.target.files, (file, callbackk) => {
            let name = uuid.v4() + '_' + file.name
            const task = firebase.storage().ref(`/${folder}/${name}`).put(file)
            task.on('state_changed', snapshot => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                callbackPercentage(percentage)
            }, error => { console.log(error.message) }, () => {
                files = files.concat(task.snapshot.downloadURL)
                callbackk()
            }
            )
        }, () => {
            callback(files)
        })
    }
}

function deleteFiles(e, callback) {

    if (typeof (e) === 'string') {
        let string = e.split('/')
        string = string[7].split('?')
        string = string[0].split('%2F')
        console.log(string);

        firebase.storage().ref().child(`/${string[0]}/${string[1]}`).delete().then(() => {
            callback(true)
        }).catch(error => {
            callback(false)
            console.log('error al eliminar en la funcion', error)
        })
    } else if (typeof (e) === 'object') {
        e.map(file => {
            let string = file.split('/')
            string = string[7].split('?')
            string = string[0].split('%2F')
            console.log(string);

            firebase.storage().ref().child(`/${string[0]}/${string[1]}`).delete().then(() => {
                callback(true)
            }).catch(error => {
                callback(false)
                console.log('error al eliminar en la funcion', error)
            })
        })
    } else {
        callback(false)
    }
}

module.exports = {
    uploadFiles,
    deleteFiles
}

