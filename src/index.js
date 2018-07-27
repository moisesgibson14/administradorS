import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss'
import '../scss/core/_dropdown-menu-right.scss'
import './App.css'
import swal from 'sweetalert'
// Componentes
import App from './App'
import 'react-infinite-calendar/styles.css';

// Import de Middlewares
import userIsLogged from './components/auth/userLogged'
import userIsNotLogged from './components/auth/userNotLogged'

// Configuración firestore
import firebase from 'firebase'
import 'firebase/firestore'
firebase.initializeApp({
  apiKey: "AIzaSyBZn9tGhqNRM6NZZle3AxR_sIAnLERAy6k",
  authDomain: "satespruebas-ab39e.firebaseapp.com",
  databaseURL: "https://satespruebas-ab39e.firebaseio.com",
  projectId: "satespruebas-ab39e",
  storageBucket: "satespruebas-ab39e.appspot.com",
  messagingSenderId: "636263990746"
})

firebase.firestore().enablePersistence().then(() => {
  console.log('Persistencia habilitada')
}).catch(err => {
  if (err.code == 'failed-precondition') {
    swal("Error", "Multiples pestañas abiertas, persistencia solo puede estar habilitada en una pestaña", "error")
  } else if (err.code == 'unimplemented') {
    swal("Error", "El navegador no soporta la persistencia de datos", "error")
  }
})

ReactDOM.render((
  <div>
    <div className="loading" >
      <img className="gif" src="https://s3-us-west-2.amazonaws.com/gifsates/sates_logo.gif" alt="" />
    </div>
    <div className="loadingUser" >
      <img className="gif" src="https://s3-us-west-2.amazonaws.com/gifsates/sates_logo.gif" alt="" />
    </div>
  <HashRouter>
    <Switch>
      <Route path="/" name="Home" component={App} onEnter={userIsNotLogged} />      
    </Switch>
  </HashRouter>
  </div>
), document.getElementById('root'));
