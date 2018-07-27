const loggedIn = () => {
    return !!localStorage.user // Nos devuelve true si existe y false si no existe
}

const userIsLogged = (nextState, replace) => {
    if(loggedIn()) {
        replace({
            pathname: '/'
        })
    }
}

export default userIsLogged