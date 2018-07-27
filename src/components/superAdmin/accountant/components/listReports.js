import React from 'react'

const ListReports = (props) => (
    <div className="">
        <div className="reportHead flex-sates">
            <label className="no-print"><span>Responsable:</span>{props.assetSelected.name}</label>
            <div>
                <label htmlFor=""><span>Numero de reporte:</span>5836</label>
                <label htmlFor=""><span>Fecha:</span>
                {new Intl.DateTimeFormat('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(props.assetSelected.date)}
                </label>
            </div>
        </div>
        <div className="wrap-table">
            <table className="accountant-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">cct</th>
                        <th scope="col">Número de cuenta</th>
                        <th scope="col">Activo</th>
                        <th scope="col">Existencia en libros</th>
                        <th scope="col">Existencia Real</th>
                        <th scope="col">Discrepancia</th>
                        <th scope="col">Precio Promedio</th>
                        <th scope="col">Cargo</th>
                        <th scope="col">Abono</th>
                    </tr>
                </thead>
                <tbody>
                    {props.assetSelected.list.map((list, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{list.cct}</td>
                                <td>{list.noCount}</td>
                                <td>{list.asset}</td>
                                <td>{list.countB}</td>
                                <td>{list.countR}</td>
                                <td>{list.discrepancy}</td>
                                <td>
                                    {new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: 'MXN',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(list.price)}
                                </td>
                                <td>
                                {new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: 'MXN',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                }).format(list.charge)}
                                </td>
                                <td>
                                {new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: 'MXN',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                }).format(list.payment)}
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td> 
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                            <strong>Total:</strong>
                        {new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: 'MXN',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                }).format(props.assetSelected.reportChargeTotal)}
                        </td>
                        <td> <strong>Total:</strong>
                        {new Intl.NumberFormat('en-GB', {
                                        style: 'currency',
                                        currency: 'MXN',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                }).format(props.assetSelected.reportsPaymentTotal)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="btnPrint">
            <button className="btn btn-primary no-print" onClick={()=> props.print()}>Imprimir</button>
        </div>
    </div>
)
export default ListReports