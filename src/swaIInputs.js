import swal from 'sweetalert'
function InputText(title, callback) {
    swal(title, {
        content: "input",
        buttons: ["Cancelar", "Agregar"]
    }).then((value) => {
        callback(value.toUpperCase())
    })
}

function confirmRequest(title, text, callback) {
    swal(title, {
        title: title,
        text: text,
        icon: "warning",
        buttons: ["CANCELAR", "OK"],
        dangerMode: true
    }).then((value) => {
        callback(value)
    })
}


module.exports = {
    InputText,
    confirmRequest
}



