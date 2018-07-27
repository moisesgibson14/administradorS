import React from 'react'
import Judgment from './judgment'
import CharacteristicsJudgment from './characteristicsJudgment'
import DocumentsJudgment from './documentsJudgment'
import { UncontrolledTooltip } from 'reactstrap';
import DescriptionJudgment from './descriptionJudgment'
import { InputText } from '../../../../swaIInputs'

const newClidren = (props,documentation) => {

    InputText('TÍTULO:', (data) => {
        let children = {
            dateOfTheDocument: new Date(),
            label: data,
            notes: '',
            url: '',
            urlInterpretation: ''
        }

        documentation.children = documentation.children.concat(children)
        console.log(documentation);
        
        props.refresh()
    })
}

const Judgments = (props) => (
    <div>
        {
            props.asset.states['legal']['legalStatus'].judgments.map((judgment, indexJudgment) => (
                <div key={indexJudgment}>
                    <Judgment
                        refresh={props.refresh}
                        judgment={judgment}
                        handleUploadTaxBill={props.handleUploadTaxBill}
                        states={props.states}
                        upload={props.upload}
                        percentage={props.percentage}
                        indexFhater={indexJudgment}
                        assignTaxBill={props.assignTaxBill}
                        handleNewContact={props.handleNewContact}
                        handleDeletedContact={props.handleDeletedContact}
                        assignTaxBillFhaterChildren={props.assignTaxBillFhaterChildren}
                        handleUploadTaxBillJudment={props.handleUploadTaxBillJudment}
                        percentageJudgment={props.percentageJudgment}
                        uploadJudgment={props.uploadJudgment}
                        handleNewContactJudgment={props.handleNewContactJudgment}
                        handleDeletedContactJudgment={props.handleDeletedContactJudgment}
                        handleNewNameDefendant={props.handleNewNameDefendant}
                        handleDeleteJudment={props.handleDeleteJudment}
                    />
                    {
                        indexJudgment >= 0 &&
                        <h3 className="divider-profile divCharacteristic">Características</h3>
                    }
                    <CharacteristicsJudgment
                        judgment={judgment}
                        refresh={props.refresh}
                        states={props.states}
                    />
                    {
                        indexJudgment >= 0 &&
                        <h3 className="divider-profile divCharacteristic flex-sates"><span>Documentación del litigio</span>
                            <button className="docLitBtn" onClick={() => newClidren(props,judgment.documentation)} ><i className="fas fa-plus"></i></button>
                        </h3>
                    }
                    <DocumentsJudgment
                        IJ = {indexJudgment}
                        documentation={judgment.documentation}
                        refresh={props.refresh}
                    />
                    <DescriptionJudgment
                        IJ = {indexJudgment}
                        description={judgment.description}
                        refresh={props.refresh}
                    />
                </div>
            ))
        }
        {
            props.asset.states['legal']['legalStatus'].judgments.length > 0 &&
            <div className="newJudgment">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => props.handleNewNameDefendantExt()}
                    id="helpJudgment"
                >
                    <i className="fas fa-plus"></i>
                </button>
                <UncontrolledTooltip placement="right" target="helpJudgment">
                    NUEVO JUICIO
                </UncontrolledTooltip>
            </div>

        }

        {
            props.asset.states['legal']['legalStatus'].judgments.length > 0 &&
            <div className="newJudgment">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => props.handleDeleteNameDefendantExt()}
                    id="helpJudgment"
                >
                    <i className="fas fa-minus-square"></i>
                </button>
                <UncontrolledTooltip placement="right" target="helpJudgment">
                    ELIMINAR JUICIO
                </UncontrolledTooltip>
            </div>

        }


        {
            props.asset.states['legal']['legalStatus'].judgments.length < 1 &&
            <div className="row ml-2">
                <div className="alert alert-info col-12 col-md-3" role="alert">
                    NO TIENE JUICIOS
                </div>
                <div className="col-12 col-md-2 mt-1">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => props.handleNewJudgment()}
                    >Crear nuevo</button>
                </div>
            </div>
        }
    </div>
)

export default Judgments