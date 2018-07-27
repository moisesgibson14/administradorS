import React, { Component } from 'react'
import { firestore } from 'firebase'
import { Link } from 'react-router-dom'
import DataViewCheck from './dataViewCheck'
import { hashHistory } from 'react-router'


class ViewLevels extends Component {
    constructor() {
        super()

        this.state = {
            revision: '',
            position: '',
            building: ''
        }

        this.selectBuilding = this.selectBuilding.bind(this)
    }

    componentDidMount() {
        firestore().collection('revisionsStates').doc(this.props.match.params.id).onSnapshot(data => {
            if (data.data().statusRevision === 'process') {
                swal("Inspeccion en proceso", "", "warning", { timer: 2000 });
                return hashHistory.push('/assets')
            }
            console.log(data.data())
            this.setState({
                revision: data.data()
            })
            this.selectBuilding()
        })
    }

    selectBuilding() {
        this.state.revision.checkList.buildings.map((building, index) => {
            if (building.crumb === this.props.match.params.crumbBuilding) {

                building.levels.map(level => {
                    level.numberAssets = 0

                    level.areas.map(area => {
                        level.numberAssets = level.numberAssets + area.assets.length
                    })
                })


                this.setState({
                    position: index,
                    building: building
                })
            }
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
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb letra">
                        <li className="breadcrumb-item"><Link to={'/viewBuildings/' + this.props.match.params.id}>{this.state.building.type + ' ' + this.state.building.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">NIVELES</li>
                    </ol>
                </nav>
                <div className="container">
                    <div className="card">
                        <div className="card-header text-center ">
                            <h4>TABLA DE NIVELES</h4>
                        </div>
                        <div className="card-body">
                            {this.state.position !== '' &&
                                <div>
                                    {this.state.revision.checkList.buildings[this.state.position].levels.length > 0 &&
                                        <table className="table table-bordered table-responsive ">
                                            <thead>
                                                <tr className="bg-primary" >
                                                    <th>#</th>
                                                    <th>FOTO</th>
                                                    <th>NOMBRE</th>
                                                    <th>ÁREAS</th>
                                                    <th>ACTIVOS INMUEBLES</th>
                                                    <th>ACTIVOS MUEBLES</th>
                                                    <th>VEL NIVEL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.revision.checkList.buildings[this.state.position].levels.map((level, index) => {
                                                    return (
                                                        <tr key={index} >
                                                            <th scope="row">{index + 1}</th>
                                                            <td><img style={{ width: '80px' }} src={level.conditions.photosUrl[0]} alt="" /></td>
                                                            <td>{level.name}</td>
                                                            <td><Link to={'/viewAreas/' + this.props.match.params.id + '/' + this.props.match.params.crumbBuilding + '/' + level.crumb} className="btn btn-outline-dark btn-block " > {level.areas.length}</Link></td>
                                                            <td><Link to={'/viewRealAssets/' + this.props.match.params.id + '/' + this.props.match.params.crumbBuilding + '/' + level.crumb} className="btn btn-outline-dark btn-block " >{level.RealEstateAssets.length}</Link></td>
                                                            <td><Link to={'/viewAssets/' + this.props.match.params.id + '/' + this.props.match.params.crumbBuilding + '/' + level.crumb + '/0'} className="btn btn-outline-dark btn-block" > {level.numberAssets}</Link></td>
                                                            <td><button type="button" className="btn btn-outline-dark btn-block" data-toggle="modal" data-target={'#modalBoulding' + index}><i className="fa fa-eye" aria-hidden="true"></i></button></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            }
                            {this.state.position !== '' &&
                                <div>
                                    {this.state.revision.checkList.buildings[this.state.position].levels.map((level, index) => {
                                        return (
                                            <div key={index} className="modal fade" id={'modalBoulding' + index} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-lg modal-lg-view ">
                                                    <div className="modal-content p-3 ">
                                                        <h3 className="text-center" >Nivel {level.name}</h3>
                                                        <hr />
                                                        <DataViewCheck
                                                            className="col-12"
                                                            dataBasic={level}
                                                            refresh={this.refresh}
                                                            label='nivel'
                                                            type='nivel'
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
                                <h3 className="textCenter" >No hay niveles</h3>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewLevels