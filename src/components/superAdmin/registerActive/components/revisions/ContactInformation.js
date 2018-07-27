import React, { Component } from 'react'
import { uploadFiles, deleteFiles } from '../../../../../uploadFiles'
import { TextMask, InputAdapter } from 'react-text-mask-hoc';


class ContactInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refresh: '',
            percentege: 0,
            upload: false,
            validEmail: false
        }

        this.deleteImage = this.deleteImage.bind(this)
        this.fileChangeEvent = this.fileChangeEvent.bind(this)
        this.refresh = this.refresh.bind(this)
    }


    fileChangeEvent(e) {

        uploadFiles(e, (data) => {

            data.map(image => {
                this.props.data.photoUrl = image
            })

            console.log(this.props.data.photoUrl);

            this.setState({
                refresh: '',
                upload: false
            })

        }, (porcentaje) => {

            this.setState({ upload: true })

            this.setState({ percentege: Math.round(porcentaje) })

        }, 'documentsState')

    }

    deleteImage() {

        deleteFiles(this.props.data.photoUrl, (data) => {
            if (data) {
                delete this.props.data.photoUrl
                this.setState({
                    refresh: ''
                })
            } else {
                console.log('error al eliminar');
            }
        })
    }

    refresh() {
        this.setState({
            refresh: ''
        })

    }

    render() {
        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Nombres*</span>
                            <input type="text" className="form-control" aria-label="proximaRevision" value={this.props.data.name} onChange={(e) => { this.props.data.name = e.target.value.toUpperCase(), this.props.refresh(this.props.i) }} />
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Apellidos*</span>
                            <input type="text" className="form-control" aria-label="proximaRevision" value={this.props.data.surnames} onChange={(e) => { this.props.data.surnames = e.target.value.toUpperCase(), this.props.refresh(this.props.i) }} />
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Puesto*</span>
                            <input type="text" className="form-control" aria-label="proximaRevision" value={this.props.data.job} onChange={(e) => { this.props.data.job = e.target.value.toUpperCase(), this.props.refresh(this.props.i) }} />
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Correo electrónico*</span>
                            <input type="email" className="form-control" aria-label="proximaRevision" value={this.props.data.email} onChange={(e) => {
                                var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                                if (reg.test(e.target.value) && regOficial.test(e.target.value)) {
                                    this.setState({ validEmail: false })
                                } else {
                                    this.setState({ validEmail: true })
                                }
                                this.props.data.email = e.target.value, this.props.refresh(this.props.i)
                            }} />

                        </div>
                        {this.state.validEmail && <small id="emailHelp" className="text-danger font-weight-bold ">Correo inválido*</small>}
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Teléfono de Oficina</span>
                            <TextMask
                                mask={['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                Component={InputAdapter}
                                placeholder="10 digitos"
                                className="form-control"
                                value={this.props.data.officePhone}
                                onChange={(e) => { this.props.data.officePhone = e.target.value, this.props.refresh(this.props.i) }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Celular*</span>
                            <TextMask
                                mask={['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                Component={InputAdapter}
                                placeholder="10 digitos"
                                className="form-control"
                                value={this.props.data.cellPhone}
                                onChange={(e) => { this.props.data.cellPhone = e.target.value, this.props.refresh(this.props.i) }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Foto</span>
                            <input type="file" capture="camera" accept="image/*" id={this.props.id} className="display-none" onChange={(e) => this.fileChangeEvent(e)} />
                            <label htmlFor={this.props.id} className="btn btn-outline-dark" ><i className="fas fa-camera-retro point" aria-hidden="true"></i></label>
                            {this.props.data.photoUrl &&
                                <div>
                                    <a href={this.props.data.photoUrl} data-fancybox={this.props.id} >
                                        <button className="btn btn-outline-dark ml-2" type="button" ><i className="fa fa-eye" aria-hidden="true" ></i></button>
                                    </a>
                                    <button className="btn btn-outline-dark ml-2" type="button" onClick={() => this.deleteImage()} ><i className="fas fa-trash-alt"> </i></button>
                                </div>
                            }
                        </div>
                    </div>
                    {this.state.upload &&
                        <div className="progress mb-3 mt-3 col-12">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>
                                {this.state.percentege}%
                                </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ContactInformation