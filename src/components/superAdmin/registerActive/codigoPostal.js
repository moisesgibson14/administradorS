import axios from 'axios'
function getColonies(id, callback) {
    axios.get(`http://api.todoensubastas.com.mx/catalogs/postal/${id}`).then(response => {
        callback(response.data.search)
    }).catch(err => {
        console.log(err)
    })
}

function typeSettlement(name, colonies, callback) {
    colonies.forEach(colony => {
        if (colony.d_asenta === name) {
            callback(colony.d_tipo_asenta)
        }
    })
}

module.exports = {
    getColonies,
    typeSettlement
}