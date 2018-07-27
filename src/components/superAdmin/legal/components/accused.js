import React from 'react'
import DataBasicJudgment from './dataBasicJudgment'
import FiscalAddressJudgment from './fiscalAddressJudgment'
import ContactsJudgment from './contactsJudgment'

const Accused = (props) => (
    props.judgment.nameDefendant.map((defendant, indexJudgment) => (
        <div key={indexJudgment} className="AccusedItem">

            <div className="alert alert-primary text-center JudgmentPersons" role="alert">
                <strong>NOMBRE DEL DEMANDADO #{indexJudgment + 1}</strong>
            </div>
                
            <div id={`accordionn${props.indexFhater+indexJudgment}`} className="judgmentAccordion accordBlue">
                <div>
                    <button className="JudgmentBtn" data-toggle="collapse" data-target={`#collapseOnee${props.indexFhater+indexJudgment}`} aria-expanded="true" aria-controls={`collapseOnee${props.indexFhater+indexJudgment}`} id={`headingOnee${props.indexFhater+indexJudgment}`}>
                        Datos Básicos<span><i className="fas fa-angle-down"></i></span>
                    </button>

                    <div id={`collapseOnee${props.indexFhater+indexJudgment}`} className="collapse" aria-labelledby={`headingOnee${props.indexFhater+indexJudgment}`} data-parent={`#accordionn${props.indexFhater+indexJudgment}`}>
                        <div>
                            <DataBasicJudgment
                                judgment={defendant}
                                refresh={props.refresh}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <button className="JudgmentBtn collapsed" data-toggle="collapse" data-target={`#collapseTwoo${props.indexFhater+indexJudgment}`} aria-expanded="false" aria-controls={`collapseTwoo${props.indexFhater+indexJudgment}`} id={`headingTwoo${props.indexFhater+indexJudgment}`}>
                        Dirección fiscal<span><i className="fas fa-angle-down"></i></span>
                    </button>
                    <div id={`collapseTwoo${props.indexFhater+indexJudgment}`} className="collapse" aria-labelledby={`headingTwoo${props.indexFhater+indexJudgment}`} data-parent={`#accordionn${props.indexFhater+indexJudgment}`}>
                        <div>
                            <FiscalAddressJudgment
                                judgment={defendant}
                                refresh={props.refresh}
                                states={props.states}
                                indexFhater={props.indexFhater}
                                indexChildren={indexJudgment}
                                percentageJudgment={props.percentageJudgment}
                                uploadJudgment={props.uploadJudgment}
                                assignTaxBillFhaterChildren={props.assignTaxBillFhaterChildren}
                                handleUploadTaxBillJudment={props.handleUploadTaxBillJudment}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <button className="JudgmentBtn collapsed" data-toggle="collapse" data-target={`#collapseTreee${props.indexFhater+indexJudgment}`} aria-expanded="false" aria-controls={`collapseTreee${props.indexFhater+indexJudgment}`} id={`headingTreee${props.indexFhater+indexJudgment}`}>
                        Contactos<span><i className="fas fa-angle-down"></i></span>
                    </button>
                    <div id={`collapseTreee${props.indexFhater+indexJudgment}`} className="collapse" aria-labelledby="headingTreee" data-parent={`#accordionn${props.indexFhater+indexJudgment}`}>
                        <div>
                            <ContactsJudgment
                                judgment={defendant}
                                refresh={props.refresh}
                                indexFhater={props.indexFhater}
                                assignTaxBill={props.assignTaxBill}
                                handleNewContactJudgment={props.handleNewContactJudgment}
                                assignTaxBillFhaterChildren={props.assignTaxBillFhaterChildren}
                                handleDeletedContactJudgment={props.handleDeletedContactJudgment}
                                chido={indexJudgment}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                props.judgment.nameDefendant.length - 1 === indexJudgment &&
                    <button
                        type="button"
                        className="btnAddAccused"
                        onClick={() => { props.handleNewNameDefendant(props.indexFhater) }}
                    >
                        Agregar demandado +
                    </button>
            }
        </div>
    ))
)

export default Accused