import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Nav, NavItem, NavLink as RsNavLink } from 'reactstrap';
import isExternal from 'is-url-external';
import classNames from 'classnames';
import nav from './_nav';
import SidebarFooter from './../SidebarFooter';
import SidebarMinimizer from './../SidebarMinimizer';
import Cryptr from 'cryptr'
import { firestore } from 'firebase';
var cryptr = new Cryptr('satesSeguro8102')

class Sidebar extends Component {

  constructor() {
    super()
    this.state = {
      dataUser: [],
      ready: false
    }
    this.clickClose = this.clickClose.bind(this)
  }
  componentWillMount() {
    let userLocal = JSON.parse(localStorage.getItem('atadresu'))

    setTimeout(() => {
      firestore().collection('users').where('email', '==', cryptr.decrypt(userLocal.one)).onSnapshot(users=>{
        
        users.forEach(user=>{
          this.state.dataUser = user.data()
        })

        this.setState({
          ready: true
        })

      })
    }, 1000);
  }
  clickClose() {
    $(document).ready(function () {
      $('#closeMenu').click()
    });
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';

  }
  render() {
    const props = this.props;
    const activeRoute = this.activeRoute;
    const handleClick = this.handleClick;

    // badge addon to NavItem
    if (this.state.ready == false) return <h5>Cargando...</h5>
    const badge = (badge) => {
      if (badge) {
        const classes = classNames(badge.class);
        return (<Badge className={classes} color={badge.variant}>{badge.text}</Badge>)
      }
    };

    // simple wrapper for nav-title item
    const wrapper = item => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name) };

    // nav list section title
    const title = (title, key) => {
      const classes = classNames("nav-title", title.class);
      return (<li key={key} className={classes}>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (divider, key) => (<li key={key} className="divider"></li>);

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = classNames(item.class);
      const variant = classNames("nav-link", item.variant ? `nav-link-${item.variant}` : "");
      return (
        <NavItem key={key} className={classes}>
          {isExternal(item.url) ?
            <RsNavLink href={item.url} className={variant} onClick={() => this.clickClose()} activeClassName="active">
              {/* { this.state.dataUser[key].label == item.name && this.state.dataUser[key].value === true &&
                <div>
                <i className={item.icon}></i>{item.name} {badge(item.badge)}
                  <h2>this.state.dataUser</h2>
                </div>
              } */}
            </RsNavLink>
            :

            <div>
              {this.state.dataUser.authorization[key].label == item.name && this.state.dataUser.authorization[key].value === true &&
                <NavLink to={item.url} className={variant} onClick={() => this.clickClose()} activeClassName="active">
                  <div>
                    <i className={item.icon}></i>{item.name}{badge(item.badge)}
                  </div>
                </NavLink>
              }
            </div>
          }
        </NavItem>
      )
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      return (
        <li key={key} className={activeRoute(item.url, props)}>
          <a className="nav-link nav-dropdown-toggle" href="#" onClick={handleClick.bind(this)}><i className={item.icon}></i>{item.name}</a>
          <ul className="nav-dropdown-items">
            {navList(item.children)}
          </ul>
        </li>)
    };

    // nav link
    const navLink = (item, idx) =>
      item.title ? title(item, idx) :
        item.divider ? divider(item, idx) :
          item.children ? navDropdown(item, idx)
            : navItem(item, idx);

    // nav list
    const navList = (items) => {
      return items.map((item, index) => navLink(item, index));
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <Nav>
            {navList(nav.items)}
          </Nav>
        </nav>
        <SidebarFooter />
        <SidebarMinimizer />
      </div>
    )
  }
}

export default Sidebar;
