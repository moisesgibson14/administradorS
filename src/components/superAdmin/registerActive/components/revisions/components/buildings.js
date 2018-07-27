import React, { Component } from 'react'

const Buildings = (props) => (
   <div>
      <div className="input-sates">
         <i className="fas fa-building"></i>
         <span>Tipo:</span>
         <p>{props.asset.type}</p>
      </div>

      <div className="input-sates">
         <i className="fas fa-list"></i>
         <span>Superficie del edificio:</span>
         <p>{props.asset.surfaceOfBuilding}</p>
      </div>

      <div className="input-sates">
         <i className="fas fa-tag"></i>
         <span>Tipo de material:</span>
         <p>{props.asset.typeOfMaterial}</p>
      </div>
      
      <div className="input-sates">
         <i className="fas fa-th"></i>
         <span>Niveles:</span>
         <p>{props.asset.levels.length}</p>
      </div>
   </div>
)

export default Buildings