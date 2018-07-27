import React, { Component } from 'react'

const AssetsViewPhotos = (props) => (
   <div>
      <div className="viewAssetPhotos flex-sates">
         {
            props.asset.conditions.photosUrl.length > 0  &&
            props.asset.conditions.photosUrl.map((img, index) => {
            return (
               <a href={img} key={index} data-fancybox='fancyAsset'>
                  <img src={img} alt=""/>
               </a>
            )
            })
         }
         {
            props.asset.conditions.photosUrl.length === 0 &&
            <h4>No hay fotos para mostrar</h4>
         }
      </div>
   </div>
)

export default AssetsViewPhotos