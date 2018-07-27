import React, { Component } from 'react'
import DatosActivo from './datosActivo'
import './styles.css'
import { log } from 'async';

class DataBasicInmueble extends Component {
	constructor(props) {
		super(props)
		this.state = {
			typeActive: [
				'AEROPUERTO',
				'ALMACÉN',
				'AUDITORIO',
				'BODEGA',
				'CASA',
				'CENTRO COMERCIAL',
				'CUARTO',
				'DEPARTAMENTO',
				'DESARROLLO INDUSTRIAL',
				'DESARROLLO INMOBILIARIO',
				'EDIFICIO',
				'ESCUELA',
				'ESTADIO',
				'FÁBRICA',
				'HACIENDA',
				'HOSPITAL',
				'LOCAL COMERCIAL',
				'MERCADO',
				'NAVE INDUSTRIAL',
				'OFICINA',
				'PALACIO MUNICIPAL',
				'PARCELA',
				'RANCHO',
				'TERRENO',
				'UNIDAD HABITACIONAL',
				'OTRO'
			],
			refresh: '',
			authorization: []
		}
		this.refresh = this.refresh.bind(this)
		this.authorization = this.authorization.bind(this)
		this.newInformation = this.newInformation.bind(this)
		this.deleteInformation = this.deleteInformation.bind(this)
	}

	componentWillMount() {
		this.props.inmueble.socialReason = this.props.owner.socialReason
		this.props.inmueble.idOwner = this.props.idPropietario
		this.authorization()
	}

	authorization() {
		this.state.authorization = []
		if (this.props.owner.estate.administration.authorization) {
			let newAuthorization = {
				label: 'ADMINISTRACIÓN',
				authorization: true
			}
			this.state.authorization = this.state.authorization.concat(newAuthorization)
		}

		this.props.owner.estate.services.map((service, index) => {
			if (service.authorization) {
				let newAuthorization = {
					label: service.label,
					authorization: service.authorization
				}
				this.state.authorization = this.state.authorization.concat(newAuthorization)
			}
		})

		this.refresh()
	}

	newInformation() {
		let nuevo = {
			cct: "",
			id: "",
			turn: "",
			name: "",
			director: "",
			typeService: "",
			stateService: "",
			other: {
				label: '',
				value: ''
			}
		}

		this.props.inmueble.states.basicInformation = this.props.inmueble.states.basicInformation.concat(nuevo)
		this.refresh()
	}

	deleteInformation(i) {
		this.props.inmueble.states.basicInformation.splice(i, 1)
		this.refresh()
	}

	refresh() {
		console.log(this.props.inmueble);

		this.setState({
			refresh: ''
		})
	}

