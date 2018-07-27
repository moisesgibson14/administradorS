import React, { Component } from 'react'

const TableAssets = (props) => (
   <div className="tableWrap"> 
		<h4 className="tableTitle">Tabla de activos</h4>
			<div className="TableAssets">
				{props.dataAssets.length > 0 &&
					<table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Precio</th>
								<th>Marca</th>
								<th>Modelo</th>
								<th>Ver activo</th>
							</tr>
						</thead>
						<tbody>
							{props.dataAssets.map((asset, index) => {
								return (
									<tr key={index} >
										<td>{asset.name}</td>
										<td>{asset.price}</td>
										<td>{asset.brand}</td>
										<td>{asset.model}</td>
										<td><button type="button" className="btn"><i className="fa fa-eye" aria-hidden="true"></i></button></td>
									</tr>
								)
							})}
						</tbody>
					</table>
				}
      </div>

		{props.dataAssets.length === 0 &&
				<h3>No hay activos</h3>
		}
	</div>
)

export default TableAssets