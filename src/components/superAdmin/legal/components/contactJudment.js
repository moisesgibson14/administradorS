import React from 'react'
import { FormGroup, InputGroupAddon, InputGroup } from 'reactstrap'

const ContactJudment = (props) => (
    <div className="contactItem wrapAccordion"> 
        <div className="flex-sates">

            <div className="input-sates">
                <label>
                    <strong>CONTACTO {(props.indexJudgment + 1)}</strong>
                </label>
                <input
                    type="text"
                    placeholder="TITULO DEL CONTACTO"
                    value={props.contact.titleContact}
                    onChange={(e) => { props.contact.titleContact = e.target.value.toUpperCase(), props.refresh() }}
                />
            </div>

            {
                props.indexJudgment > 0 &&
                <button
                    type="button"
                    className="btn btn-danger mb-3 ml-4 mt-2"
                    onClick={() => { props.assignTaxBillFhaterChildren(props.indexFhater, props.chido, () => { props.handleDeletedContactJudgment(props.indexJudgment), props.refresh() }) }} >
                    <i className="fas fa-times-circle"></i>
                </button>
            }

            <div className="input-sates">
                <label>Nombre(s):</label>
                <input value={props.contact.name} type="text" onChange={(e) => { props.contact.name = e.target.value.toUpperCase(), props.refresh() }} />
            </div>

            <div className="input-sates">
                <label>Apellidos:</label>
                <input value={props.contact.surname} type="text" onChange={(e) => { props.contact.surname = e.target.value.toUpperCase(), props.refresh() }} />
            </div>

            <div className="input-sates">
                <label>Puesto:</label>
                <input value={props.contact.jobPost} type="text" onChange={(e) => { props.contact.jobPost = e.target.value.toUpperCase(), props.refresh() }} />
            </div>
 
            <div className="input-sates">
                <label>Correo electrónico:</label>
                <input value={props.contact.email} type="text" onChange={(e) => { props.contact.email = e.target.value, props.refresh() }} />
            </div>

            <div className="input-sates">
                <label>Télefono oficina:</label>
                <input value={props.contact.officePhone} type="text" onChange={(e) => { props.contact.officePhone = e.target.value, props.refresh() }} />
            </div>

            <div className="input-sates">
                <label>Télefono celular:</label>
                <input value={props.contact.cellPhone} type="text" onChange={(e) => { props.contact.cellPhone = e.target.value, props.refresh() }} />
            </div>

        {
            props.indexJudgment === props.lengthChildrenJudgment &&
            <button
                type="button"
                className="btnAddContact"
                onClick={() => {
                    props.assignTaxBillFhaterChildren(props.indexFhater, props.chido, () => { props.handleNewContactJudgment(), props.refresh() })
                }} >
                Agregar contacto +
            </button>

        }
        </div>
    </div>
)

export default ContactJudment;