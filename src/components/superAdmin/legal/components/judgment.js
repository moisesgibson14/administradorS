import React from 'react'
import TitleJudgment from './titleJudgment'
import Applicant from './applicant'
import Accused from './accused'
const Judgment = (props) => (
    <div id={`accordionJudgment${props.indexFhater}`}>
        <div className="JudgmentWrap">
            <button className="JudgmentBtn" data-toggle="collapse" data-target={`#collapse${props.indexFhater}`} aria-expanded="true" aria-controls={`collapse${props.indexFhater}`} id="headingOne">
                Juicio #{props.indexFhater + 1}
                <span><i className="fas fa-angle-down"></i></span>
            </button>


            <div id={`collapse${props.indexFhater}`} className="collapse MainCollapse" aria-labelledby="headingOne" data-parent={`#accordionJudgment${props.indexFhater}`}>
              
                        <div className="flex-sates accordionHead">
                            <TitleJudgment
                                judgment={props.judgment}
                                refresh={props.refresh}
                                indexFhater={props.indexFhater}
                            />
                        </div>
                            
                        <div className="alert alert-success text-center JudgmentPersons" role="alert">
                            <strong>NOMBRE DEL DEMANDANTE</strong>
                        </div>

                        <Applicant
                            judgment={props.judgment}
                            refresh={props.refresh}
                            handleUploadTaxBill={props.handleUploadTaxBill}
                            states={props.states}
                            upload={props.upload}
                            percentage={props.percentage}
                            indexFhater={props.indexFhater}
                            assignTaxBill={props.assignTaxBill}
                            handleNewContact={props.handleNewContact}
                            handleDeletedContact={props.handleDeletedContact}
                        />
                        <div>
                            <Accused
                                judgment={props.judgment}
                                refresh={props.refresh}
                                states={props.states}
                                indexFhater={props.indexFhater}
                                percentageJudgment={props.percentageJudgment}
                                uploadJudgment={props.uploadJudgment}
                                assignTaxBillFhaterChildren={props.assignTaxBillFhaterChildren}
                                handleUploadTaxBillJudment={props.handleUploadTaxBillJudment}
                                assignTaxBill={props.assignTaxBill}
                                handleNewContactJudgment={props.handleNewContactJudgment}
                                handleDeletedContactJudgment={props.handleDeletedContactJudgment}
                                handleNewNameDefendant={props.handleNewNameDefendant}
                            />
                        </div>
                        <button 
                            type="button"
                            className="btn btn-danger deleteJudgment"
                            onClick={() => props.handleDeleteJudment(props.indexFhater)}
                        >
                            Eliminar juicio <i className="fas fa-trash-alt"></i>
                        </button>
                   

            </div>
        </div>
    </div>
)

export default Judgment