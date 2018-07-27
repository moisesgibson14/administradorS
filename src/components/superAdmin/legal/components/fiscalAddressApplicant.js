import React from 'react'
import { TextMask, InputAdapter } from 'react-text-mask-hoc'

const FiscalAddressApplication = (props) => (
    <div className="flex-sates wrapAccordion">

        <div className="input-sates">
            <label>C.P.</label>
            <TextMask
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                Component={InputAdapter}
                value={props.judgment['applicantName']['taxDomicile'].postalCode}
                onChange={(e) => { props.judgment['applicantName']['taxDomicile'].postalCode = e.target.value, props.refresh() }}
            />
        </div>

            <div className="input-sates">
                <label>Calle:</label>
                <input
                    value={props.judgment['applicantName']['taxDomicile'].street}
                    onChange={(e) => { props.judgment['applicantName']['taxDomicile'].street = e.target.value.toUpperCase(), props.refresh() }}
                    type="text"
                />
            </div>

            <div className="input-sates" >
                <label>#Ext:</label>
                <input
                    value={props.judgment['applicantName']['taxDomicile'].outdoorNumber}
                    onChange={(e) => { props.judgment['applicantName']['taxDomicile'].outdoorNumber = (e.target.value < 0) ? 0 : e.target.value, props.refresh() }}
                    type="number" id="inlineFormInputGroup" />
            </div>

            <div className="input-sates" >
                <label>#Int:</label>
                <input
                    value={props.judgment['applicantName']['taxDomicile'].interiorNumber}
                    onChange={(e) => { props.judgment['applicantName']['taxDomicile'].interiorNumber = (e.target.value < 0) ? 0 : e.target.value, props.refresh() }}
                    type="number" id="inlineFormInputGroup"
                />
            </div>

            <div className="input-sates" >
                <label>Colonia:</label>
                <input type="text"
                    value={props.judgment['applicantName']['taxDomicile'].colony}
                    onChange={(e) => { props.judgment['applicantName']['taxDomicile'].colony = e.target.value.toUpperCase(), props.refresh() }}
                />
            </div>
 

            <div className="input-sates">
                <label>Municipio/Delegación:</label>
                <input value={props.judgment['applicantName']['taxDomicile'].municipality}
                    onChange={(e) => { props.judgment['applicantName']['taxDomicile'].municipality = e.target.value.toUpperCase(), props.refresh() }}
                    type="text" 
                    id="inlineFormInputGroup"
                />
            </div>

            <div className="input-sates">
                <label>Tipo de asentamiento:</label>
                <input value={props.judgment['applicantName']['taxDomicile'].typeOfSettlement}
                    onChange={(e) => { props.judgment['applicantName']['taxDomicile'].typeOfSettlement = e.target.value.toUpperCase(), props.refresh() }}
                    type="text"
                    id="inlineFormInputGroup"
                />
            </div>


            <div className="input-sates">
                    <label>Estado:</label>
                    <select
                        className="form-control"
                        value={props.judgment['applicantName']['taxDomicile'].state}
                        onChange={(e) => { props.judgment['applicantName']['taxDomicile'].state = e.target.value, props.refresh() }}
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
                    onClick={() => props.assignTaxBill(props.indexFhater)}
                    style={{ cursor: 'pointer', height: '33px', marginLeft: '20px', display: 'inline-block'}} htmlFor="cedula" className="mt-1 ml-1 mr-1 btn btn-primary">
                    <i className="fas fa-upload" aria-hidden="true"></i>
                </label>
                <input id="cedula" style={{ display: 'none' }} type="file" className="form-control" onChange={(e) => props.handleUploadTaxBill(e)} name="taxBill" />
                {
                    props.judgment['applicantName']['taxDomicile'].taxBill !== "" &&
                    <div>
                        <a style={{ height: '33px' }} className="btn btn-secondary mr-1 mt-1" data-fancybox data-type="iframe" data-src={props.judgment['applicantName']['taxDomicile'].taxBill} href="javascript:;">
                            <i className="fas fa-eye fa-1x" />
                        </a>
                        <button
                            style={{ height: '33px' }}
                            onClick={() => { props.judgment['applicantName']['taxDomicile'].taxBill = '', props.refresh()}}
                            type="button"
                            className="mt-1 btn btn-danger"
                        >
                            <i className="icon-close fa-1x" />
                        </button>
                    </div>
                }


                {
                !props.upload &&
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${props.percentage}%` }}>{props.percentage}%</div>
                </div>
                }
            </div>
    </div>
)


export default FiscalAddressApplication