import React, { PureComponent } from 'react'
import { firestore } from 'firebase'
import { Link } from 'react-router-dom'
import DataViewCheck from './dataViewCheck'
import { hashHistory } from 'react-router'


export default class ViewAreas extends PureComponent {
    constructor() {
        super()

        this.state = {
            revision: '',
            positionBuilding: '',
            building:'',
            positionLevel: '',
            level:'',
            areas: []
        }

        this.selectBuilding = this.selectBuilding.bind(this)
        this.selectLevel = this.selectLevel.bind(this)
    }

    componentDidMount() {
        firestore().collection('revisionsStates').doc(this.props.match.params.id).onSnapshot(data => {
            if (data.data().statusRevision === 'process') {
                swal("Inspeccion en proceso", "", "warning", { timer: 2000 });
                return hashHistory.push('/assets')
            }

            console.log(data.data());

            this.setState({
                revision: data.data(),
            })
            this.selectBuilding()
        })
    }

    selectBuilding() {
        ///altaAreas/:id/:crumbBuilding/crumbLevel

        this.state.revision.checkList.buildings.map((building, index) => {
            if (building.crumb === this.props.match.params.crumbBuilding) {
                console.log('encontramos la pocision', index)
                this.setState({
                    positionBuilding: index,
                    building
                })
                this.selectLevel()
            }
        })
    }

    selectLevel() {
        this.state.revision.checkList.buildings[this.state.positionBuilding].levels.map((level, index) => {
            if (level.crumb === this.props.match.params.crumbLevel) {
                console.log('encontramos la pocision', index)
                this.setState({
                    positionLevel: index,
                    areas: level.areas,
                    level
                })
            }
        })
    }

    redirectToAsset(i) {
        let crumbArea = this.state.areas[i].crumb

        // /viewAssets/:id/:crumbBuilding/:crumbLevel/:crumbArea
        return hashHistory.push('/viewAssets/' + this.props.match.params.id + '/' + this.props.match.params.crumbBuilding + '/' + this.props.match.params.crumbLevel + '/' + crumbArea)
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
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb letra">
                        <li className="breadcrumb-item" aria-current="page" ><Link to={'/viewBuildings/' + this.props.match.params.id}>{this.state.building.type + ' ' + this.state.building.name}</Link></li>
                        <li className="breadcrumb-item" aria-current="page" ><Link to={'/viewLevels/' + this.props.match.params.id + '/' + this.props.match.params.crumbBuilding}>NIVEL {this.state.level.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">ÁREAS</li>
                    </ol>
                </nav>
                <div className="container">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4>TABLA DE ÁREAS</h4>
                        </div>
                        <div className="card-body">
                            {this.state.positionLevel !== '' &&
                                <div>
                                    {this.state.areas.length > 0 &&
                                        <table className="table table-bordered table-responsive ">
                                            <thead>
                                                <tr className="coloArea" >
                                                    <th>#</th>
                                                    <th>FOTO</th>
                                                    <th>NOMBRE</th>
                                                    <th>ACTIVOS</th>
                                                    <th>VER ÁREA</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.areas.map((area, index) => {
                                                    return (
                                                        <tr key={index} >
                                                            <th scope="row">{index + 1}</th>
                                                            <td><img style={{ width: '80px' }} src={area.conditions.photosUrl[0]} alt="" /></td>
                                                            <td>{area.name}</td>
                                                            <td><button className="btn btn-outline-dark btn-block" onClick={() => this.redirectToAsset(index)} >{area.assets.length}</button></td>
                                                            <td><button type="button" className="btn btn-outline-dark btn-block" data-toggle="modal" data-target={'#modalBoulding' + index}><i className="fa fa-eye" aria-hidden="true"></i></button></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    }
                                    {this.state.positionLevel !== '' &&
                                        <div>
                                            {this.state.areas.map((area, index) => {
                                                return (
                                                    <div key={index} className="modal fade" id={'modalBoulding' + index} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog modal-lg modal-lg-view ">
                                                            <div className="modal-content p-3 ">
                                                                <h3 className="text-center" >ÁREA {area.name}</h3>
                                                                <hr />
                                                                <DataViewCheck
                                                                    className="col-12"
                                                                    dataBasic={area}
                                                                    refresh={this.refresh}
                                                                    label='area'
                                                                    type='area'
                                                                    index={index}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>
                            }
                            {this.state.areas.length === 0 &&
                                <h3 className="textCenter" >No hay áreas</h3>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
