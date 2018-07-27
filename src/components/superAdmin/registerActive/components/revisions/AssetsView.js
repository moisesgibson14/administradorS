import React, { Component } from 'react'
import { firestore } from 'firebase'
import Cryptr from 'cryptr'
import { hashHistory } from 'react-router'
import Revisions from './revision'
import AssignInstectors from './assignInspectors'
import MyAssigned from './myAssigned'
import swal from 'sweetalert';
var cryptr = new Cryptr('satesSeguro8102')

class AssetsView extends Component {
    constructor() {
        super()

        this.state = {
            actives: [],
            perfil: '',
            id: '',
            admin: false
        }

        this.refreshId = this.refreshId.bind(this)
        this.assignAdmin = this.assignAdmin.bind(this)

    }

    componentWillMount() {
        this.state.id = this.props.match.params.id

        let userLocal = JSON.parse(localStorage.getItem('atadresu'))
        let dataUserLogged = {
            email: cryptr.decrypt(userLocal.one),
            password: cryptr.decrypt(userLocal.two)
        }

        firestore().collection('users').where('email', '==', dataUserLogged.email).get().then(data => {
            data.forEach(user => {
                if (user.exists) {
                    if (user.data().profile === 'administrator') {
                        this.assignAdmin()
                        this.setState({ admin: true })
                    } else {
                        this.setState({
                            perfil: user.data().profile
                        })
                    }
                    console.log(this.state.perfil)
                }
            })

        })
    }

    assignAdmin() {
        swal("¿Qué tipo de perfil quieres ser en la revisión?", {
            buttons: {
                catch: {
                    text: "Valuador",
                    value: "catch",
                },
                defeat: {
                    text: "Líder",
                    value: "defeat",
                },
                cancel: "Cancelar",
            },
        })
            .then((value) => {
                switch (value) {

                    case "defeat":
                        this.setState({
                            perfil: 'chiefInspector'
                        })
                        break;

                    case "catch":
                        this.setState({
                            perfil: 'appraiser'
                        })
                        break;

                    default:
                        return hashHistory.push('/assets')

                }
            });

    }

    refreshId(callbak) {
        console.log(this.props.match.params.id);
        callbak(this.props.match.params.id)
        this.setState({
            id: this.props.match.params.id
        })
    }

    render() {
        return (
            <div>
                {this.state.perfil === 'appraiser' &&
                    <Revisions
                        id={this.state.id}
                        refreshId={this.refreshId}
                    />
                }
                {this.state.perfil === 'chiefInspector' &&
                    <AssignInstectors
                        id={this.state.id}
                        refreshId={this.refreshId}
                    />
                }
                {this.state.perfil === 'inspector' &&
                    < MyAssigned
                        id={this.state.id}
                        refreshId={this.refreshId}
                    />
                }
                {this.state.admin &&
                    <div className="col-12  d-flex justify-content-end">
                        <button className="btn buttonCircle btn-primary position-fixed" onClick={() => this.assignAdmin()} ><i className="fas fa-exchange-alt"></i></button>
                    </div>
                }
            </div>
        )
    }
}

export default AssetsView