import React, { Component } from 'react'

const Assets = (props) => (
   <div>
      <div className="input-sates">
         <i className="fas fa-tag"></i>
         <span>Marca:</span>
         <p>{props.asset.brand}</p>
      </div>

      <div className="input-sates">
         <i className="fas fa-file-alt"></i>
         <span>Modelo:</span>
         <p>{props.asset.model}</p>
      </div>

      <div className="input-sates">
         <i className="fas fa-list-ol"></i>
         <span>Cantidad:</span>
         <p>{props.asset.numberAsset}</p>
      </div>

      <div className="input-sates">
         <i className="fas fa-dollar-sign"></i>
         <span>Precio:</span>
         <p>{props.asset.price}</p>
      </div>
</div>
)

export default Assets