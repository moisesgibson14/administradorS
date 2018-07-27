import React, { Component } from 'react'
import TableAssets from './tableAssets'

const Levels = (props) => (
   <div>
      <div>
         <div className="input-sates">
            <i className="fas fa-expand"></i>
            <span>Áreas:</span>
            <p>{props.asset.areas.length}</p>
         </div>

         <div className="input-sates">
            <i className="fas fa-tasks"></i>
            <span>Activos:</span>
            <p>{props.asset.RealEstateAssets.length}</p>
            {
               props.asset.RealEstateAssets.length > 0 && 
               <span 
                  className="downTable"
                  onClick={props.tableAsset}>
                  <i className="fas fa-caret-down"></i>
               </span>
            }
         </div>
      </div>

      <TableAssets asset = {props.asset} dataAssets = {props.asset.RealEstateAssets}/>
   </div>
)

export default Levels