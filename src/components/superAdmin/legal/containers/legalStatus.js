import React, { Component } from 'react'
import DataBasic from '../components/dataBasic'
import { modelJudment } from '../modelNewJudment'
import Judgments from '../components/Judgments'
import states from '../../../../states'
import { uploadFiles } from '../../../../uploadFiles'
import { confirmRequest } from '../../../../swaIInputs'

export default class LegalStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            states: [],
            percentage: 0,
            upload: true,
            indexTaxBill: 0,
            indexFhater: 0,
            indexChildren: 0,
            uploadJudgment: true,
            percentageJudgment: 0
        }

        this.handleNewJudgment = this.handleNewJudgment.bind(this)
        this.handleUploadTaxBill = this.handleUploadTaxBill.bind(this)
        this.assignTaxBill = this.assignTaxBill.bind(this)
        this.handleNewContact = this.handleNewContact.bind(this)
        this.handleDeletedContact = this.handleDeletedContact.bind(this)
        this.assignTaxBillFhaterChildren = this.assignTaxBillFhaterChildren.bind(this)
        this.handleUploadTaxBillJudment = this.handleUploadTaxBillJudment.bind(this)
        this.handleNewContactJudgment = this.handleNewContactJudgment.bind(this)
        this.handleDeletedContactJudgment = this.handleDeletedContactJudgment.bind(this)
        this.handleNewNameDefendant = this.handleNewNameDefendant.bind(this)
        this.handleNewNameDefendantExt = this.handleNewNameDefendantExt.bind(this)
        this.handleDeleteJudment = this.handleDeleteJudment.bind(this)
        this.handleDeleteNameDefendantExt = this.handleDeleteNameDefendantExt.bind(this)
    }

    componentDidMount() {
        states((states) => {
            this.setState({ states: states })
        })
    }

    handleNewJudgment() {
        modelJudment((model) => {
            this.props.asset.states['legal'].legalStatus['judgments'].push(model)
            this.props.refresh()
        })
    }

    handleUploadTaxBill(e) {
        if (e.target.files.length > 0) {
            this.setState({ upload: false })
            uploadFiles(e, (link) => {
                this.setState({ upload: true })
                this.props.asset.states['legal'].legalStatus.judgments[this.state.indexTaxBill].applicantName.taxDomicile.taxBill = ''
                this.props.refresh()
                this.props.asset.states['legal'].legalStatus.judgments[this.state.indexTaxBill].applicantName.taxDomicile.taxBill = link[0]
                this.props.refresh()
            }, (percentage) => {
                this.setState({ percentage: Math.round(percentage) })
            }, 'legal/')
        }
    }

    assignTaxBill(index) {
        this.setState({ indexTaxBill: index })
    }

    assignTaxBillFhaterChildren(indexFhater, indexChildren, callback) {
        this.setState({
            indexFhater,
            indexChildren
        })
        callback()
    }

    handleUploadTaxBillJudment(e) {
        if (e.target.files.length > 0) {
            this.setState({ uploadJudgment: false })
            uploadFiles(e, (link) => {
                this.setState({ uploadJudgment: true })
                this.props.asset.states['legal'].legalStatus.judgments[this.state.indexFhater].nameDefendant[this.state.indexChildren].taxDomicile.taxBill = ''
                this.props.refresh()
                this.props.asset.states['legal'].legalStatus.judgments[this.state.indexFhater].nameDefendant[this.state.indexChildren].taxDomicile.taxBill = link[0]
                this.props.refresh()
            }, (percentage) => {
                this.setState({ percentageJudgment: Math.round(percentage) })
            }, 'legal/')
        }
    }

    handleNewContact() {
        let contact = {
            titleContact: "",
            name: '',
            surname: '',
            jobPost: '',
            email: '',
            officePhone: '',
            cellPhone: ''
        }
        this.props.asset.states['legal'].legalStatus.judgments[this.state.indexTaxBill].applicantName.contacts.push(contact)
        this.props.refresh()
    }

    handleNewContactJudgment() {
        let contact = {
            titleContact: "",
            name: '',
            surname: '',
            jobPost: '',
            email: '',
            officePhone: '',
            cellPhone: ''
        }
        this.props.asset.states['legal'].legalStatus.judgments[this.state.indexFhater].nameDefendant[this.state.indexChildren].contacts.push(contact)
        this.props.refresh()
    }

    handleDeletedContact(index) {
        confirmRequest('¿Eliminar contacto?', 'Se eliminara permanentemente', (ok) => {
            if (ok) {
                this.props.asset.states['legal'].legalStatus.judgments[this.state.indexTaxBill].applicantName.contacts.splice(index, 1)
                this.props.refresh()
            }
        })
    }

    handleDeletedContactJudgment(index) {
        confirmRequest('¿Eliminar contacto?', 'Se eliminara permanentemente', (ok) => {
            if (ok) {
                this.props.asset.states['legal'].legalStatus.judgments[this.state.indexFhater].nameDefendant[this.state.indexChildren].contacts.splice(index, 1)
                this.props.refresh()
            }
        })
    }

    handleNewNameDefendant(index) {
       let newDefendant = {
                dataBasic: {
                    taxRegime: "",
                    RFC: "",
                    socialReason: "",
                    tradeName: "",
                    legalRepresentative: ""
                },
                taxDomicile: {
                    street: "",
                    outdoorNumber: "",
                    interiorNumber: "",
                    colony: "",
                    municipality: "",
                    state: "",
                    country: "",
                    postalCode: "",
                    taxBill: "",
                    typeOfSettlement: ""
                },
                contacts: [
                    {
                        name: "",
                        surname: "",
                        jobPost: "",
                        email: "",
                        officePhone: "",
                        cellPhone: ""
                    }
                ]
            }
        this.props.asset.states['legal'].legalStatus.judgments[index].nameDefendant.push(newDefendant)
        this.props.refresh()
    }

    handleNewNameDefendantExt() {
        modelJudment((model) => {
            this.props.asset.states['legal'].legalStatus['judgments'].push(model)
            this.props.refresh()
        })
    }

    handleDeleteNameDefendantExt(){
        let i = this.props.asset.states['legal'].legalStatus['judgments'].length -1

        this.props.asset.states['legal'].legalStatus['judgments'].splice(i, 1)
        this.props.refresh()
    }
    

    handleDeleteJudment(index) {
        confirmRequest('¿Eliminar juicio?', 'Se eliminara permanentemente', (ok) => {
            if (ok) {
                this.props.asset.states['legal'].legalStatus['judgments'].splice(index, 1)
                this.props.refresh()
            }
        })
    }

    render() {
        return (
            <div className="DocSituation">
                <h3 className="divider-profile">Situación jurídica</h3>

                <DataBasic asset={this.props.asset} />

                <h3 className="divider-profile">Actividades</h3>

                <div className="docStatus">
                    <p>Estatus Jurídico:</p>

                    <select
                        className="form-control"
                        value={this.props.asset.states['legal'].legalStatus.withProblems}
                        onChange={(e) => { this.props.asset.states['legal'].legalStatus.withProblems = e.target.value, this.props.refresh() }}
                    >
                        <option value="true">CON LITIGIO</option>
                        <option value="false">SIN LITIGIO</option>
                    </select>
                </div>
                {
                    this.props.asset.states['legal'].legalStatus.withProblems === "true" &&
                    <Judgments
                        handleNewJudgment={this.handleNewJudgment}
                        asset={this.props.asset}
                        refresh={this.props.refresh}
                        handleUploadTaxBill={this.handleUploadTaxBill}
                        states={this.state.states}
                        upload={this.state.upload}
                        percentage={this.state.percentage}
                        assignTaxBill={this.assignTaxBill}
                        handleNewContact={this.handleNewContact}
                        handleDeletedContact={this.handleDeletedContact}
                        assignTaxBillFhaterChildren={this.assignTaxBillFhaterChildren}
                        handleUploadTaxBillJudment={this.handleUploadTaxBillJudment}
                        percentageJudgment={this.state.percentageJudgment}
                        uploadJudgment={this.state.uploadJudgment}
                        handleNewContactJudgment={this.handleNewContactJudgment}
                        handleDeletedContactJudgment={this.handleDeletedContactJudgment}
                        handleNewNameDefendant={this.handleNewNameDefendant}
                        handleNewNameDefendantExt={this.handleNewNameDefendantExt}
                        handleDeleteJudment={this.handleDeleteJudment}
                        handleDeleteNameDefendantExt = {this.handleDeleteNameDefendantExt}
                    />
                }

                <div className="high-btns">
                    <button
                        onClick={() => { this.props.procedures[2].active = false, this.props.refresh() }}
                        type="button"
                        className="btn-cancel">
                        <i className="fas fa-ban"></i> Cancelar</button>
                    
                    <button
                        onClick={() => this.props.handleUpdateAsset(2)}
                        type="button"
                        className="btn-next"><i className="far fa-save"></i> Guardar</button>
                </div>
            </div>
        )
    }
}
