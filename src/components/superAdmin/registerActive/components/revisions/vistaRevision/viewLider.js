import React, { Component } from 'react'
import { firestore } from 'firebase'
import { Link } from 'react-router-dom'

class viewLider extends Component {
    constructor() {
        super()

        this.state = {
            revisions: []
        }
    }

    componentDidMount() {
        firestore().collection('revisionsStates').where('idAsset', '==', this.props.id).get().then(data => {
            let temRevisions = []
            data.forEach(revision => {
                temRevisions.push(revision.data())
            })

            console.log(temRevisions);

            this.setState({
                revisions: temRevisions
            })
        })
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header text-center colorConstruccion ">
                        <h4>ULTIMAS REVISIONES</h4>
                    </div>
                    <div className="card-body">
                        <div className="col-12" >
                            {this.state.revisions.length === 0 &&
                                <h3 className="text-center" >NO HAY REVISIONES</h3>
                            }
                            {this.state.revisions.length > 0 &&
                                <table className="table table-bordered table-responsive">
                                    <thead className="table-dark latterDark " >
                                        <tr>
                                            <th>#</th>
                                            <th>TIPO DE REVISIÓN</th>
                                            <th>FECHA</th>
                                            <th>ESTATUS</th>
                                            <th>VER REVISIÓN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.revisions.map((revision, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td> {revision.typeRevision} </td>
                                                    <td> {revision.dateRevision} </td>
                                                    {revision.statusRevision === 'finished' &&
                                                        <td>Finalizado</td>
                                                    }
                                                    {revision.statusRevision === 'process' &&
                                                        <td>En proceso</td>
                                                    }
                                                    <td><Link className="btn btn-outline-dark btn-block "  to={'/viewBuildings/' + revision.crumb} ><i className="fas fa-eye"></i></Link></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default viewLider
