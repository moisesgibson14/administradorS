import React from 'react'
import { TextMask, InputAdapter } from 'react-text-mask-hoc'

const FiscalAddressJudgment = (props) => (
    <div className="flex-sates wrapAccordion">

            <div className="input-sates">
                <label>C.P.</label>
                <TextMask
                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                    Component={InputAdapter}
                    value={props.judgment['taxDomicile'].postalCode}
                    onChange={(e) => { props.judgment['taxDomicile'].postalCode = e.target.value, props.refresh() }}
                />
            </div>


                <div className="input-sates">
                    <label>Calle:</label>
                    <input
                        value={props.judgment['taxDomicile'].street}
                        onChange={(e) => { props.judgment['taxDomicile'].street = e.target.value.toUpperCase(), props.refresh() }}
                        type="text"
                    />
                </div>

            <div className="input-sates" >
                <label>#Ext:</label>
                <input
                    value={props.judgment['taxDomicile'].outdoorNumber}
                    onChange={(e) => { props.judgment['taxDomicile'].outdoorNumber = (e.target.value < 0) ? 0 : e.target.value, props.refresh() }}
                    type="number" id="inlineFormInputGroup" />

            </div>

            <div className="input-sates" >
                <label>#Int:</label>
                <input
                    value={props.judgment['taxDomicile'].interiorNumber}
                    onChange={(e) => { props.judgment['taxDomicile'].interiorNumber = (e.target.value < 0) ? 0 : e.target.value, props.refresh() }}
                    type="number" id="inlineFormInputGroup"
                />
            </div>

            <div className="input-sates" >
                <label>Colonia:</label>
                <input type="text"
                    value={props.judgment['taxDomicile'].colony}
                    onChange={(e) => { props.judgment['taxDomicile'].colony = e.target.value.toUpperCase(), props.refresh() }}
                />
            </div>
    

            <div className="input-sates">
                <label>Municipio/Delegación:</label>
                <input value={props.judgment['taxDomicile'].municipality}
                    onChange={(e) => { props.judgment['taxDomicile'].municipality = e.target.value.toUpperCase(), props.refresh() }}
                    type="text"
                    id="inlineFormInputGroup"
                />
            </div>

            <div className="input-sates">
                <label>Tipo de asentamiento:</label>
                <input value={props.judgment['taxDomicile'].typeOfSettlement}
                    onChange={(e) => { props.judgment['taxDomicile'].typeOfSettlement = e.target.value.toUpperCase(), props.refresh() }}
                    type="text"
                    id="inlineFormInputGroup"
                />
            </div>

            <div className="input-sates">
                <label>Estado:</label>
                <select
                    className="form-control"
                    value={props.judgment['taxDomicile'].state}
                    onChange={(e) => { props.judgment['taxDomicile'].state = e.target.value, props.refresh() }}
                >
                    <option value="null">SELECCIONAR ESTADO</option>
                    {
                        props.states.map((state, indexState) => (
                            <option key={indexState} value={state.Abreviacion}>{state.Estado}</option>
                        ))
                    }
                </select>
            </div>

            <div className="input-sates">
                <label>País:</label>
                <input
                    disabled
                    value="MÉXICO"
                    type="text"
                    id="inlineFormInputGroup"
                />
            </div>

            <div className="input-sates" >
                        <label>Cédula fiscal: </label>
                        <label
                            onClick={() => props.assignTaxBillFhaterChildren(props.indexFhater, props.indexChildren)}
                            style={{ cursor: 'pointer', height: '33px' }} htmlFor="cedulaJudgment" className="mt-1 ml-1 mr-1 btn btn-primary">
                            <i className="fas fa-upload" aria-hidden="true"></i>
                        </label>
                        <input
                            id="cedulaJudgment"
                            style={{ display: 'none' }}
                            type="file"
                            onChange={(e) => props.handleUploadTaxBillJudment(e)}
                            name="taxBill"
                        />
                        {
                            props.judgment['taxDomicile'].taxBill !== "" &&
                            <div>
                                <a style={{ height: '33px' }} className="btn btn-secondary mr-1 mt-1" data-fancybox data-type="iframe" data-src={props.judgment['taxDomicile'].taxBill} href="javascript:;">
                                    <i className="fas fa-eye fa-1x" />
                                </a>
                                <button
                                    style={{ height: '33px' }}
                                    onClick={() => { props.judgment['taxDomicile'].taxBill = '', props.refresh() }}
                                    type="button"
                                    className="mt-1 btn btn-danger"
                                >
                                    <i className="icon-close fa-1x" />
                                </button>
                            </div>
                        }
                {
                    !props.uploadJudgment &&
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${props.percentageJudgment}%` }}>{props.percentageJudgment}%</div>
                    </div>
                }
            </div>
    </div>
)

export default FiscalAddressJudgment;