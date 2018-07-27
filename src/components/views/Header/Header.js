import React, { Component } from 'react';
import {
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle
} from 'reactstrap';
import firebase from 'firebase'
import { hashHistory } from 'react-router'
import { Link } from 'react-router-dom'
import $ from 'jquery'

class Header extends Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      user: {
        avatar: '',
        email: ''
      }
    }
    this.onLogout = this.onLogout.bind(this)
    this.firebaseAuth = this.firebaseAuth.bind(this)
    this.user = this.user.bind(this)
  }

  componentDidMount() {
    this.user()
  }

  firebaseAuth(callback) {
    firebase.auth().onAuthStateChanged(function (userResponse) {
      if (userResponse) {
        callback(userResponse)
      }
    });
  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }
  onLogout() {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('atadresu')
      localStorage.removeItem('userAthorization');
      return hashHistory.push('/login')
    }).catch(function (error) {
      alert('No se pudo cerrar la sesión')
    });
  }

  user() {
    firebase.auth().onAuthStateChanged((userTMP) => {
    //  Obtener el usuario de la BD de Firestore
      firebase.firestore().collection('users').where('email', '==', userTMP.email).get().then((snap) => {
        snap.forEach(user => {
          if (user.exists) {
            let userData = {
              avatar: user.data().avatar,
              email: user.data().email
            }
            this.setState({
              user: userData
            })
          }
        })
      }).catch(err => console.log('Error: ', err))
    })
  }

  render() {
    const { dropdownOpen, user } = this.state
    if (user.email === '') {
      $('.loadingUser').css({ 'display': 'block' })
    } else {
      $('.loadingUser').css({ 'display': 'none' })
    }
    let photoURL = (user.avatar !== '') ? user.avatar : 'img/avatar.svg'
    return (
      <header className="app-header navbar no-print">
        <NavbarToggler className="d-lg-none" id="closeMenu" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none mr-auto" id="closeMenu" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="nav-link dropdown-toggle">
                <img src={photoURL} className="img-avatar" />
                <span className="d-md-down-none">{user.email}</span>
              </DropdownToggle>
              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                <Link to="/profile">
                <DropdownItem><i className="fa fa-user"></i> Perfil</DropdownItem>
                </Link>
                <DropdownItem onClick={this.onLogout}><i className="fa fa-lock"></i> Cerrar sesión</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
          <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>&#9776;</NavbarToggler>
        </Nav>
      </header>
    )
  }
}

export default Header;
