import React from 'react'
import DataBasicApplicant from './dataBasicApplicant'
import FiscalAddressApplication from './fiscalAddressApplicant'
import Contacs from './contacs'

const Applicant = (props) => (
    <div id="accordion" className="judgmentAccordion">
        <div>
            <button className="JudgmentBtn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="headingOne">
                Datos Básicos<span><i className="fas fa-angle-down"></i></span>
            </button>

            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                <div>
                    <DataBasicApplicant
                        judgment={props.judgment}
                        refresh={props.refresh}
                    />
                </div>
            </div>
        </div>

        <div>
            <button className="JudgmentBtn collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" id="headingTwo">
                Dirección fiscal<span><i className="fas fa-angle-down"></i></span>
            </button>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                <div>
                    <FiscalAddressApplication
                        judgment={props.judgment}
                        refresh={props.refresh}
                        handleUploadTaxBill={props.handleUploadTaxBill}
                        states={props.states}
                        upload={props.upload}
                        percentage={props.percentage}
                        indexFhater={props.indexFhater}
                        assignTaxBill={props.assignTaxBill}
                    />
                </div>
            </div>
        </div>

        <div>
            <button className="JudgmentBtn collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" id="headingThree">
                Contactos<span><i className="fas fa-angle-down"></i></span>
            </button>
            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                <div>
                    <Contacs
                        judgment={props.judgment}
                        refresh={props.refresh}
                        handleNewContact={props.handleNewContact}
                        handleDeletedContact={props.handleDeletedContact}
                        indexFhater={props.indexFhater}
                        assignTaxBill={props.assignTaxBill}
                    />
                </div>
            </div>
        </div>
    </div>
)

export default Applicant