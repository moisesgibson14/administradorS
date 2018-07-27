import React, { Component } from 'react';
import {uploadFiles} from '../../../../../../../../uploadFiles'
import { confirmRequest } from '../../../../../../../../swaIInputs'


class ResponsableData extends Component {
    constructor(props){
        super(props)

        this.state = {
            upload: true,
            percentage: 0,
            refresh: ''
        }
        this.refresh = this.refresh.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDeleteImg = this.handleDeleteImg.bind(this)
    }
    refresh() {
        this.setState({
            refresh: ''
        })

    }

    handleChange(e) {
        if (e.target.files.length > 0) {  
            this.setState({ upload: false })        
            uploadFiles(e, (data) => {
                this.setState({ upload: false })
                this.props.data.responsablePhysic.urlPhoto = data[0]
                this.setState({ upload: true })
                this.props.refresh()
            }, (percentage) => {
                this.setState({ percentage: Math.round(percentage) })
            },'imagesRevisionsFurniture')
        }
    }
    handleDeleteImg() {
        confirmRequest('¿Estas seguro?', 'Se eliminara la foto', (value) => {
            if (value) {
                this.props.data.responsablePhysic.urlPhoto = ''
                this.refresh()
            }
        })
    }  

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Nombre</div>
                            <input
                                value={this.props.data.responsablePhysic.name} onChange={(e) => { this.props.data.responsablePhysic.name = e.target.value.toUpperCase(), this.refresh() }}
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Apellido(s)</div>
                            <input
                                type="text"
                                className="form-control"
                                value={this.props.data.responsablePhysic.surname} onChange={(e) =>{
                                    this.props.data.responsablePhysic.surname = e.target.value.toUpperCase(), this.refresh()
                                }}
                            />
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Puesto</div>
                            <input
                                type="text"
                                className="form-control"
                                value={this.props.data.responsablePhysic.jobPosition} onChange={(e) => {
                                    this.props.data.responsablePhysic.jobPosition = e.target.value.toUpperCase(), this.refresh()
                                }}
                            />
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Correo Electrónico</div>
                            <input
                                type="email"
                                className="form-control"
                                value={this.props.data.responsablePhysic.email} onChange={(e) => {
                                    this.props.data.responsablePhysic.email = e.target.value, this.refresh()
                                }}
                            />
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Teléfono Oficina</div>
                            <input
                                type="number"
                                className="form-control"
                                value={this.props.data.responsablePhysic.officePhone} onChange={(e) => {
                                    this.props.data.responsablePhysic.officePhone = e.target.value.toUpperCase(), this.refresh()
                                }}
                            />
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Celular</div>
                            <input
                                type="number"
                                className="form-control"
                                value={this.props.data.responsablePhysic.cellPhone} onChange={(e) => {
                                    this.props.data.responsablePhysic.cellPhone = e.target.value.toUpperCase(), this.refresh()
                                }}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">                
                    <div className="col col-xs-12 col-md-12" >
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon" style={{ cursor: 'pointer', height: '35px' }} >Fotografia</div>
                            <label
                                style={{ cursor: 'pointer', height: '33px' }} htmlFor="responsible" className="mt-1 ml-1 mr-1 btn btn-primary">
                                <i className="fa fa-upload" aria-hidden="true"></i>
                            </label>
                            <input id="responsible" accept="image/*" capture="camera" style={{ display: 'none' }} type="file" className="form-control" onChange={this.handleChange} name="urlPhoto" />
                            {
                                this.props.data.responsablePhysic.urlPhoto !== "" &&
                                <div>
                                    <a style={{ height: '33px' }} className="btn btn-secondary mr-1 mt-1" data-fancybox data-src={this.props.data.responsablePhysic['urlPhoto']} href="javascript:;">
                                        <i className="fa fa-eye fa-1x" />
                                    </a>

                                </div>
                            }
                            {
                                this.props.data.responsablePhysic.urlPhoto !== "" &&
                                <div>    
                                    <a style={{ height: '33px' }} onClick={() => this.handleDeleteImg()} className="btn btn-danger mr-1 mt-1" href="javascript:;" >
                                        <i className="fa fa-minus-circle"></i>
                                    </a>
                                </div>
                            }
                        </div>
                        {
                            this.state.upload === false &&
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                            </div>
                        }
                    </div>
                </div>               
            </div>
        );
    }
}

export default ResponsableData;