	render() {
		return (
			<div className="property-sec wrap">
				{this.props.visibleDataBasic < 4 &&
					<div className="input-sates prop-act">
						<label id="basic-addon1">Tipo de activo<span>*</span></label>
						<select className="form-control" value={this.props.inmueble.typeOfAsset} onChange={(e) => { this.props.inmueble.typeOfAsset = e.target.value, this.authorization(), this.props.valueVisible.value = 4 }}>
							<option value="null" name="owner" >Seleccionar</option>
							{
								this.state.typeActive.map((activo, index) => {
									return (
										<option key={index} value={activo}>{activo}</option>
									)
								})
							}
						</select>
					</div>
				}
				{this.props.visibleDataBasic === 4 &&
					<div>
						{(this.props.inmueble.typeOfAsset) &&
							<div>
								<div>
									<div className="flex-sates">

										<div className="prop-left">
									<h3 className="subtitle-ind"> IDENTIFICADORES DEL ACTIVO </h3>
											<div className="input-sates">
												<label>ID INMUEBLE:</label >
												<input type="text" value={this.props.inmueble.idSates} readOnly />
											</div>

											{this.props.inmueble.states.basicInformation.map((information, index) => {
												return (
													<div key={index} className="prop-id">

														<div className="flex-sates">
															<select className="form-control select-id" value={information.id} onChange={(e) => { information.id = e.target.value, this.refresh() }}>
																<option value="null" name="owner" >Seleccione identificador</option>
																<option value="CCT">CCT</option>
																<option value="NUMERO DE INMUEBLE">NÚMERO DE INMUEBLE</option>
																<option value="NUMERO DE ESCRITURA">NÚMERO DE ESCRITURA</option>
															</select>
															{this.props.inmueble.states.basicInformation.length - 1 === index &&
																<div className="prop-id-btns">
																	<button className="" type="button" onClick={() => this.newInformation()} ><i className="fas fa-plus"></i></button>

																	{index > 0 &&
																		<button className="" type="button" onClick={() => this.deleteInformation(index)} ><i className="fas fa-minus"></i></button>
																	}
																</div>
															}
															{information.id &&
																<div className="prop-data-id">
																	<div className="input-sates">

																		<div className="input-sates">
																			<label id="basic-addon1">{information.id}</label>
																			<input type="text" value={information.valueId} onChange={(e) => { information.valueId = e.target.value.toUpperCase(), this.refresh() }} />
																		</div>

																		<div className="input-sates">
																			<label id="basic-addon1">Nombre del inmueble:</label>
																			<input type="text" value={information.name} onChange={(e) => { information.name = e.target.value.toUpperCase(), this.refresh() }} />
																		</div>

																		<div className="input-sates">
																			<label id="basic-addon1">Tipo de servicio:</label>
																			<input type="text" value={information.typeService} onChange={(e) => { information.typeService = e.target.value.toUpperCase(), this.refresh() }} />
																		</div>

																		<div className="input-sates">
																			<label id="basic-addon1">Servicio del inmueble:</label>
																			<input type="text" value={information.stateService} onChange={(e) => { information.stateService = e.target.value.toUpperCase(), this.refresh() }} />
																		</div>

																		<div className="input-sates">
																			<label id="basic-addon1">Turno:</label>
																			<input type="text" value={information.turn} onChange={(e) => { information.turn = e.target.value.toUpperCase(), this.refresh() }} />
																		</div>

																		<div className="input-sates">
																			<label id="basic-addon1">Responsable:</label>
																			<input type="text" value={information.director} onChange={(e) => { information.director = e.target.value.toUpperCase(), this.refresh() }} />
																		</div>

																		<div className="input-sates">
																			<input type="text" placeholder="Otro" value={information.other.label} onChange={(e) => { information.other.label = e.target.value.toUpperCase(), this.refresh() }} />
																		</div>
																		<div className="input-sates">
																			<input type="text" placeholder="Valor de otro" value={information.other.value} onChange={(e) => { information.other.value = e.target.value.toUpperCase(), this.refresh() }} />
																		</div>
																	</div>
																</div>
															}
														</div>
													</div>
												)
											})}
										</div>

										<div className="prop-rigth">
											<div className="type-id">
												{this.props.inmueble.ids.map((id, index) => {
													return (
														<div key={index} className="input-sates" >
															<input type="text" value={id.label} onChange={(e) => { id.label = e.target.value.toUpperCase(), this.refresh() }} placeholder={index + 1 + '. Tipo de identificador'} />
															<input type="text" value={id.value} onChange={(e) => { id.value = e.target.value.toUpperCase(), this.refresh() }} placeholder='Valor del identificador' />
														</div>
													)
												})}
											</div>
											<div className="input-sates">
												<label>ID GOBIERNO:</label>
												<input type="text" value={this.props.inmueble.states.idGoverment} onChange={(e) => { this.props.inmueble.states.idGoverment = e.target.value.toUpperCase(), this.refresh() }} />
											</div>
										</div>
									</div>
								</div>
							</div>
						}
						
					</div>
				}

						<DatosActivo
							inmueble={this.props.inmueble}
							authorization={this.state.authorization}
							selectTypeOfDestination={this.props.selectTypeOfDestination}
							{...this.props}
						/>

			</div>
		)
	}
}

export default DataBasicInmueble
