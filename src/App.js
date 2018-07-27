import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from './components/views/Header/';
import Sidebar from './components/views/Sidebar/';
import Aside from './components/views/Aside/';
import Footer from './components/views/Footer/';
import { hashHistory } from 'react-router'
import Home from './components/home/home';
import Login from './components/login/login';
import RegisterUser from './components/superAdmin/registerUser/'
import UsersTessa from './components/superAdmin/registerUser/users'
import RegisterActive from './components/superAdmin/registerActive/'
import RegisterOwner from './components/superAdmin/registerOwner/'
import Owners from './components/superAdmin/registerOwner/owners'
import AssetsView from './components/superAdmin/registerActive/components/revisions/AssetsView'
import AltaLevels from './components/superAdmin/registerActive/components/revisions/altaLevels'
import AltaBuildings from './components/superAdmin/registerActive/components/revisions/altaBuilding'
import ViewBuildings from './components/superAdmin/registerActive/components/revisions/vistaRevision/viewBuildings'
import ViewLevels from './components/superAdmin/registerActive/components/revisions/vistaRevision/viewLevels'
import ViewAreas from './components/superAdmin/registerActive/components/revisions/vistaRevision/viewAreas'
import ViewAssets from './components/superAdmin/registerActive/components/revisions/vistaRevision/viewAssets'
import ViewRealAssets from './components/superAdmin/registerActive/components/revisions/vistaRevision/viewRealEstateAssets'
import AltaAreas from './components/superAdmin/registerActive/components/revisions/altaAreas'
import AltaRealAssets from './components/superAdmin/registerActive/components/revisions/altaRealEstateAssets'
import AltaAssets from './components/superAdmin/registerActive/components/revisions/altaAssets'
import ProfileUser from './components/profile/'
import Legal from './components/superAdmin/legal/containers/legal'
import Accountant from './components/superAdmin/accountant/containers/accountant'
import RevisionsAssetForniture from './components/superAdmin/registerActive/components/altaMueble/components/revisions'
import ViewAsset from './components/superAdmin/registerActive/components/revisions/vistaRevision/viewAsset'
import Assets from './components/superAdmin/registerActive/assets'
import Reports from './components/superAdmin/reports/containers/'
import NotFound from './components/404/'
import $ from 'jquery'
import firebase, { firestore } from 'firebase'
import Styles from './App.css'
class App extends Component {
  constructor() {
    super()

    this.state = {
      user: false
    }
  }
  componentDidMount() {
    $('.loadingUser').css({ 'display': 'block' })
    firebase.auth().onAuthStateChanged((userTMP) => {
      if (userTMP) {
        this.setState({ user: true })
        $('.loadingUser').css({ 'display': 'none' })
      } else {
        this.setState({ user: false })
        $('.loadingUser').css({ 'display': 'none' })
      }
    });
  }

  render() {
    if (this.state.user) {
      return (
        <div className="app">
          <Header className="no-print" />
          <div className="app-body">
            <Sidebar {...this.props} className="no-print" />
            <main className="main">
              <Container fluid>
                <Switch>
                  <Route path="/user/:id?" name="Registro y edicion de Usuario" component={RegisterUser} />
                  <Route path="/users" name="Usuarios" component={UsersTessa} />
                  <Route path="/reports" name="" component={Reports} />
                  <Route path="/legal" name="Usuarios" component={Legal} />
                  <Route path="/accountant" name="Contable" component={Accountant} />
                  <Route path="/owners" name="Usuarios" component={Owners} />
                  <Route path="/owner/:id?" name="Propietario" component={RegisterOwner} />
                  <Route path="/registerAsset" name="Activo" component={RegisterActive} />
                  <Route path="/editAsset/:id" name="Activo" component={RegisterActive} />
                  <Route path="/profile" name="Activo" component={ProfileUser} />
                  <Route path="/assets" name="Revision" component={Assets} />
                  <Route path="/revisionAssetForniture/:id" name="RevisionsAsset" component={RevisionsAssetForniture} />
                  <Route path="/revisionAssetState/:id" name="RevisionsAsset" component={AssetsView} />
                  <Route path="/revisionEdit/:id" name="" component={AssetsView} />
                  <Route path="/altaBuildings/:id" name="" component={AltaBuildings} />
                  <Route path="/altaLevels/:crumb/:id" name="" component={AltaLevels} />
                  <Route path="/altaAreas/:id/:crumbBuilding/:crumbLevel" name="" component={AltaAreas} />
                  <Route path="/altaRealAssets/:id/:crumbBuilding/:crumbLevel" name="" component={AltaRealAssets} />
                  <Route path="/altaAssets/:id/:crumbBuilding/:crumbLevel/:crumbArea" name="" component={AltaAssets} />
                  <Route path="/viewBuildings/:id" name="" component={ViewBuildings} />
                  <Route path="/viewLevels/:id/:crumbBuilding" name="" component={ViewLevels} />
                  <Route path="/viewAreas/:id/:crumbBuilding/:crumbLevel" name="" component={ViewAreas} />
                  <Route path="/viewAssets/:id/:crumbBuilding/:crumbLevel/:crumbArea" name="" component={ViewAssets} />
                  <Route path="/viewRealAssets/:id/:crumbBuilding/:crumbLevel" name="" component={ViewRealAssets} />
                  <Route path="/consulta/:id" component={ViewAsset} />
                  <Route path="/" name="Home" component={Home} />
                  <Route path="*" name="Home" component={Home} />
                </Switch>
              </Container>
            </main>
            <Aside />
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <Container fluid>
          <Switch>
            <Route path="/consulta/:id" component={ViewAsset} />
            <Route path="/" name="Home" component={Login} />
            <Route path="*" name="Home" component={Login} />
          </Switch>
        </Container>
      )
    }
  }
}

export default App;