import React, { Component } from 'react'
import { InputGroup, InputGroupAddon } from 'reactstrap'
import dateFormat from 'dateformat'
import {firestore} from 'firebase'
export default class DataBasic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sizeOwners: 0
        }
        this.generateId = this.generateId.bind(this)
    }

    componentDidMount() {
        firestore().collection('usersOwner').get().then(users => {
            this.setState({
                sizeOwners: users.size
            })
        }).catch(err => console.log(err))
    }
    generateId() {
        var date = Date.now()
        var idOwner = ''
        var ltr = ['[àáâãä]', '[èéêë]', '[ìíîï]', '[òóôõö]', '[ùúûü]', 'ñ', 'ç', '[ýÿ]', ' ', '[\[(){}*+?^$-_,:;"\'&@.<>|]'];
        var rpl = ['a', 'e', 'i', 'o', 'u', 'n', 'c', 'y', '', ''];
        if (this.props.user['taxRegime'] === 'moral' || this.props.user['taxRegime'] === 'gobierno' ) {
            var tradeName = this.props.user['tradeName'].replace(/\s/g, '')
            if (tradeName !== '') {
                for (var i = 0, c = ltr.length, r = String(tradeName.toLowerCase()); i < c; i++) {
                    var rg = new RegExp(ltr[i], 'g');
                    r = r.replace(rg, rpl[i]);
                };
                idOwner += r.substring(0, 6).replace(/[^a-zA-Z 0-9.]+/g, ' ').trim() + dateFormat(date, "mm") + dateFormat(date, "yy") + this.state.sizeOwners
                this.props.user['idOwner'] = idOwner.toUpperCase()
            }
        } else {
            var taxRegime = this.props.user['legalRepresentative']
            if (taxRegime !== '') {
                var resultado = taxRegime.replace(/[A-Za-z]+/g, function (match) { return (match.trim()[0]); });
                idOwner += resultado.replace(/\s/g, '').replace(/[^a-zA-Z 0-9.]+/g, ' ').trim() + dateFormat(date, "mm") + dateFormat(date, "yy") + this.state.sizeOwners
                this.props.user['idOwner'] = idOwner.toUpperCase()
            }
        }
    }

    render() {
        return (
            <div>
                <div className="row" >
                    <div className="col col-md-6" >
                        <InputGroup className="mb-1" >
                            <InputGroupAddon>Régimen fiscal <span className="text-danger"> *</span> </InputGroupAddon>
                            <select className="form-control"
                                value={this.props.user['taxRegime']}
                                onChange={(e) => { this.props.user['taxRegime'] = e.target.value, this.props.refresh() }}
                            >
                                <option value="null">Selecionar</option>
                                <option value="fisica">Física</option>
                                <option value="fisicaAE">Física con actividad empresarial</option>
                                <option value="gobierno">Gobierno</option>
                                <option value="moral">Moral</option>
                            </select>
                        </InputGroup>
                    </div>
                    <div className="col col-md-6" >
                        <InputGroup className="mb-1" >
                            <InputGroupAddon>RFC <span className="text-danger"> *</span></InputGroupAddon>
                            <input
                                disabled={(this.props.user['taxRegime'] === '' || this.props.user['taxRegime'] === 'null' ) ? true : false}
                                type="text"
                                className="form-control disabled"
                                maxLength={(this.props.user['taxRegime'] === 'moral') ? "12" : "13"}
                                value={this.props.user['RFC']}
                                onChange={(e) => { this.props.user['RFC'] = e.target.value.toUpperCase(), this.props.refresh() }}
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="row" >
                    <div className="col col-md-6" >
                        <InputGroup className="mb-1" >
                            <InputGroupAddon>ID <span className="text-danger"> *</span></InputGroupAddon>
                            <input
                                disabled
                                type="text"
                                className="form-control"
                                maxLength="10"
                                value={this.props.user['idOwner']}
                            />
                        </InputGroup>
                    </div>
                    <div className="col col-md-6" >
                        <InputGroup className="mb-1">
                            <InputGroupAddon>Razón Social {(this.props.user['taxRegime'] === 'gobierno' || this.props.user['taxRegime'] === 'moral') ? <span className="text-danger"> *</span> : ''} </InputGroupAddon>
                            <input
                                disabled={(this.props.user['taxRegime'] === '' || this.props.user['taxRegime'] === 'null') ? true : false}
                                type="text"
                                className="form-control"
                                value={(this.props.user['taxRegime'] === 'fisica' || this.props.user['taxRegime'] === 'fisicaAE') ? (this.props.user['socialReason'] = '') : this.props.user['socialReason']}
                                disabled={(this.props.user['taxRegime'] === 'fisica' || this.props.user['taxRegime'] === 'fisicaAE' || this.props.user['taxRegime'] === '' || this.props.user['taxRegime'] === 'null') ? true : false}
                                onChange={(e) => { this.props.user['socialReason'] = e.target.value.toUpperCase(), this.props.refresh() }}
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-6" >
                        <InputGroup>
                            <InputGroupAddon>Nombre Comercial {(this.props.user['taxRegime'] === 'gobierno' || this.props.user['taxRegime'] === 'moral') ? <span className="text-danger"> *</span> : ''}</InputGroupAddon>
                            <input
                                type="text"
                                className="form-control"
                                value={(this.props.user['taxRegime'] === 'fisica' || this.props.user['taxRegime'] === 'fisicaAE') ? (this.props.user['tradeName'] = '') : this.props.user['tradeName']}
                                disabled={(this.props.user['taxRegime'] === 'fisica' || this.props.user['taxRegime'] === 'fisicaAE' || this.props.user['taxRegime'] === '' || this.props.user['taxRegime'] === 'null') ? true : false}
                                onChange={(e) => { this.props.user['tradeName'] = e.target.value.toUpperCase(),
                                                   this.props.refresh(),
                                                   this.generateId(),
                                                   (this.props.user['tradeName'] === '') ? (this.props.user['idOwner'] = '') : ''
                                                 }}
                            />
                        </InputGroup>
                    </div>
                    <div className="col col-md-6" >
                        <InputGroup>
                            <InputGroupAddon>Representante Legal <span className="text-danger"> *</span></InputGroupAddon>
                            <input
                                disabled={(this.props.user['taxRegime'] === '' || this.props.user['taxRegime'] === 'null') ? true : false}
                                type="text"
                                className="form-control"
                                placeholder="Nombre(s) Apellido(s)"
                                value={this.props.user['legalRepresentative']}
                                onChange={(e) => {
                                    this.props.user['legalRepresentative'] = e.target.value.toUpperCase(),
                                                   this.generateId(),
                                                   this.props.refresh()
                                                }}
                            />
                        </InputGroup>
                    </div>
                </div>

            </div>
        )
    }
}
