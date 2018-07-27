import React, { Component } from 'react'
import $ from 'jquery'
import DataBasic from '../components/dataBasic'
import Document from '../components/document'
import { InputText, confirmRequest } from '../../../../swaIInputs'
import { uploadFiles } from '../../../../uploadFiles'
export default class Documents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            indexFather: 0,
            indexChildren: 0,
            upload: true,
            percentege: 0
        }

        this.handleNewFhater = this.handleNewFhater.bind(this)
        this.handleDeleteFather = this.handleDeleteFather.bind(this)
        this.handleNewChildren = this.handleNewChildren.bind(this)
        this.assignPositions = this.assignPositions.bind(this)
        this.handleUploadDocumentLegal = this.handleUploadDocumentLegal.bind(this)
        this.handleUploadDocumentInterpretation = this.handleUploadDocumentInterpretation.bind(this)
        this.handleDeleteChildren = this.handleDeleteChildren.bind(this)
        this.childMenu = this.childMenu.bind(this)
    }

    handleNewFhater() {
        InputText('INGRESE EL NOMBRE DEL DOCUMENTO: ', (value) => {
            if (value) {
                let newFather = {
                    mainLabel: value,
                    children: []
                }
                this.props.asset.states['administration'].documentacionAdministrativa.push(newFather)
                this.props.refresh()
            }
        })
    }

    handleDeleteFather(indexFather) {
        confirmRequest('¿ESTAS SEGURO?', 'AL CONFIRMAR NO SE PODRÁN RECUPERAR LOS ARCHIVOS', (value) => {
            if (value) {
                this.props.asset.states['administration'].documentacionAdministrativa.splice(indexFather, 1)
                this.props.refresh()
            }
        })
    }

    handleNewChildren(index) {
        InputText('INGRESE EL NOMBRE: ', (value) => {
            if (value) {
                let newChildren = {
                    label: value,
                    url: '',
                    urlInterpretation: '',
                    notes: '',
                    dateOfTheDocument: new Date()
                }
                this.props.asset.states['administration'].documentacionAdministrativa[index].children.push(newChildren)
                this.props.refresh()
            }
        })
    }
    handleDeleteChildren(indexFather, indexChildren) {
        confirmRequest('¿ESTAS SEGURO DE ELIMINAR ESTE DOCUMENTO?', 'AL CONFIRMAR NO SE PODRA RECUPERAR EL ARCHIVO!', (value) => {
            if (value) {
                this.props.asset.states['administration'].documentacionAdministrativa[indexFather].children.splice(indexChildren, 1)
                this.props.refresh()
            }
        })
    }

    assignPositions(indexFather, indexChildren) {
        this.setState({ indexFather: indexFather, indexChildren: indexChildren })
    }

    handleUploadDocumentLegal(e) {
        this.setState({ upload: false })
        uploadFiles(e, (file) => {
            this.props.asset.states['administration'].documentacionAdministrativa[this.state.indexFather].children[this.state.indexChildren].url = ''
            this.props.refresh()
            this.props.asset.states['administration'].documentacionAdministrativa[this.state.indexFather].children[this.state.indexChildren].url = file[0]
            this.props.refresh()
            this.setState({ upload: true })
        }, (percentege) => {
            this.setState({ percentege: Math.round(percentege) })
        }, 'documentsState')
    }

    handleUploadDocumentInterpretation(e) {
        this.setState({ upload: false })
        uploadFiles(e, (file) => {
            this.props.asset.states['administration'].documentacionAdministrativa[this.state.indexFather].children[this.state.indexChildren].urlInterpretation = ''
            this.props.refresh()
            this.props.asset.states['administration'].documentacionAdministrativa[this.state.indexFather].children[this.state.indexChildren].urlInterpretation = file[0]
            this.props.refresh()
            this.setState({ upload: true })
        }, (percentege) => {
            this.setState({ percentege: Math.round(percentege) })
        }, 'documentsState')
    }

    childMenu(i) {
        $('.childBtns').fadeOut(100)
        $('.childBtns' + i).fadeIn(150)

        $('body').click(() => {
            $('.childBtns').fadeOut('fast');
          })
    }

    render() {
        let { upload } = this.state
        return (
            <div className="legalDocSec">
                <h3 className="divider-profile">Documentación</h3>
                {/* <button type="button" className="btn btn-primary btn-lg">DOCUMENTAL</button> */}
                {/* <div className="alert alert-success text-center" role="alert">
                    <strong>DATOS DEL INMUEBLE</strong>
                </div> */}
                <DataBasic asset={this.props.asset} />
                <hr />
                <Document
                    asset={this.props.asset}
                    handleDeleteFather={this.handleDeleteFather}
                    handleNewChildren={this.handleNewChildren}
                    handleDeleteChildren={this.handleDeleteChildren}
                    assignPositions={this.assignPositions}
                    handleUploadDocumentLegal={this.handleUploadDocumentLegal}
                    handleUploadDocumentInterpretation={this.handleUploadDocumentInterpretation}
                    refresh={this.props.refresh}
                    childMenu={this.childMenu}
                />
                <button onClick={() => this.handleNewFhater()} className="addDocLegal" type="button" >Agregar documento +</button>

                {
                    upload === false &&
                    <div className="progress mb-3">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>
                            {this.state.percentege}%
                     </div>
                    </div>
                }
                <div className="high-btns">
                    <button
                        onClick={() => { this.props.procedures[0].active = false, this.props.refresh() }}
                        type="button"
                        className="btn-cancel">
                        <i className="fas fa-ban"></i> Cancelar</button>

                    <button
                        onClick={() => this.props.handleUpdateAsset(0)}
                        type="button"
                        className="btn-next"><i className="far fa-save"></i> Guardar</button>
                </div>
            </div>
        )
    }
}
