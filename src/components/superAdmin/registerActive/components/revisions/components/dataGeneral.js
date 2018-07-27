import React, { Component } from 'react'

const DataGeneral = (props) => (
   <div className="viewAssetHead">
      <div className="input-sates dataGeneralInput">
         <i className="fas fa-list"></i>
         <span>Descripción:</span>
         <p>{(props.asset.description) ? props.asset.description : '-- Sin descripción --'}</p>
      </div>
      
      <div className="input-sates">
         <i className="fas fa-qrcode"></i>
         <span>Id QR:</span>
         <p>{props.asset.idQR}</p>
      </div>

      <div className="input-sates">
         <i className="far fa-calendar-alt"></i>
         <span>Fecha:</span>
         <p>{props.asset.dateCreation}</p>
      </div>
      
      <div className="input-sates">
         <i className="far fa-check-square"></i>
         <span>Condiciones:</span>
         <p>{props.asset.conditions.label}</p>
         </div>
   </div>
)

export default DataGeneral