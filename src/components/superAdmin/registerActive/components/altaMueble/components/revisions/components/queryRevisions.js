import React, { Component } from 'react';
import { firestore } from 'firebase'
import Cryptr from 'cryptr'
import dateFormat from 'dateformat'
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';
var cryptr = new Cryptr('satesSeguro8102')
var moment = require('moment');
moment().format();
class QueryRevisions extends Component {
    constructor(props){
        super(props)
        this.state = {
            actives: [],
            perfil: '',
            id: '',  
            collapse: 0,
            cards: [1, 2, 3, 4, 5]
        }
        this.refresh = this.refresh.bind(this)
        this.toggle = this.toggle.bind(this);
        console.log(props);
        
    }
    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }
    componentWillMount() {
        let userLocal = JSON.parse(localStorage.getItem('atadresu'))
        let dataUserLogged = {
            email: cryptr.decrypt(userLocal.one),
            password: cryptr.decrypt(userLocal.two)
        }        
    firestore().collection('users').where('email', '==', dataUserLogged.email).onSnapshot(data => {
            data.forEach(user => {
                if (user.exists) {
                    this.setState({
                        perfil: user.data().profile                        
                    })                
                }
            })

        })
    }
    refresh() {
        this.setState({
            refresh: ''
        })

    }

    render() {
        const { cards, collapse } = this.state;
        return (
            <div>                          
                {
                    this.props.data.length == 0 &&
                    <div className="text-center">
                    <br/><br/>
                        <h3 className="text-center">
                            <strong> No hay ninguna revisión </strong>
                        </h3>                        
                        <br/>
                        <button className="btn btn-success" onClick={(e) => { this.props.changeTypeRevision(2) , this.refresh()}} >Generar revisión</button>
                    </div>
                }
                {
                    this.props.data.length !== 0 &&                
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>TIPO DE REVISIÓN</th>
                                <th>FECHA</th>
                                <th>HORA</th>
                                <th>Ubicación</th>
                                <th>Duración</th>                        
                                <th>Inspector</th>
                                <th>EDITAR</th>
                                {this.state.perfil === 'administrator' &&
                                <th>ELIMINAR</th>
                                } 
                            </tr>
                        </thead>
                        { this.props.data.map((revisions,keyRevisions) =>                        
                            <tbody key={keyRevisions}>
                                {/* <span>{revisions}</span> */}
                                <tr>
                                    <th scope="row">{keyRevisions+1}</th>
                                    <td>{revisions.typeRevision}</td>
                                    <td>{revisions.reviewDate}</td>                                
                                    <td>{revisions.hour}</td>
                                    <td>{revisions.location['state']}</td>
                                    <td>{revisions.reviewTime}</td>
                                    <td>{revisions.inspector}</td>
                                    <td onClick={() => {this.props.editRevision(revisions.idCrumb), this.props.refresh }} style={{ cursor: 'pointer' }}>
                                            <span  className="fas fa-edit"></span>                                 
                                    </td>
                                    {this.state.perfil === 'administrator' &&
                                        <td style={{ cursor: 'pointer' }} onClick={() => this.props.deleteRevision(keyRevisions)}>
                                            <span className="fas fa-trash-alt"></span>
                                        </td>
                                    }                                    
                                </tr>
                            </tbody>
                        )}                
                    </table>         
                </div>
                }
            </div>
        );
    }
}

export default QueryRevisions;