import React, { Component } from 'react'
import TableAssets from './tableAssets'

const Areas = (props) => (
	<div>
		<div className="input-sates">
         <i className="fas fa-tasks"></i>
         <span>Activos:</span>
         <p>{props.asset.assets.length}</p>
         {
            props.asset.assets.length > 0 && 
            <span 
               className="downTable"
               onClick={props.tableAsset}>
               <i className="fas fa-caret-down"></i>
            </span>
         }
      </div>
		<TableAssets asset = {props.asset} dataAssets = {props.asset.assets}/>
	</div>
)

export default Areas