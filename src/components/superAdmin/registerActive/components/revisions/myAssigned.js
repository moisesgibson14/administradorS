import React, { Component } from 'react';
import { firestore } from 'firebase'
import { hashHistory } from 'react-router'
import Cryptr from 'cryptr'
import swal from 'sweetalert';
var cryptr = new Cryptr('satesSeguro8102')

class MyAssigned extends Component {
    constructor(props) {
        super(props)

        this.state = {
            revision: '',
            user: '',
            position: -1,
            users: [],
            refresh: '',
            levels: ''
        }

        this.assignLevels = this.assignLevels.bind(this)
    }

    componentDidMount() {
        firestore().collection('revisionsStates').where('idAsset', '==', this.props.id).where('statusRevision', '==', 'process').onSnapshot(data => {
            let revisionTem = {}

            data.forEach(revision => {
                revisionTem = revision.data()
            })

            console.log(revisionTem)
            //Desencriptamos el usuario
            let userLocal = JSON.parse(localStorage.getItem('atadresu'))

            this.setState({
                revision: revisionTem,
                user: cryptr.decrypt(userLocal.one)
            })

            this.assignLevels()
        })
    }

    assignLevels() {
        let levelsTem = []
        if (this.state.revision.checkList) {
            this.state.revision.checkList.buildings.map((building, index) => {
                let i = index
                building.levels.map((level, index) => {
                    let x = index
                    level.userAssign.map((user, index) => {

                        if (user.label === this.state.user) {
                            console.log(user);
                            let levelTem = {}

                            levelTem.positionRevision = i
                            levelTem.positionLevel = x
                            levelTem.edificio = this.state.revision.checkList.buildings[i].name
                            levelTem.level = this.state.revision.checkList.buildings[i].levels[x].name
                            levelsTem.push({ ...levelTem })
                        }

                    })

                })
            })
            console.log('niveles finales', levelsTem);
            this.setState({
                levels: levelsTem
            })
        } else {
            this.setState({
                levels: 'nada'
            })
        }


    }

    assignLevel(i) {
        ///altaAreas/:id/:crumbBuilding/crumbLevel
        let id = this.state.revision.crumb
        let crumbBuilding = this.state.revision.checkList.buildings[this.state.levels[i].positionRevision].crumb
        let crumbLevel = this.state.revision.checkList.buildings[this.state.levels[i].positionRevision].levels[this.state.levels[i].positionLevel].crumb

        return hashHistory.push('altaAreas/' + id + '/' + crumbBuilding + '/' + crumbLevel)
    }

    render() {
        if (this.state.levels === '') return <div>Cargando....</div>
        return (
            <div className="">
                <div className="container">
                    <div className="card">
                        <div className="card-header text-center bg-primary ">
                            <h4>NIVELES ASIGNADOS</h4>
                        </div>
                        <div className="card-body">
                            {this.state.levels != 'nada' &&
                                <div className="row">
                                    {this.state.levels.length > 0 &&
                                        <table className="table table-bordered table-responsive ">
                                            <thead>
                                                <tr className="bg-primary" >
                                                    <th scope="col">#</th>
                                                    <th scope="col">EDIFICIO</th>
                                                    <th scope="col">NIVEL</th>
                                                    <th scope="col">DAR DE ALTA ÁREAS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.levels.map((level, index) => {
                                                    let i = index
                                                    return (
                                                        <tr key={index} onClick={() => this.assignLevel(i)} id="clickRevicion" >
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{level.edificio}</td>
                                                            <td>{level.level}</td>
                                                            <td><button className="btn btn-outline-dark btn-block" > <i className="fas fa-level-up-alt"></i> </button></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    }
                                    {this.state.levels.length === 0 &&
                                        <div className="col 12">
                                            <h3 className="textCenter" >No tienes niveles asignados</h3>
                                        </div>
                                    }
                                </div>
                            }
                            {this.state.levels === 'nada' &&
                                <h3 className="textCenter" >NO HAY REVISIONES ACTIVAS</h3>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyAssigned