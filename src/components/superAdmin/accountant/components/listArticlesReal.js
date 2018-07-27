import React from 'react'
const listArticlesReal = (props) => (
    <div>
        {props.articles.buildings.map((list, index) => {
            return (
                <div key={index}>
                    <div className="alert alert-dark" role="alert">
                    CONSTRUCCION: <strong>  <label htmlFor="">{list.name}</label> </strong>
                    </div>                    
                    {list.levels.map((levels, indexLevels) => {
                        return (
                            <div key={indexLevels}>
                                <div className="alert alert-info" role="alert">
                                 NIVEL: <strong> <label htmlFor="">{levels.name}</label> </strong>
                                </div> 
                                
                                {levels.areas.map((areas, indexAreas) => {
                                    return (
                                        <div key={indexAreas}>
                                            <div className="alert alert-warning" role="alert">
                                                AREA: <strong> <label htmlFor="">{areas.name}</label> </strong>
                                            </div> 
                                            <div className="tb-responsive">                                            
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>id Articulo</th>
                                                        <th>Tipo de articulo</th>
                                                        <th>Descripción</th>
                                                        <th>Cantidad</th>
                                                        <th>Fecha de registro</th>
                                                        {/* <th>Fecha de actualización</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {areas.assets.map((assets, indexAssets) => {
                                                        return (
                                                            <tr key={indexAssets}>
                                                                <td>{indexAssets + 1}</td>
                                                                <td>{assets.idQR}</td>
                                                                <td><strong>{assets.name}</strong></td>
                                                                <td>{assets.description}</td>
                                                                <td><strong>{assets.numberAsset}</strong></td>
                                                                <td>{assets.dateCreation}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        )
                    })}
                </div>
            )
        })}
    </div>
)

export default listArticlesReal