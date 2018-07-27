import React, { Component } from 'react'
import { FormGroup, InputGroup, InputGroupAddon } from 'reactstrap'

export default class Contacts extends Component {
    constructor(props) {
        super(props)

        this.handleNewContact = this.handleNewContact.bind(this)
        this.handleDeletedContact = this.handleDeletedContact.bind(this)
    }

    handleNewContact() {
        let numberContacts = this.props.user.contacts.length
        let label = 'Contacto extra ' + (numberContacts - 2)
        let contact = {
            label: label,
            name: '',
            surname: '',
            jobPost: '',
            email: '',
            officePhone: '',
            cellPhone: ''
        }
        this.props.user.contacts = this.props.user.contacts.concat(contact)
        this.props.refresh()
    }

    handleDeletedContact(index) {
        let contactsTMP = []
        this.props.user.contacts.map((contact, key) => {
            if (index !== key) {
                if(key > 2) {
                    let numberContacts = contactsTMP.length
                    let label = 'Contacto extra ' + (numberContacts - 2)
                    contact.label = label
                }
                contactsTMP = contactsTMP.concat(contact)
            }
        })
        this.props.user.contacts = contactsTMP
        this.props.refresh()
    }

    render() {
        let contacts = this.props.user.contacts
        if(!contacts) return <h5>Cargando...</h5>
        return (
            <div>
                {
                    contacts.map((contact, index) => (
                        <div key={index} >
                            <strong>{contact.label}</strong>
                            {
                                index > 2 &&
                                <button type="button" className="btn btn-danger mb-3 ml-4 mt-2" onClick={() => this.handleDeletedContact(index)} ><i className="fas fa-times-circle"></i></button>
                            }
                            <div className="row mt-1">
                                <div className="col col-xs-12 col-md-4">
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon>Nombre(s)</InputGroupAddon>
                                            <input value={contacts[index].name} type="text" className="form-control" onChange={(e) => { this.props.user.contacts[index].name = e.target.value.toUpperCase(), this.props.refresh()}} />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                <div className="col col-xs-12 col-md-4">
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon>Apellidos</InputGroupAddon>
                                            <input value={contacts[index].surname} type="text" className="form-control" onChange={(e) => { this.props.user.contacts[index].surname = e.target.value.toUpperCase(), this.props.refresh()}} />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                <div className="col col-xs-12 col-md-4">
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon>Puesto</InputGroupAddon>
                                            <input value={contacts[index].jobPost} type="text" className="form-control" onChange={(e) => { this.props.user.contacts[index].jobPost = e.target.value.toUpperCase(), this.props.refresh()}} />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col col-xs-12 col-md-4">
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon>Correo eléctronico</InputGroupAddon>
                                            <input value={contacts[index].email} type="text" className="form-control" onChange={(e) => { this.props.user.contacts[index].email = e.target.value, this.props.refresh() }} />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                <div className="col col-xs-12 col-md-4">
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon>Télefono oficina</InputGroupAddon>
                                            <input value={contacts[index].officePhone} type="text" className="form-control" onChange={(e) => { this.props.user.contacts[index].officePhone = e.target.value, this.props.refresh() }} />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                <div className="col col-xs-12 col-md-4">
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupAddon>Télefono celular</InputGroupAddon>
                                            <input value={contacts[index].cellPhone} type="text" className="form-control" onChange={(e) => { this.props.user.contacts[index].cellPhone = e.target.value, this.props.refresh() }} />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <button type="button" className="btn btn-success float-right mb-3 mr-3" onClick={() => this.handleNewContact()} ><i className="fas fa-plus-circle"></i></button>
            </div>
        )
    }
}
