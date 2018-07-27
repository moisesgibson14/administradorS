import React from 'react'
const listArtilesConciliation = (props) => (
    <div className="tb-responsive">
        <table className="table table-borderless table-striped">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Descripción</th>
                    <th>Precio Promedio</th>
                    <th>Existencia en Libros</th>
                    <th>Existencia Real</th>
                    <th>Discrepancia</th>
                    <th>Cargo</th>
                    <th>Abono</th>
                </tr>
            </thead>
            <tbody>
                {props.listGeneralAsset.map((list, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{list.name}</td>
                            <td>
                                {new Intl.NumberFormat('en-GB', {
                                    style: 'currency',
                                    currency: 'MXN',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(list.promedioG)}
                            </td>
                            <td>{list.existBook}</td>
                            <td>{list.ExistReal}</td>
                            <td>{list.Discrepancia}</td>
                            <td>
                                {new Intl.NumberFormat('en-GB', {
                                    style: 'currency',
                                    currency: 'MXN',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(list.cargo)}
                            </td>
                            <td>
                                {new Intl.NumberFormat('en-GB', {
                                    style: 'currency',
                                    currency: 'MXN',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(list.abono)}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
)

export default listArtilesConciliation