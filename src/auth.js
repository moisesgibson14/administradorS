import Cryptr from 'cryptr'
import { firestore } from 'firebase';
import { hashHistory } from 'react-router'
import swal from 'sweetalert'

var cryptr = new Cryptr('satesSeguro8102')

function userPermits(user, type, callback) {
    let authorization = 0;
    user.authorization.forEach(auth=>{
        if(auth.label === type && auth.value){
            authorization = 1;
            callback(auth)
        }else{
            
        }
    })

    if(authorization === 0){
        swal("Acceso denegado", "No tienes acceso a " + type, "error");
        return hashHistory.push('/')
    }
}

export default userPermits;