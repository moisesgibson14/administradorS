const loggedIn = () => {
    return !!localStorage.user // Nos devuelve true si existe y false si no existe
}

const userIsNotLogged = (nextState, replace) => {
    if(!loggedIn()) {
        replace({
            pathname: '/login'
        })
    }
}

export default userIsNotLogged