import React, { Component } from 'react'
import DataBasic from '../components/dataBasic'
import Activities from '../components/activities'
import { InputText, confirmRequest } from '../../../../swaIInputs'
import { uploadFiles } from '../../../../uploadFiles'
export default class LegalProcedures extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            upload: true,
            percentege: 0
        }
        this.handleNewActivity = this.handleNewActivity.bind(this)
        this.handleNewChildrenActivity = this.handleNewChildrenActivity.bind(this)
        this.handleUploadDocumentActivity = this.handleUploadDocumentActivity.bind(this)
        this.assignPositions = this.assignPositions.bind(this)
        this.handleUploadDocumentActivityInterpretation = this.handleUploadDocumentActivityInterpretation.bind(this)
        this.handleDeleteActivity = this.handleDeleteActivity.bind(this)
        this.handleDeleteChildrenActivity = this.handleDeleteChildrenActivity.bind(this)
    }

    handleNewActivity() {
        let newActivity = {
            activity: '',
            user: '',
            description: '',
            status: '',
            price: '',
            dateStart: new Date(),
            dateEnd: new Date(),
            documentation: {
                label: "DOCUMENTACIÓN",
                children: []
            }
        }

        this.props.asset.states['legal'].legalProcedures['activities'].push(newActivity)
        this.props.refresh()
    }

    handleNewChildrenActivity(index) {
        InputText('INGRESE EL NOMBRE: ', (value) => {
            if (value) {
                let newChildren = {
                    label: value,
                    url: '',
                    urlInterpretation: '',
                    notes: '',
                    dateOfTheDocument: new Date()
                }
                this.props.asset.states['legal'].legalProcedures['activities'][index].documentation.children.push(newChildren)
                this.props.refresh()
            }
        })
    }

    assignPositions(father, children) {
        this.setState({ father, children })
    }

    handleUploadDocumentActivity(e) {
        this.setState({ upload: false })
        uploadFiles(e, (file) => {
            this.props.asset.states['legal'].legalProcedures['activities'][this.state.father]['documentation'].children[this.state.children].url = ''
            this.props.refresh()
            this.props.asset.states['legal'].legalProcedures['activities'][this.state.father]['documentation'].children[this.state.children].url = file[0]
            this.props.refresh()
            this.setState({ upload: true })
        }, (percentege) => {
            this.setState({ percentege: Math.round(percentege) })
        }, 'documentsState')
    }

    handleUploadDocumentActivityInterpretation(e) {
        this.setState({ upload: false })
        uploadFiles(e, (file) => {
            this.props.asset.states['legal'].legalProcedures['activities'][this.state.father]['documentation'].children[this.state.children].urlInterpretation = ''
            this.props.refresh()
            this.props.asset.states['legal'].legalProcedures['activities'][this.state.father]['documentation'].children[this.state.children].urlInterpretation = file[0]
            this.props.refresh()
            this.setState({ upload: true })
        }, (percentege) => {
            this.setState({ percentege: Math.round(percentege) })
        }, 'documentsState')
    }

    handleDeleteChildrenActivity(father, children) {
        confirmRequest('¿ESTAS SEGURO?', 'AL CONFIRMAR NO SE PODRÁN RECUPERAR LOS ARCHIVOS', (value) => {
            if (value) {
                this.props.asset.states['legal'].legalProcedures['activities'][father]['documentation'].children.splice(children, 1)
                this.props.refresh()
            }
        })
    }

    handleDeleteActivity(index) {
        console.log('este quiere eliminar: ', index)
        confirmRequest('¿ESTAS SEGURO DE ELIMINAR ESTA ACTIVIDAD?', 'AL CONFIRMAR NO SE PODRA RECUPERAR', (value) => {
            if (value) {
                this.props.asset.states['legal'].legalProcedures['activities'].splice(index, 1)
                this.props.refresh()
            }
        })
    }

    render() {
        return (
            <div>
                <h3 className="divider-profile">Trámites</h3>

                <DataBasic asset={this.props.asset} />

                <h3 className="divider-profile">Actividades</h3>

                <Activities
                    activities={this.props.asset.states['legal'].legalProcedures['activities']}
                    handleNewActivity={this.handleNewActivity}
                    refresh={this.props.refresh}
                    handleNewChildrenActivity={this.handleNewChildrenActivity}
                    assignPositions={this.assignPositions}
                    handleUploadDocumentActivity={this.handleUploadDocumentActivity}
                    handleUploadDocumentActivityInterpretation={this.handleUploadDocumentActivityInterpretation}
                    handleDeleteChildrenActivity={this.handleDeleteChildrenActivity}
                    handleDeleteActivity={this.handleDeleteActivity}
                    state={this.state}
                />

                <div className="high-btns">
                    <button
                        onClick={() => { this.props.procedures[1].active = false, this.props.refresh() }}
                        type="button"
                        className="btn-cancel">
                        <i className="fas fa-ban"></i> Cancelar</button>

                    <button
                        onClick={() => this.props.handleUpdateAsset(1)}
                        type="button"
                        className="btn-next"><i className="far fa-save"></i> GUARDAR</button>
                </div>
            </div>
        )
    }
}
