import React from 'react'
import dateFormat from 'dateformat'

const DataBasic = (props) => (
    <div className="flex-sates legalDataItem">
        <div className="legalDataImg">
            <img className="" src={(props.asset.mainPhoto) ? props.asset.mainPhoto : 'https://image.ibb.co/jnZBTH/Recurso_15.png'} alt="Card image cap" />
        </div>
        <div className="legalDataInfo">
            <h3>{props.asset.typeOfAsset}</h3>
            <p>{props.asset.idSates}</p>
            <p>{props.asset.states['assetData'].superficieTerreno}</p>
            <p>{props.asset.states['assetData'].superficieConstrucion}</p>
            <p>
                {(!props.asset.states.location.CP) ? '' : (props.asset.states.location.CP)}
                {(!props.asset.states.location.street) ? '' : (', ' + props.asset.states.location.street)}
                {(!props.asset.states.location.nExterno) ? '' : (', ' + props.asset.states.location.nExterno)}
                {(!props.asset.states.location.nInterno) ? '' : (', ' + props.asset.states.location.nInterno)}
                {(!props.asset.states.location.municipality) ? ', ' : props.asset.states.location.municipality}
                {(!props.asset.states.location.state) ? '' : (', ' + props.asset.states.location.state)}
                {(!props.asset.states.location.country) ? '' : (', ' + props.asset.states.location.country)}
            </p>
            <p>{props.asset.destination}</p>
            <p>{dateFormat(props.asset.creationDate, 'dd/mm/yy - h:MM:ss TT')}</p>
        </div>
    </div>
)

export default DataBasic
 