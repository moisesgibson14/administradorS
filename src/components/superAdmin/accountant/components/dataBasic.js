import React from 'react'
import dateFormat from 'dateformat'



const DataBasic = (props) => (
    <div className="accountanItem flex-sates">
        <div className="accountanImg">
            <img src={(props.asset.mainPhoto) ? props.asset.mainPhoto : 'https://image.ibb.co/jnZBTH/Recurso_15.png'} alt="Card image cap" />
        </div>
        <div className="accountanHeader">
            <div >
                <h3>{props.asset.title}</h3>
                <button className="btnInfo" onClick={() => props.getAccountantInfo()}>Detalles</button>
            </div>

            <div className="accountanInfo flex-sates">
                <div className="btnInfoClose" onClick={() => props.getAccountantInfo()}>X</div>
                <ul>
                    <li>
                        <span>Tipo:</span>
                        <p>{props.asset.typeOfAsset}</p>
                    </li>
                    <li>
                        <span>Destino:</span>
                        <p>{props.asset.destination}</p>
                    </li>
                    <li>
                        <span>CCT:</span>
                        <p>{props.asset.states.basicInformation[0].valueId}</p>
                    </li>
                    <li>
                        <span>Fecha:</span>
                        <p>{dateFormat(props.asset.creationDate, 'dd/mm/yy - h:MM:ss TT')}</p>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>C.P:</span>
                        <p>{props.asset.states.location.CP}</p>
                    </li>
                    <li>
                        <span>Dirección:</span>
                        <p>{props.asset.states.location.street}</p>
                    </li>
                    <li>
                        <span>Número Externo:</span>
                        <p>{props.asset.states.location.nExterno}</p>
                    </li>
                    <li>
                        <span>Número Interno:</span>
                        <p>{props.asset.states.location.nInterno}</p>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>Municipio:</span>
                        <p>{props.asset.states.location.municipality}</p>
                    </li>
                    <li>
                        <span>Estado:</span>
                        <p>{props.asset.states.location.state}</p>
                    </li>
                    <li>
                        <span>País:</span>
                        <p>{props.asset.states.location.country}</p>
                    </li>
                </ul>
            </div>
            <div className="maskInf"></div>


            {/* <h5 className="">{props.asset.typeOfAsset}</h5>
            <div className="accountanHide">
                <p>
                    {(!props.asset.states.location.CP) ? '' : (props.asset.states.location.CP)}
                    {(!props.asset.states.location.street) ? '' : (', ' + props.asset.states.location.street)}
                    {(!props.asset.states.location.nExterno) ? '' : (', ' + props.asset.states.location.nExterno)}
                    {(!props.asset.states.location.nInterno) ? '' : (', ' + props.asset.states.location.nInterno)}
                    {(!props.asset.states.location.municipality) ? ', ' : props.asset.states.location.municipality}
                    {(!props.asset.states.location.state) ? '' : (', ' + props.asset.states.location.state)}
                    {(!props.asset.states.location.country) ? '' : (', ' + props.asset.states.location.country)}
                </p>
                <div className="flex-sates">
                <p className="">id: {props.asset.idSates}</p>
                <p className="">{props.asset.destination}</p>
                <p className="">{dateFormat(props.asset.creationDate, 'dd/mm/yy - h:MM:ss TT')}</p>
                </div>
            </div> */}
        </div>
    </div>
)

export default DataBasic
