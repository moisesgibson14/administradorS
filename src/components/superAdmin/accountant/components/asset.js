import React from 'react'
import { UncontrolledTooltip } from 'reactstrap'

const Asset = (props) => (
    <div className="card-legal flex-sates">
        <figure>
            <img className="card-img-top" src={(props.asset.mainPhoto) ? props.asset.mainPhoto : "https://image.ibb.co/jnZBTH/Recurso_15.png"} alt="Card image cap" />
        </figure>
        <div className="card-legal-body">
            <button 
                className="handleButtons" 
                id={`inventariol${props.index}`} 
                onClick={() => { props.assignSelected(props.asset,1), props.refresh() }}>
                    <i className="fas fa-cog"></i>
            </button>

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
    </div>
)

export default Asset