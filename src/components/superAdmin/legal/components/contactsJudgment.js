import React from 'react'
import ContactJudgment from './contactJudment'

const ContactsJudgment = (props) => (
    <div>
        {
            props.judgment.contacts.map((contact, indexContactJudgment) => (
                <ContactJudgment
                    key={indexContactJudgment}
                    contact={contact}
                    indexJudgment={indexContactJudgment}
                    lengthChildrenJudgment={props.judgment.contacts.length - 1}
                    refresh={props.refresh}
                    indexFhater={props.indexFhater}
                    assignTaxBill={props.assignTaxBill}
                    handleNewContactJudgment={props.handleNewContactJudgment}
                    assignTaxBillFhaterChildren={props.assignTaxBillFhaterChildren}
                    handleDeletedContactJudgment={props.handleDeletedContactJudgment}
                    chido={props.chido} 
                />
            ))
        }
    </div>
)

export default ContactsJudgment;