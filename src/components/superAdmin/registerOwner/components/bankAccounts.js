import React, { Component } from 'react'
import { uploadFiles } from '../../../../uploadFiles'
import { confirmRequest } from '../../../../swaIInputs'
import banks from '../banks'
import {InputGroup,InputGroupAddon} from 'reactstrap'
export default class BankAccounts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            indexFile: 0,
            upload: true,
            percentage: 0
        }

        this.hanldeUploadFileBank = this.hanldeUploadFileBank.bind(this)
        this.handleNewAccountBank = this.handleNewAccountBank.bind(this)
        this.hanldeDeleteAccountBank = this.hanldeDeleteAccountBank.bind(this)
    }

    hanldeUploadFileBank(e) {
        if(e.target.files.length > 0 ){
            this.setState({ upload: false })
            uploadFiles(e, (link) => {
                let index = this.state.indexFile
                this.props.user.bankAccounts[index].statusAccountURL = ''
                this.setState({ upload: true })
                this.props.user.bankAccounts[index].statusAccountURL = link[0]
                this.setState({ upload: true })
                this.props.refresh()
            }, (percentage) => {
                this.setState({ percentage: Math.round(percentage) })
            }, 'documentationOwner/'
            )
        }
    }

    handleNewAccountBank() {
        let newAccontBank = {
            nameBank: '',
            numberAccount: '',
            clabe: '',
            statusAccountURL: ''
        }
        this.props.user.bankAccounts = this.props.user.bankAccounts.concat(newAccontBank)
        this.props.refresh()
    }

    hanldeDeleteAccountBank(index) {
        confirmRequest('¿Eliminar cuenta?', 'Se eliminara permanentemente la cuenta', (ok) => {
            if(ok) {
                let accountsTMP = []
                this.props.user.bankAccounts.map((accountBank, key) => {
                    if (index !== key) {
                        accountsTMP = accountsTMP.concat(accountBank)
                    }
                })
                this.props.user.bankAccounts = accountsTMP
                this.props.refresh()
            }
        })
    }

    render() {
        let { upload } = this.state
        return (
            <div>
             {
                    this.props.user.bankAccounts.map((account, indexAccount) => (
                        <div key={indexAccount}>
                            <div className="alert alert-secondary text-center" role="alert">
                                <strong>{indexAccount + 1}. CUENTA BANCARIA </strong>
                                {
                                    indexAccount > 0 &&
                                    <button type="button" className="btn btn-danger float-right" onClick={() => this.hanldeDeleteAccountBank(indexAccount)} ><i className="fas fa-times-circle"></i></button> 
                                }
                            </div>
                            <div className="row">
                                <div className="col col-xs-12 col-md-6" >
                                    <InputGroup className="mb-3" >
                                        <InputGroupAddon>Banco</InputGroupAddon>
                                        <select className="form-control"
                                            value={account.nameBank}
                                            onChange={(e) => { account.nameBank = e.target.value, this.props.refresh() }} >
                                            <option value="null">Selecionar banco</option>
                                            {
                                                banks.map((bank, index) => {
                                                    return (
                                                        <option key={index} value={bank.name}>{bank.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </InputGroup>
                                </div>
                                <div className="col col-xs-12 col-md-6" >
                                    <InputGroup className="mb-3" >
                                        <InputGroupAddon>#Cuenta</InputGroupAddon>
                                        <input type="text"
                                            className="form-control"
                                            maxLength="10"
                                            value={account.numberAccount}
                                            onChange={(e) => { account.numberAccount = e.target.value, this.props.refresh() }}
                                        />
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-xs-12 col-md-6" >
                                    <InputGroup className="mb-3" >
                                        <InputGroupAddon>CLABE</InputGroupAddon>
                                        <input type="text"
                                            className="form-control"
                                            maxLength="18"
                                            value={account.clabe}
                                            onChange={(e) => { account.clabe = e.target.value, this.props.refresh() }}
                                        />
                                    </InputGroup>
                                </div>
                                <div className="col col-xs-12 col-md-6" >
                                    <InputGroup className="mb-3" >
                                        <InputGroupAddon>NÚMERO DE REFERENCIA</InputGroupAddon>
                                        <input type="text"
                                            className="form-control"
                                            maxLength="18"
                                            value={account.noReference}
                                            onChange={(e) => { account.noReference = e.target.value, this.props.refresh() }}
                                        />
                                    </InputGroup>
                                </div>
                                <div className="col col-xs-12 col-md-6" >
                                    <InputGroup className="mb-3" >
                                        <InputGroupAddon>Estado de cuenta (Caratula)</InputGroupAddon>
                                        <label htmlFor={`uploadAccount${indexAccount}`} style={{ cursor: 'pointer' }} className="btn btn-primary mt-1 mr-1" >
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        <input id={`uploadAccount${indexAccount}`} style={{ display: 'none' }} type="file" onChange={(e) => { this.hanldeUploadFileBank(e, indexAccount), this.setState({ indexFile: indexAccount }) }} />
                                        {
                                            account.statusAccountURL !== "" &&
                                            upload === true &&
                                            <div>
                                                <a className="btn btn-success ml-1 mt-1" data-fancybox data-type="iframe" data-src={account.statusAccountURL} href="javascript:;">
                                                    <i className="fas fa-eye"></i>
                                                </a>
                                                <button type="button" onClick={() => { account.statusAccountURL = '', this.props.refresh() }} className="btn btn-danger ml-1 mt-1"><i className="fas fa-minus-circle"></i></button>
                                            </div>

                                        }
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-xs-12 col-md-6 offset-6">
                                    {
                                        upload === false &&
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="row">
                    <div className="col col-md-1 offset-11">
                        <button onClick={this.handleNewAccountBank} type="button" className="btn btn-success mb-2" ><i className="fas fa-plus-circle"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}
