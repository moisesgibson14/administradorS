import React from 'react'
import { InputGroup, InputGroupAddon } from 'reactstrap'

const DataBasicApplicant = (props) => (
    <div className="wrapAccordion">
        <div className="flex-sates">
            <div className="input-sates">
                <label>Régimen fiscal:</label>
                <select className="form-control"
                    value={props.judgment['applicantName']['dataBasic'].taxRegime}
                    onChange={(e) => { props.judgment['applicantName']['dataBasic'].taxRegime = e.target.value, props.refresh() }}
                >
                    <option value="null">Selecionar</option>
                    <option value="fisica">Física</option>
                    <option value="fisicaAE">Física con actividad empresarial</option>
                    <option value="gobierno">Gobierno</option>
                    <option value="moral">Moral</option>
                </select>
            </div>

            <div className="input-sates">
                <label>RFC:</label>
                <input
                    disabled={(props.judgment['applicantName']['dataBasic'].taxRegime === '' || props.judgment['applicantName']['dataBasic'].taxRegime === 'null') ? true : false}
                    type="text"
                    maxLength={(props.judgment['applicantName']['dataBasic'].taxRegime === 'moral') ? "12" : "13"}
                    value={props.judgment['applicantName']['dataBasic'].RFC}
                    onChange={(e) => { props.judgment['applicantName']['dataBasic'].RFC = e.target.value.toUpperCase(), props.refresh() }}
                />
            </div>

            <div className="input-sates">
                <label>Razón Social:</label>
                <input
                    disabled={(props.judgment['applicantName']['dataBasic'].taxRegime === '' || props.judgment['applicantName']['dataBasic'].taxRegime === 'null') ? true : false}
                    type="text"
                    value={(props.judgment['applicantName']['dataBasic'].taxRegime === 'fisica' || props.judgment['applicantName']['dataBasic'].taxRegime === 'fisicaAE') ? (props.judgment['applicantName']['dataBasic'].socialReason = '') : props.judgment['applicantName']['dataBasic'].socialReason}
                    disabled={(props.judgment['applicantName']['dataBasic'].taxRegime === 'fisica' || props.judgment['applicantName']['dataBasic'].taxRegime === 'fisicaAE' || props.judgment['applicantName']['dataBasic'].taxRegime === '' || props.judgment['applicantName']['dataBasic'].taxRegime === 'null') ? true : false}
                    onChange={(e) => { props.judgment['applicantName']['dataBasic'].socialReason = e.target.value.toUpperCase(), props.refresh() }}
                />
            </div>

            <div className="input-sates">
                <label>Nombre Comercial:</label>
                <input
                    type="text"
                    value={(props.judgment['applicantName']['dataBasic'].taxRegime === 'fisica' || props.judgment['applicantName']['dataBasic'].taxRegime === 'fisicaAE') ? (props.judgment['applicantName']['dataBasic'].tradeName = '') : props.judgment['applicantName']['dataBasic'].tradeName}
                    disabled={(props.judgment['applicantName']['dataBasic'].taxRegime === 'fisica' || props.judgment['applicantName']['dataBasic'].taxRegime === 'fisicaAE' || props.judgment['applicantName']['dataBasic'].taxRegime === '' || props.judgment['applicantName']['dataBasic'].taxRegime === 'null') ? true : false}
                    onChange={(e) => {
                        props.judgment['applicantName']['dataBasic'].tradeName = e.target.value.toUpperCase(),
                            props.refresh()
                    }}
                />
            </div>

            <div className="input-sates">
                <label>Representante Legal:</label>
                <input
                    disabled={(props.judgment['applicantName']['dataBasic'].taxRegime === '' || props.judgment['applicantName']['dataBasic'].taxRegime === 'null') ? true : false}
                    type="text"
                    value={props.judgment['applicantName']['dataBasic'].legalRepresentative}
                    onChange={(e) => {
                        props.judgment['applicantName']['dataBasic'].legalRepresentative = e.target.value.toUpperCase(),
                            props.refresh()
                    }}
                />
            </div>
        </div>

    </div>
)

export default DataBasicApplicant