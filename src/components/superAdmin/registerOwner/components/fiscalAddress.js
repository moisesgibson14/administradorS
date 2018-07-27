import React, { Component } from 'react'
import postalCode from '../../registerActive/codigoPostal'
import { uploadFiles } from '../../../../uploadFiles'
import { confirmRequest } from '../../../../swaIInputs'
import swal from 'sweetalert'
import $ from 'jquery'
import states from '../../../../states'
import { TextMask, InputAdapter } from 'react-text-mask-hoc'

export default class FiscalAddress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            colonies: [],
            upload: true,
            percentage: 0,
            states: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDeleteDocument = this.handleDeleteDocument.bind(this)
    }

    handleChange(e) {
        if (e.target.files.length > 0) {
            this.setState({ upload: false })
            uploadFiles(e, (link) => {
                this.props.user['taxDomicile']['taxBill'] = ''
                this.setState({ upload: true })
                this.props.user['taxDomicile']['taxBill'] = link[0]
                this.setState({ upload: true })
                this.props.refresh()
            }, (percentage) => {
                this.setState({ percentage: Math.round(percentage) })
            }, 'documentationOwner/'
            )
        }
    }

    handleDeleteDocument() {
        confirmRequest('¿Estas seguro?', 'Se eliminara el documento permanentemente', (ok) => {
            if (ok) {
                this.props.user.taxDomicile['taxBill'] = ''
                this.props.refresh()
            }
        })
    }

    componentDidMount() {
        states((states) => {
            this.setState({ states: states })
        })
        this.props.user['taxDomicile']['country'] = 'MÉXICO'
    }

    render() {
        let { upload, states } = this.state
        let user = this.props.user
        if (!states) return <h5>Cargando...</h5>
        return (
            <div>
                <div className="row">
                    <div className="col col-xs-12 col-md-6">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">C.P. <span className="text-danger"> *</span></div>
                            <TextMask
                                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                Component={InputAdapter}
                                className="form-control"
                                value={user['taxDomicile']['postalCode']}
                                placeholder="Código Postal"
                                onChange={(e) => { user['taxDomicile']['postalCode'] = e.target.value, this.props.refresh() }}
                            />
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Calle</div>
                            <input
                                value={this.props.user['taxDomicile']['street']}
                                onChange={(e) => { user['taxDomicile']['street'] = e.target.value.toUpperCase(), this.props.refresh() }}
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-xs-12 col-md-3" >
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">#Ext</div>
                            <input
                                value={this.props.user['taxDomicile']['outdoorNumber']}
                                onChange={(e) => { user['taxDomicile']['outdoorNumber'] = (e.target.value < 0) ? 0 : e.target.value , this.props.refresh() }}
                                type="number" className="form-control" id="inlineFormInputGroup" />
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-3" >
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">#Int</div>
                            <input
                                value={this.props.user['taxDomicile']['interiorNumber']}
                                onChange={(e) => { user['taxDomicile']['interiorNumber'] = (e.target.value < 0) ? 0 : e.target.value, this.props.refresh() }}
                                type="number" className="form-control" id="inlineFormInputGroup"
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6" >
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Colonia</div>
                            <input type="text"
                                value={this.props.user['taxDomicile']['colony']}
                                className="form-control"
                                onChange={(e) => { user['taxDomicile']['colony'] = e.target.value.toUpperCase(), this.props.refresh() }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col col-xs-12 col-md-6">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Municipio/Delegación <span className="text-danger"> *</span></div>
                            <input value={user['taxDomicile']['municipality']}
                                onChange={(e) => { user['taxDomicile']['municipality'] = e.target.value.toUpperCase(), this.props.refresh() }}
                                type="text" className="form-control"
                                id="inlineFormInputGroup"
                            />
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Tipo de asentamiento</div>
                            <input value={user['taxDomicile']['typeOfSettlement']}
                                onChange={(e) => { user['taxDomicile']['typeOfSettlement'] = e.target.value.toUpperCase(), this.props.refresh() }}
                                type="text" className="form-control"
                                id="inlineFormInputGroup"
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col col-xs-12 col-md-4">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">Estado <span className="text-danger"> *</span></div>
                            <select
                                className="form-control"
                                value={user['taxDomicile']['state']}
                                onChange={(e) => { user['taxDomicile']['state'] = e.target.value, this.props.refresh() }}
                            >
                                <option value="null">SELECCIONAR ESTADO</option>
                                {
                                    states.map((state, indexState) => (
                                        <option key={indexState} value={state.Abreviacion}>{state.Estado}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-3">
                        <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon">País</div>
                            <input disabled value={user['taxDomicile']['country']} type="text" className="form-control" id="inlineFormInputGroup" />
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-5" >
                        <div className="col-auto">
                            <div className="input-group mb-2 mb-sm-0">
                                <div className="input-group-addon" style={{ cursor: 'pointer', height: '35px' }} >Cédula fiscal</div>
                                <label
                                    style={{ cursor: 'pointer', height: '33px' }} htmlFor="cedula" className="mt-1 ml-1 mr-1 btn btn-primary">
                                    <i className="fas fa-upload" aria-hidden="true"></i>
                                </label>
                                <input id="cedula" style={{ display: 'none' }} type="file" className="form-control" onChange={this.handleChange} name="taxBill" />
                                {
                                    user.taxDomicile['taxBill'] !== "" &&
                                    <div>
                                        <a style={{ height: '33px' }} className="btn btn-secondary mr-1 mt-1" data-fancybox data-type="iframe" data-src={this.props.user['taxDomicile']['taxBill']} href="javascript:;">
                                            <i className="fas fa-eye fa-1x" />
                                        </a>
                                        <button style={{ height: '33px' }} onClick={this.handleDeleteDocument} type="button" className="mt-1 btn btn-danger" >
                                            <i className="icon-close fa-1x" />
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            upload === false &&
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
