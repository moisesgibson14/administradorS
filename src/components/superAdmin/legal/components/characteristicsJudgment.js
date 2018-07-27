import React from 'react'

const CharacteristicsJudgment = (props) => (
    <div className="CharacteristicsJudgment">
        <div className="flex-sates">
            <div className="input-sates">
                    <label>ENTIDAD FEDERATIVA:</label>
                    <select
                        className="form-control"
                        value={props.judgment.characteristics.typeJudgment}
                        onChange={(e) => { props.judgment.characteristics.typeJudgment = e.target.value, props.refresh() }}
                    >
                        <option value="null">SELECCIONAR</option>
                        <option value="mercantileContest">CONCURSO MERCANTIL</option>
                        <option value="businessExecutive">EJECUTIVO MERCANTIL</option>
                        <option value="mortgageSpecial">ESPECIAL HIPOTECARIO</option>
                        <option value="domainExtension">EXTENCIÓN DE DOMINIO</option>
                        <option value="intestamentary">JUICIO SUSCESORIO INTESTAMENTARIO</option>
                        <option value="testamentary">JUICIO SUSCESORIO TESTAMENTARIO</option>
                        <option value="voluntaryJurisdiction">JURISDICCIÓN VOLUNTARIA</option>
                        <option value="civilOrdinary">ORDINARIO CIVIL</option>
                        <option value="commercialOrdinary">ORDINARIO MERCANTIL</option>
                        <option value="specialCommercialProcedure">PROCEDIMIENTO ESPECIAL MERCANTIL</option>
                    </select>
            </div>

            <div className="input-sates">
                <label>NO. JUZGADO:</label>
                <input
                    type="text"
                    value={props.judgment.characteristics.noCourt}
                    onChange={(e) => { props.judgment.characteristics.noCourt = e.target.value, props.refresh() }}
                />
            </div>

            <div className="input-sates">
                <label>NO. EXPEDIENTE:</label>
                <input
                    type="text"
                    value={props.judgment.characteristics.noCaseFile}
                    onChange={(e) => { props.judgment.characteristics.noCaseFile = e.target.value, props.refresh() }}
                />
            </div>

            <div className="input-sates">
                <label>ENTIDAD FEDERATIVA:</label>
                <select
                    className="form-control"
                    value={props.judgment.characteristics.federalEntity}
                    onChange={(e) => { props.judgment.characteristics.federalEntity = e.target.value, props.refresh() }}
                >
                    <option value="null">SELECCIONAR</option>
                    {
                        props.states.map((state, indexState) => (
                            <option key={indexState} value={state.Abreviacion}>{state.Estado}</option>
                        ))
                    }
                </select>
            </div>

            <div className="input-sates">
                <label>MATERIA:</label>
                <select
                    className="form-control"
                    value={props.judgment.characteristics.matter}
                    onChange={(e) => { props.judgment.characteristics.matter = e.target.value, props.refresh() }}
                >
                    <option value="null">SELECCIONAR</option>
                    <option value="administrative">ADMINISTRATIVA</option>
                    <option value="protection">AMPARO</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="minorAmount">CUANTÍA MENOR</option>
                    <option value="job">DEL TRABAJO</option>
                    <option value="districtCourt">JUZGADO DE DISTRITO</option>
                    <option value="penal">PENAL</option>
                    <option value="oralProcesses">PROCESOS ORALES</option>
                    <option value="rooms">SALAS</option>
                    <option value="collegiateCircuitCourt">TRIBUNAL COLEGIADO DE CIRCUITO</option>
                    <option value="unitCourt">TRIBUNAL UNITARIO</option>
                </select>
            </div>

            <div className="input-sates">
                <label>ESTADO PROCESAL ACTUAL:</label>
                <select
                    className="form-control"
                    value={props.judgment.characteristics.proceduralStatus}
                    onChange={(e) => { props.judgment.characteristics.proceduralStatus = e.target.value, props.refresh() }}
                >
                    <option value="null">SELECCIONAR</option>
                    <option value="award">ADJUDICACIÓN</option>
                    <option value="allegations">ALEGATOS</option>
                    <option value="amparoAgainstFinalJudgment">AMPARO CONTRA SENTECIA DEFINITIVA</option>
                    <option value="amparoAgainstProceduralVices">AMPARO CONTRA VICIOS PROCESALES</option>
                    <option value="conciliationHearing">AUDIENCIA DE CONCILIACIÓN</option>
                    <option value="remateHearing">AUDIENCIA DE REMATE</option>
                    <option value="demandWithoutLocation">DEMANDA SIN EMPLAZAMIENTO</option>
                    <option value="releaseEvidence">DESAHOGO DE PRUEBAS</option>
                    <option value="executionJudgment">EJECUCIÓN DE SENTENCIA</option>
                    <option value="site">EMPLAZAMIENTO</option>
                    <option value="writing">ESCRITURACIÓN</option>
                    <option value="incidentLackPersonality">INCIDENTE DE FALTA DE PERSONALIDAD</option>
                    <option value="expensesCosts">INCIDENTE DE LIQUIDACIÓN DE GASTOS Y COSTOS</option>
                    <option value="interestPayments">INCIDENTE DE LIQUIDACIÓN DE INTERESES</option>
                    <option value="nullityActions">INCIDENTE DE NULIDAD DE ACTUACIONES</option>
                    <option value="objectionEvidence">OBJECIÓN DE PRUEBAS</option>
                    <option value="proofProofs">OFRECIMIENTO DE PRUEBAS</option>
                    <option value="publicationEdictos">PUBLICACIÓN DE EDICTOS</option>
                    <option value="firstInstanceSentence">SENTENCIA PRIMERA INSTANCIA</option>
                    <option value="secondInstanceSentence">SENTENCIA SEGUNDA INSTANCIA</option>
                    <option value="inauguration">TOMA DE POSESIÓN</option>
                </select>
            </div>

            <div className="input-sates">
                <label>SUERTE PRINCIPAL:</label>
                <input
                    type="text"
                    value={props.judgment.characteristics.mainLuck}
                    onChange={(e) => { props.judgment.characteristics.mainLuck = e.target.value, props.refresh() }}
                />
            </div>

        </div>
    </div>
)

export default CharacteristicsJudgment;