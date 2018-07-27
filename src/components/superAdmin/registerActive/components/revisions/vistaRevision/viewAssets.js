import React, { Component } from 'react'
import { firestore } from 'firebase'
import DataViewCheck from './dataViewCheck'
import { Link } from 'react-router-dom'
import { hashHistory } from 'react-router'


export default class ViewAssets extends Component {
    constructor() {
        super()

        this.state = {
            revision: '',
            positionBuilding: '',
            building: '',
            positionArea: '',
            area: '',
            positionLevel: '',
            level: '',
            assets: [],
            refresh: ''
        }

        this.selectBuilding = this.selectBuilding.bind(this)
        this.selectArea = this.selectArea.bind(this)
        this.selectLevel = this.selectLevel.bind(this)
        this.assetsForBuilding = this.assetsForBuilding.bind(this)
        this.assetsForLevel = this.assetsForLevel.bind(this)
    }

    componentDidMount() {
        firestore().collection('revisionsStates').doc(this.props.match.params.id).onSnapshot(data => {
            if (data.data().statusRevision === 'process') {
                swal("Inspeccion en proceso", "", "warning", { timer: 2000 });
                return hashHistory.push('/assets')
            }
            this.setState({
                revision: data.data()
            })
            this.selectBuilding()
        })
    }

    selectBuilding() {
        // /altaAssets/:id/:crumbBuilding/:crumbLevel/:crumbArea
        this.state.revision.checkList.buildings.map((building, index) => {
            if (building.crumb === this.props.match.params.crumbBuilding) {
                console.log('encontramos la pocision', index)
                this.setState({
                    positionBuilding: index,
                    building
                })
                if (this.props.match.params.crumbLevel !== '0') {
                    this.selectLevel()
                } else {
                    this.assetsForBuilding()
                }

            }
        })
    }

    selectLevel() {
        this.state.revision.checkList.buildings[this.state.positionBuilding].levels.map((level, index) => {
            if (level.crumb === this.props.match.params.crumbLevel) {
                console.log('encontramos la pocision', index)
                this.setState({
                    positionLevel: index,
                    level
                })
                if (this.props.match.params.crumbArea !== '0') {
                    this.selectArea()
                } else {
                    this.assetsForLevel()
                }
            }
        })
    }

    selectArea() {
        this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas.map((area, index) => {
            if (area.crumb === this.props.match.params.crumbArea) {
                console.log('encontramos la pocision', index)

                this.setState({
                    assets: this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas[index].assets,
                    positionArea: index,
                    area: area.name
                })
            }
        })
    }

    assetsForBuilding() {

        this.state.revision.checkList.buildings[this.state.positionBuilding].levels.map(level => {
            level.areas.map(area => {
                this.state.assets = this.state.assets.concat(area.assets)
            })
        })
        console.log(this.state.assets)
        this.setState({
            positionArea: true
        })
    }

    assetsForLevel() {
        this.state.revision.checkList.buildings[this.state.positionBuilding].levels[this.state.positionLevel].areas.map(area => {
            this.state.assets = this.state.assets.concat(area.assets)
        })
        console.log(this.state.assets)
        this.setState({
            positionArea: true
        })
    }
    upTop() {
        $('html,body').animate({
            scrollTop: $("#topArea").offset().top
        }, 1000);
    }

    render() {
        return (
            <div id="topArea" >
                <div className="col-12  d-flex justify-content-end">
                    <button className="btn btn-primary buttonCircle position-fixed" onClick={() => this.upTop()} ><i className="fas fa-chevron-up"></i></button>
                </div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb letra">
                        <li className="breadcrumb-item" aria-current="page" ><Link to={'/viewBuildings/' + this.props.match.params.id}>{this.state.building.type + ' ' + this.state.building.name}</Link></li>
                        {this.props.match.params.crumbLevel !== '0' &&
                            <li className="breadcrumb-item" aria-current="page" ><Link to={'/viewLevels/' + this.props.match.params.id + '/' + this.props.match.params.crumbBuilding}>NIVEL {this.state.level.name}</Link></li>
                        }
                        {this.props.match.params.crumbArea !== '0' &&
                            <li className="breadcrumb-item"><Link to={'/altaAreas/' + this.props.match.params.id + '/' + this.props.match.params.crumbBuilding + '/' + this.props.match.params.crumbLevel}>ÁREA {this.state.area}</Link></li>
                        }
                        <li className="breadcrumb-item active" aria-current="page">Activos</li>
                    </ol>
                </nav>
                <div className="container">
                    <div className="card">
                        <div className="card-header text-center ">
                            <h4>TABLA DE ACTIVOS</h4>
                        </div>
                        {this.state.positionArea !== '' &&
                            <div className="card-body">
                                {this.state.assets.length > 0 &&
                                    <table className="table table-bordered table-responsive ">
                                        <thead>
                                            <tr className="bg-info" >
                                                <th>#</th>
                                                <th>FOTO</th>
                                                <th>NOMBRE</th>
                                                <th>MARCA</th>
                                                <th>MODELO</th>
                                                <th>CANTIDAD</th>
                                                <th>VER ACTIVO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.assets.map((asset, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <th scope="row">{index + 1}</th>
                                                        <td><img style={{ width: '80px' }} src={asset.conditions.photosUrl[0]} alt="" /></td>
                                                        <td>{asset.name}</td>
                                                        <td>{asset.brand}</td>
                                                        <td>{asset.model}</td>
                                                        <td>{asset.numberAsset}</td>
                                                        <td><button type="button" className="btn btn-outline-dark btn-block" data-toggle="modal" data-target={'#modalBoulding' + index}><i className="fa fa-eye" aria-hidden="true"></i></button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                }
                                <div>
                                    {this.state.assets.map((asset, index) => {
                                        return (
                                            <div key={index} className="modal fade" id={'modalBoulding' + index} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-lg modal-lg-view ">
                                                    <div className="modal-content p-3 ">
                                                        <h3 className="text-center" >ACTIVO {asset.name}</h3>
                                                        <hr />
                                                        <DataViewCheck
                                                            className="col-12"
                                                            dataBasic={asset}
                                                            refresh={this.refresh}
                                                            label='activo'
                                                            type='activo'
                                                            index={index}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                {this.state.assets.length === 0 &&
                                    <h3 className="textCenter" >No hay activos</h3>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
