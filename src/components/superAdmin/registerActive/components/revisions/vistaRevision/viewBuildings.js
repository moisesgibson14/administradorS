import React, { Component } from 'react'
import { firestore } from 'firebase'
import { Link } from 'react-router-dom'
import DataViewCheck from './dataViewCheck'
import { hashHistory } from 'react-router'


export default class ViewBuildings extends Component {
    constructor() {
        super()

        this.state = {
            revision: {},
            refresh: '',
            id: ''
        }

        this.refresh = this.refresh.bind(this)
        this.upTop = this.upTop.bind(this)
    }

    componentDidMount() {
        this.state.id = this.props.match.params.id
        firestore().collection('revisionsStates').doc(this.props.match.params.id).get().then(revision => {
            let Revision = revision.data()

            console.log(revision.data());

            Revision.checkList.buildings.map(building => {
                building.numberlevels = building.levels.length
                building.realEstates = 0
                building.numberAssets = 0

                building.levels.map(level => {
                    building.realEstates = building.realEstates + level.RealEstateAssets.length

                    level.areas.map(area => {
                        building.numberAssets = building.numberAssets + area.assets.length
                    })
                })
            })

            console.log(Revision)

            this.setState({
                revision: Revision
            })
        })
    }

    refresh() {
        this.setState({
            refresh: ''
        })
    }

    upTop(){
        $('html,body').animate({
            scrollTop: $("#topArea").offset().top
        }, 1000);
    }

    render() {
        return (
            <div id="topArea" >
                <div className="col-12  d-flex justify-content-end">
                    <button className="btn btn-primary buttonCircle position-fixed" onClick={()=>this.upTop()} ><i className="fas fa-chevron-up"></i></button>
                </div>
                <div className="container">
                    <div className="card">
                        <div className="card-header text-center ">
                            <h4>TABLA DE CONSTRUCCIONES</h4>
                        </div>
                        <div className="card-body">
                            {this.state.revision.checkList &&
                                <table className="table table-bordered table-responsive ">
                                    <thead>
                                        <tr className="colorConstruccion" >
                                            <th>#</th>
                                            <td>FOTO</td>
                                            <th>TIPO</th>
                                            <th>NOMBRE</th>
                                            <th>NIVELES</th>
                                            <th>ACTIVOS INMUEBLES</th>
                                            <th>ACTIVOS MUEBLES</th>
                                            <th>VER CONSTRUCCIÓN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.revision.checkList.buildings.map((building, index) => {
                                            return (
                                                <tr key={index} >
                                                    <th scope="row">{index + 1}</th>
                                                    <td><img style={{ width: '80px' }} src={building.conditions.photosUrl[0]} alt="" /></td>
                                                    <td>{building.type}</td>
                                                    <td>{building.name}</td>
                                                    <td><Link to={'/viewLevels/' + this.state.id + '/' + building.crumb} className="btn btn-outline-dark btn-block" >{building.numberlevels}</Link></td>
                                                    <td><Link to={'/viewRealAssets/' + this.state.id + '/' + building.crumb + '/0'} className="btn btn-outline-dark btn-block" > {building.realEstates}</Link></td>
                                                    <td><Link to={'/viewAssets/' + this.state.id + '/' + building.crumb + '/0/0'} className="btn btn-outline-dark btn-block" > {building.numberAssets}</Link></td>
                                                    <td><button type="button" className="btn btn-outline-dark btn-block" data-toggle="modal" data-target={'#modalBoulding' + index}><i className="fa fa-eye" aria-hidden="true"></i></button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            }
                            {this.state.revision.checkList &&
                                <div>
                                    {this.state.revision.checkList.buildings.map((building, index) => {
                                        return (
                                            <div key={index} className="modal fade" id={'modalBoulding' + index} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-lg modal-lg-view ">
                                                    <div className="modal-content p-3 ">
                                                        <h3 className="text-center" >{building.type} {building.name}</h3>
                                                        <hr />
                                                        <DataViewCheck
                                                            className="col-12"
                                                            dataBasic={building}
                                                            refresh={this.refresh}
                                                            label='construcción'
                                                            type='construccion'
                                                            index={index}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                            {!this.state.revision.checkList &&
                                <h3 className="textCenter" >No hay contrucciones</h3>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}