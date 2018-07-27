import React from 'react'
import Contact from './contact'

const Contacs = (props) => (
    props.judgment['applicantName'].contacts.map((contact, indexContact) => (
        <Contact
            key={indexContact}
            contact={contact}
            refresh={props.refresh}
            indexContact={indexContact}
            handleNewContact={props.handleNewContact}
            handleDeletedContact={props.handleDeletedContact}
            indexFhater={props.indexFhater}
            assignTaxBill={props.assignTaxBill}
            lengthChildren={props.judgment['applicantName'].contacts.length - 1}
        />
    ))
)


export default Contacs