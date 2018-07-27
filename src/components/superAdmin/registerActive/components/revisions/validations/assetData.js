import React, { Component } from 'react'
import ValidationData from './validationData'


const AssetData = (props) =>(
    <div className="row" >

        <ValidationData
            refresh={props.refresh}
            name='Superficie de terreno'
            previousValue={props.assetData.superficieTerreno}
            newLocation={props.newData.superficieTerreno}
        />

        <ValidationData
            refresh={props.refresh}
            name='Superficie de construcción'
            previousValue={props.assetData.superficieConstrucion}
            newLocation={props.newData.superficieConstrucion}
        />
        
        <ValidationData
            refresh={props.refresh}
            name='Indiviso'
            previousValue={props.assetData.indiviso}
            newLocation={props.newData.indiviso}
        />

        <ValidationData
            refresh={props.refresh}
            name='Antiguedad de construción'
            previousValue={props.assetData.antiguedadConstrucion}
            newLocation={props.newData.antiguedadConstrucion}
        />
    </div>
)

export default AssetData
