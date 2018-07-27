import React from 'react'
const listArticles = (props) => (
    <div className="tb-responsive">
        <table className="table table-borderless table-striped">
            <thead>
            <tr>
                <th>No.</th>
                <th>id Articulo</th>
                <th>Tipo de articulo</th>
                <th>Descripción</th>
                <th>Valor de adquisión	</th>
                <th>Fecha de registro</th>
                {/* <th>Fecha de actualización</th> */}
            </tr>
            </thead>
            <tbody>
            
            {props.articles.map((list, index) => {
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{list.id}</td>
                        <td>{list.typeAsset}</td>
                        <td>{list.description}</td>
                        <td>
                        {new Intl.NumberFormat('en-GB', { 
                        style: 'currency', 
                        currency: 'MXN',
                        minimumFractionDigits: 0, 
                        maximumFractionDigits: 0 
                        }).format(list.price)}
                        </td>
                        <td>
                        {new Intl.DateTimeFormat('en-GB', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit' 
                        }).format(list.dateAssign)}
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>
)

export default listArticles