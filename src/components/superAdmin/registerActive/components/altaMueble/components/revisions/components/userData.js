import React, { Component } from 'react';
import { uploadFiles } from '../../../../../../../../uploadFiles'
import { confirmRequest } from '../../../../../../../../swaIInputs'

class userData extends Component {
    constructor(props){
        super(props)

        this.state ={
            refresh: '',
            percentage: 0,
            upload: true            
        }
        this.refresh = this.refresh.bind(this)
        this.uploadFilesUser = this.uploadFilesUser.bind(this)
        this.handleDeleteImg = this.handleDeleteImg.bind(this)
    }

    refresh(){
        this.setState({
            refresh : ''
        })
    }

    uploadFilesUser(e) {
        if (e.target.files.length > 0) {          
            this.setState({ upload: false })  
            uploadFiles(e, (data) => {
                this.props.data.user.urlPhoto = ''
                this.props.data.user.urlPhoto = data[0]
                this.setState({ upload: true })
                this.props.refresh()
            }, (percentage) => {
                this.setState({ percentage: Math.round(percentage) })              
            }, 'imagesRevisionsFurniture')
        }
    }

    handleDeleteImg(){
        confirmRequest('¿Estas seguro?', 'Se eliminara la foto', (value) => {
            if (value) {
                this.props.data.user.urlPhoto = ''
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
                                type="text"
                                className="form-control"
                                value={this.props.data.user.name} onChange={(e) => {
                                    this.props.data.user.name = e.target.value.toUpperCase(), this.refresh()
                                }}
                            />
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Apellido(s)</div>
                            <input
                                type="text"
                                className="form-control"
                                value={this.props.data.user.surname} onChange={(e) => {
                                    this.props.data.user.surname = e.target.value.toUpperCase(), this.refresh()
                                }}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Puesto</div>
                            <input
                                type="text"
                                className="form-control"
                                value={this.props.data.user.jobPosition} onChange={(e) => {
                                    this.props.data.user.jobPosition = e.target.value.toUpperCase(), this.refresh()
                                }}
                            />
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Correo Electrónico</div>
                            <input
                                type="text"
                                className="form-control"
                                value={this.props.data.user.email} onChange={(e) => {
                                    this.props.data.user.email = e.target.value, this.refresh()
                                }}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Teléfono Oficina</div>
                            <input
                                type="text"
                                className="form-control"
                                value={this.props.data.user.officePhone} onChange={(e) => {
                                    this.props.data.user.officePhone = e.target.value.toUpperCase(), this.refresh()
                                }}
                            />
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6 col-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Celular</div>
                            <input
                                type="text"
                                className="form-control"
                                value={this.props.data.user.cellPhone} onChange={(e) => {
                                    this.props.data.user.cellPhone = e.target.value.toUpperCase(), this.refresh()
                                }}
                            />
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row" >
                    <div className="col col-md-12">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon" style={{ cursor: 'pointer', height: '35px' }} >Foto</div>
                            <label
                                style={{ cursor: 'pointer', height: '33px' }} htmlFor="dataUser" className="mt-1 ml-1 mr-1 btn btn-primary">
                                <i className="fa fa-upload" aria-hidden="true"></i>
                            </label>
                            <input id="dataUser" accept="image/*" capture="camera" style={{ display: 'none' }} type="file" className="form-control" onChange={this.uploadFilesUser} name="urlPhoto" />
                            {
                                this.props.data.user.urlPhoto !== "" &&
                                <div>
                                    <a style={{ height: '33px' }} className="btn btn-secondary mr-1 mt-1" data-fancybox={'fancyUserData'} data-src={this.props.data.user['urlPhoto']} href="javascript:;">
                                        <i className="fa fa-eye fa-1x" />
                                    </a>
                                </div>
                            }
                            {
                                this.props.data.user.urlPhoto !== "" &&
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

export default userData;