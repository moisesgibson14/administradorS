import axios from 'axios'

function uploadFile(e, callback) {
    let files = e.target.files || e.dataTransfer.files
    const config = { headers: { "Content-Type": "multipart/form-data" } }
    let fd = new FormData()
    fd.append("file", files[0])

    if (files.length) {
        axios.post("http://api.todoensubastas.com.mx/uploadFiles/uploadFilePublic/", fd, config).then(response => {
            callback(response.data.data[0])
        }).catch(err => {
            console.log(err)
        })
    }
}

function deleteImage(data, callback){
    const config = { headers: { "Content-Type": "multipart/form-data" } }
    axios.post("http://api.todoensubastas.com.mx/uploadFiles/remove/", data).then(response => {
        console.log(response);
        callback(true)
        
    }).catch(error => {
        console.log(error);
        callback(true)
    })
 }

 function inputSwal(input, calback) {

    swal({
        text: input,
        content: "input",
    })
        .then((value) => {
            if (value) {
                calback(value)
            }
        });
}


module.exports = {
    uploadFile,
    deleteImage,
    inputSwal
}