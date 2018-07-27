import React from 'react'
import { UncontrolledTooltip } from 'reactstrap'
import Legal from '../containers/legal';



const Asset = (props) => (

    console.log(props, 'en asset'),

    <div className="card-legal flex-sates">
        <figure>
        <   img src={(props.asset.mainPhoto) ? props.asset.mainPhoto : "https://image.ibb.co/jnZBTH/Recurso_15.png"} alt="Card image cap" />
        </figure>

        <div className="card-legal-body">
            <button className="handleButtons" onClick={() => props.openButtons(props.index)}><i className="fas fa-cog"></i></button>
            <span className="card-legal-type">{props.asset.typeOfAsset}</span>
            <span className="card-legal-destination">{props.asset.destination}</span>

            <h3 className="card-legal-title">{props.asset.title}</h3>
            <p className="card-legal-socialReason">{props.asset.socialReason}</p>

            <span className="card-legal-location">
                {(props.asset.states.location.municipality === '') ? '' : props.asset.states.location.municipality}
                {(props.asset.states.location.state === '') ? '' : (', ' + props.asset.states.location.state)}
            </span>
            <span className="card-legal-id">{props.asset.idSates}</span>
        </div>

        <div className="card-legal-btns" id={'legal-btns'+props.index}>
            <button
                disabled={!props.auth.document}
                type="button"
                id={`documental${props.index}`}
                onClick={() => { props.procedures[0].active = true, props.assignSelected(props.asset), props.refresh() }}
                className="btn-doc">
                <i className="fas fa-book"></i>
            </button>

            <button
                disabled={!props.auth.tramites}
                type="button"
                id={`tramites${props.index}`}
                onClick={() => { props.procedures[1].active = true, props.assignSelected(props.asset), props.refresh() }}
                className="btn-tram">
                <i className="far fa-calendar-check"></i>
            </button>

            <button
                disabled={!props.auth.delete}
                type="button"
                onClick={() => { props.procedures[2].active = true, props.assignSelected(props.asset), props.refresh() }}
                id={`situacionJuridica${props.index}`}
                className="btn-sit">
                <i className="fas fa-gavel"></i>
            </button>
            <UncontrolledTooltip placement="bottom" target={`documental${props.index}`}> DOCUMENTAL </UncontrolledTooltip>
            <UncontrolledTooltip placement="bottom" target={`tramites${props.index}`}> TRÁMITES </UncontrolledTooltip>
            <UncontrolledTooltip placement="bottom" target={`situacionJuridica${props.index}`}> SITUACIÓN JURÍDICA </UncontrolledTooltip>
        </div>
    </div>

    // <div className="card">
    //     <img className="card-img-top" src={(props.asset.mainPhoto) ? props.asset.mainPhoto : "https://image.ibb.co/jnZBTH/Recurso_15.png"} alt="Card image cap" />
    //     <div className="card-body">
    //         <h5 className="card-title">{props.asset.typeOfAsset}</h5>
    //         <p className="card-text">{props.asset.title}</p>
    //         <p className="card-text">
    //             {(props.asset.states.location.municipality === '') ? '' : props.asset.states.location.municipality}
    //             {(props.asset.states.location.state === '') ? '' : (', ' + props.asset.states.location.state)}
    //         </p>
    //         <p className="card-text">{props.asset.destination}</p>
    //         <p className="card-text">{props.asset.socialReason}</p>
    //         <p className="card-text">{props.asset.idSates}</p>
    //         <button
    //             type="button"
    //             id={`documental${props.index}`}
    //             onClick={() => { props.procedures[0].active = true, props.assignSelected(props.asset), props.refresh() }}
    //             className="btn btn-primary mr-2 ml-5">
    //             <i className="fas fa-book"></i>
    //         </button>

    //         <button
    //             type="button"
    //             id={`tramites${props.index}`}
    //             onClick={() => { props.procedures[1].active = true, props.assignSelected(props.asset), props.refresh() }}
    //             className="btn btn-light mr-2">
    //             <i className="far fa-calendar-check"></i>
    //         </button>

    //         <button
    //             type="button"
    //             onClick={() => { props.procedures[2].active = true, props.assignSelected(props.asset), props.refresh() }}
    //             id={`situacionJuridica${props.index}`}
    //             className="btn btn-info">
    //             <i className="fas fa-gavel"></i>
    //         </button>
    //         <UncontrolledTooltip placement="bottom" target={`documental${props.index}`}>
    //             DOCUMENTAL
    //                   </UncontrolledTooltip>
    //         <UncontrolledTooltip placement="bottom" target={`tramites${props.index}`}>
    //             TRÁMITES
    //                   </UncontrolledTooltip>
    //         <UncontrolledTooltip placement="bottom" target={`situacionJuridica${props.index}`}>
    //             SITUACIÓN JURÍDICA
    //                   </UncontrolledTooltip>
    //     </div>
    // </div>
)

export default Asset