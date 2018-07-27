import React from 'react'
import { InputGroup, InputGroupAddon } from 'reactstrap'
const DataBasicJudgment = (props) => (
    <div className="wrapAccordion">
        <div className="flex-sates" >

            <div className="input-sates" >
                <label>Régimen fiscal:</label>
                <select className="form-control"
                    value={props.judgment['dataBasic'].taxRegime}
                    onChange={(e) => { props.judgment['dataBasic'].taxRegime = e.target.value, props.refresh() }}
                >
                    <option value="null">Selecionar</option>
                    <option value="fisica">Física</option>
                    <option value="fisicaAE">Física con actividad empresarial</option>
                    <option value="gobierno">Gobierno</option>
                    <option value="moral">Moral</option>
                </select>
            </div>

            <div className="input-sates" >
                <label>RFC:</label>
                <input
                    disabled={(props.judgment['dataBasic'].taxRegime === '' || props.judgment['dataBasic'].taxRegime === 'null') ? true : false}
                    type="text"
                    maxLength={(props.judgment['dataBasic'].taxRegime === 'moral') ? "12" : "13"}
                    value={props.judgment['dataBasic'].RFC}
                    onChange={(e) => { props.judgment['dataBasic'].RFC = e.target.value.toUpperCase(), props.refresh() }}
                />
            </div>
            
            <div className="input-sates" >
                <label>Razón Social:</label>
                <input
                    disabled={(props.judgment['dataBasic'].taxRegime === '' || props.judgment['dataBasic'].taxRegime === 'null') ? true : false}
                    type="text"
                    value={(props.judgment['dataBasic'].taxRegime === 'fisica' || props.judgment['dataBasic'].taxRegime === 'fisicaAE') ? (props.judgment['dataBasic'].socialReason = '') : props.judgment['dataBasic'].socialReason}
                    disabled={(props.judgment['dataBasic'].taxRegime === 'fisica' || props.judgment['dataBasic'].taxRegime === 'fisicaAE' || props.judgment['dataBasic'].taxRegime === '' || props.judgment['dataBasic'].taxRegime === 'null') ? true : false}
                    onChange={(e) => { props.judgment['dataBasic'].socialReason = e.target.value.toUpperCase(), props.refresh() }}
                />
            </div>

            <div className="input-sates" >
                <label>Nombre Comercial:</label>
                <input
                    type="text"
                    value={(props.judgment['dataBasic'].taxRegime === 'fisica' || props.judgment['dataBasic'].taxRegime === 'fisicaAE') ? (props.judgment['dataBasic'].tradeName = '') : props.judgment['dataBasic'].tradeName}
                    disabled={(props.judgment['dataBasic'].taxRegime === 'fisica' || props.judgment['dataBasic'].taxRegime === 'fisicaAE' || props.judgment['dataBasic'].taxRegime === '' || props.judgment['dataBasic'].taxRegime === 'null') ? true : false}
                    onChange={(e) => {
                        props.judgment['dataBasic'].tradeName = e.target.value.toUpperCase(),
                            props.refresh()
                    }}
                />
            </div>

            <div className="input-sates" >
                <label>Representante Legal:</label>
                <input
                    disabled={(props.judgment['dataBasic'].taxRegime === '' || props.judgment['dataBasic'].taxRegime === 'null') ? true : false}
                    type="text"
                    value={props.judgment['dataBasic'].legalRepresentative}
                    onChange={(e) => {
                        props.judgment['dataBasic'].legalRepresentative = e.target.value.toUpperCase(),
                            props.refresh()
                    }}
                />
            </div>
        </div>

    </div>
)

export default DataBasicJudgment;