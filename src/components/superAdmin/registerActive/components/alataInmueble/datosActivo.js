import React, { Component } from 'react'
import sleep from 'then-sleep'
import servicePostal from '../../codigoPostal'
import UploadImage from './uploadImage'
import ExternalImages from './externalImages'
import MapContainer from './mapcontainer'
import { ToastContainer, toast } from 'react-toastify';
import { uploadFiles, deleteFiles } from '../../../../../uploadFiles'
import CutImage from '../../../../../cutImage'
import GoogleMaps from '../../common/googleMaps'
import states from '../../../../../states'
import axios from 'axios'
import { TextMask, InputAdapter } from 'react-text-mask-hoc';



class DatosActivo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			refresh: '',
			colonias: [],
			check: true,
			position: {},
			estados: [],
			map: false,
			upload: false,
			percentege: 0,
			file: '',
			archivo: '',
			asentamientos: [
				'AEROPUERTO',
				'AMPLIACIÓN',
				'BARRIO',
				'CANTÓN',
				'CIUDAD',
				'CIUDAD INDUSTRIAL',
				'COLONIA',
				'CONDOMINIO',
				'CONJUNTO HABITACIONAL',
				'CORREDOR INDUSTRIAL',
				'COTO',
				'CUARTEL',
				'EJIDO',
				'EXHACIENDA',
				'FRACCIÓN',
				'FRACCIONAMIENTO',
				'GRANJA',
				'HACIENDA',
				'INGENIO',
				'MANZANA',
				'PARAJE',
				'PARQUE INDUSTRIAL',
				'PRIVADA',
				'PROLONGACIÓN',
				'PUEBLO',
				'PUERTO',
				'RANCHERÍA',
				'RANCHO',
				'REGIÓN',
				'RESIDENCIAL',
				'RINCONADA',
				'SECCIÓN',
				'SECTOR',
				'SUPERMANZANA',
				'UNIDAD',
				'UNIDAD HABITACIONAL',
				'VILLA',
				'ZONA FEDERAL',
				'ZONA INDUSTRIAL',
				'ZONA MILITAR',
				'ZONA NAVAL'
			]

		}

		this.refresh = this.refresh.bind(this)
		// this.handleGPS = this.handleGPS.bind(this)
		this.assignPosition = this.assignPosition.bind(this)
		this.getPosition = this.getPosition.bind(this)
		this.fileSave = this.fileSave.bind(this)
		this.saveImage = this.saveImage.bind(this)
	}

	componentWillMount() {

		if (this.props.edit) {
			this.getPosition()
		}

		states(estados => {
			this.setState({
				estados
			})
		})
	}

	refresh() {
		console.log(this.props.inmueble);

		this.setState({
			refresh: ''
		})
	}

	assignPosition() {
		this.props.inmueble.states.location.lng = this.state.position.lng
		this.props.inmueble.states.location.lat = this.state.position.lat
		this.setState({
			refresh: ''
		})
	}

	getPosition() {

		this.setState({ map: false })

		if (this.props.inmueble.states.location.lng && this.props.inmueble.states.location.lat) {

			this.state.position.lng = this.props.inmueble.states.location.lng
			this.state.position.lat = this.props.inmueble.states.location.lat

			this.setState({
				map: true
			})
		} else {
			let location = this.props.inmueble.states.location
			let direction = location.CP + ' ' + location.street + location.nExterno + ' ' + location.colony + ' ' + location.municipality + ' ' + location.country

			axios.get('https://maps.google.com/maps/api/geocode/json?address=' + direction).then(data => {
				console.log(data.data.results)

				if (data.data.results.length === 0) {
					return toast('No se encontro la dirección');
				} else {

					this.setState({
						position: data.data.results[0].geometry.location,
						map: true
					})
					this.assignPosition()

				}
			}).catch(error => console.log('error al solicitar', error))
		}
	}

	fileSave(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file,
				archivo: reader.result
			});
		}

		reader.readAsDataURL(file)
	}

	saveImage(image) {
		console.log(this.props);
		this.props.inmueble.mainPhoto = image
		this.setState({
			archivo: ''
		})
	}

	render() {
		const containerStyle = {
			zIndex: 1999
		};
		return (
			<div>
				{this.props.visibleDataBasic === 4 &&
					<div className="prop-location">
						<ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
						<h3 className="subtitle-ind "> UBICACIÓN </h3>
						<div className=" flex-sates">

							<div className="input-sates">
								<label>Código Postal:</label>
								<input type="number" min="0" value={this.props.inmueble.states.location.CP} onChange={(e) => { this.props.inmueble.states.location.CP = e.target.value, this.setState({ refresh: '' }) }} />
							</div>

							<div className="input-sates">
								<label>Calle:</label>
								<input type="text" value={this.props.inmueble.states.location.street} onChange={(e) => { this.props.inmueble.states.location.street = e.target.value.toUpperCase(), this.refresh() }} />
							</div>

							<div className="input-sates">
								<label>No. Exterior:</label>
								<input type="number" min="0" value={this.props.inmueble.states.location.nExterno} onChange={(e) => { this.props.inmueble.states.location.nExterno = e.target.value.toUpperCase(), this.refresh() }} />
							</div>

							<div className="input-sates">
								<label>No. Interior:</label>
								<input type="number" min="0" value={this.props.inmueble.states.location.nInterno} onChange={(e) => { this.props.inmueble.states.location.nInterno = e.target.value.toUpperCase(), this.refresh() }} />
							</div>

							<div className="input-sates">
								<label>Colonia:</label>
								<input type="text" value={this.props.inmueble.states.location.colony} onChange={(e) => { this.props.inmueble.states.location.colony = e.target.value.toUpperCase(), this.setState({ refresh: "" }) }} />
							</div>

							<div className="input-sates">
								<label>Tipo de asentamiento:</label>
								{/* <input type="text" value={this.props.inmueble.states.location.typeOfSettlement} className="form-control uppercase" placeholder="Tipo de asentamiento" onChange={(e) => { this.props.inmueble.states.location.typeOfSettlement = e.target.value.toUpperCase(), this.refresh() }} /> */}
								<select name="" id="" value={this.props.inmueble.states.location.typeOfSettlement} className="form-control uppercase" onChange={(e) => { this.props.inmueble.states.location.typeOfSettlement = e.target.value.toUpperCase(), this.refresh() }} >
									<option value='' >SELECCIONAR OPCIÓN</option>
									{this.state.asentamientos.map((asentamiento, index) => {
										return (
											<option key={index} value={asentamiento}>{asentamiento}</option>
										)
									})}
								</select>
							</div>


							<div className="input-sates">
								<label>Municipio/Delegación:</label>
								<input type="text" value={this.props.inmueble.states.location.municipality} onChange={(e) => { this.props.inmueble.states.location.municipality = e.target.value.toUpperCase(), this.refresh() }} />
							</div>

							<div className="input-sates">
								<label>Estado:</label>
								<select value={this.props.inmueble.states.location.state} className="form-control" onChange={(e) => { this.props.inmueble.states.location.state = e.target.value.toUpperCase(), this.refresh() }}>
									<option value="null" name="owner" >Seleccione el estado</option>
									{this.state.estados.map((estado, index) => {
										return (
											<option key={index} value={estado.Abreviacion}>{estado.Estado}</option>
										)
									})}
								</select>
							</div>


							<div className="input-sates">
								<label>País:</label>
								<input type="text" value={this.props.inmueble.states.location.country} readOnly onChange={(e) => { this.props.inmueble.states.location.country = e.target.value.toUpperCase(), this.refresh() }} />
							</div>


							<div className="input-sates">
								<label>Longitud:</label>
								<input type="number" readOnly value={this.props.inmueble.states.location.lng} aria-label="codigoPostal" aria-describedby="basic-addon1" onChange={(e) => { this.props.inmueble.states.location.lng = e.target.value, this.setState({ refresh: "" }) }} />
							</div>

							<div className="input-sates">
								<label>Latitud:</label>
								<input type="bumber" readOnly value={this.props.inmueble.states.location.lat} aria-label="codigoPostal" aria-describedby="basic-addon1" onChange={(e) => { this.props.inmueble.states.location.lat = e.target.value, this.setState({ refresh: "" }) }} />
							</div>

							<div className="input-sates">
								<button type="button" className="btn-map" onClick={() => this.getPosition()}>Ubicar en mapa</button>
								{!this.state.map &&
									<small>{(this.props.edit) ? 'Error al cargar mapa, intente de nuevo' : 'Llene todos los campos para ver el mapa'}</small>
								}
							</div>
							{this.state.map &&
								<div className="map-container">
										<GoogleMaps
											position={this.state.position}
											refresh={this.assignPosition}
										/>
								</div>
							}

						</div>

						<h3 className="subtitle-ind act-subt"> DATOS DEL ACTIVO </h3>

						<div className="flex-sates">
							<div className="input-sates">
								<label>Título:<span>*</span></label>
								<input type="text"
									value={this.props.inmueble.title}
									onChange={(e) => { this.props.inmueble.title = e.target.value.toUpperCase(), this.props.refresh() }}
								/>
							</div>

							<div className="input-sates">
								<label> Superficie de terreno:</label>
								<TextMask
									mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, 'm²']}
									Component={InputAdapter}
									placeholder="m²"
									value={this.props.inmueble.states.assetData.superficieTerreno}
									onChange={(e) => { this.props.inmueble.states.assetData.superficieTerreno = e.target.value, this.refresh() }}
								/>
							</div>
							<div className="input-sates">
								<label>Superficie de construcción:</label>
								<TextMask
									mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, 'm²']}
									Component={InputAdapter}
									placeholder="m²"
									value={this.props.inmueble.states.assetData.superficieConstrucion}
									onChange={(e) => { this.props.inmueble.states.assetData.superficieConstrucion = e.target.value, this.refresh() }}
								/>
							</div>
							<div className="input-sates">
								<label> Indiviso:</label>
								<TextMask
									mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, 'm²']}
									Component={InputAdapter}
									placeholder="m²"
									value={this.props.inmueble.states.assetData.indiviso}
									onChange={(e) => { this.props.inmueble.states.assetData.indiviso = e.target.value, this.refresh() }}
								/>
							</div>

							<div className="input-sates">
								<label>Antiguedad de construción:</label>
								<input type="number" placeholder="Años" value={this.props.inmueble.states.assetData.antiguedadConstrucion} onChange={(e) => { this.props.inmueble.states.assetData.antiguedadConstrucion = e.target.value, this.refresh(), this.props.valueVisible.value = 5 }} />
							</div>

						</div>
					</div>
				}





				{this.props.visibleDataBasic === 5 &&
					<div className="prop-document">
						<div>
							<h3 className="subtitle-ind">DOCUMENTACIÓN</h3>
							<UploadImage
								propietario={this.props.inmueble.states.administration}
								refresh={this.refresh}
							/>
							<div className="prop-img-doc">
								<span className="subtitle-prop">IMÁGENES EXTERNAS</span>
									<label className="switch switch-text switch-pill switch-primary-outline switch-user">
									<input type="checkbox" className="switch-input" checked={this.props.inmueble.states.extImages} onChange={(e) => { this.props.inmueble.states.extImages = e.target.checked, this.refresh() }} />
									<span className="switch-label" data-on="on" data-off="off" ></span>
									<span className="switch-handle"></span>
								</label>
							</div>
							{this.props.inmueble.states.extImages &&
								<ExternalImages
									images={this.props.inmueble.states.imagesHigh}
									refresh={this.refresh}
								/>
							}
							<div className="prop-photo">
								<h3 className="subtitle-ind">FOTO Y VIDEO</h3>
								<div className="flex-sates">
									<div className="input-sates">
										<label>Video</label>
										<input type="text" placeholder="Link" value={this.props.inmueble.states.video} onChange={(e) => { this.props.inmueble.states.video = e.target.value, this.refresh() }} />
										{this.props.inmueble.states.video &&
											<a data-fancybox href={this.props.inmueble.states.video}>
												<button type="button" className="btn-video" ><i className="fab fa-youtube" aria-hidden="true"></i></button>
											</a>
										}
									</div>
									<div className="input-sates">
										<input type="file" accept=".jpg, .jpeg, .png" id="mainPhoto" style={{ display: 'none' }} onChange={(e) => this.fileSave(e)} />
										<label htmlFor="mainPhoto" className="main-photo" >FOTO PRINCIPAL</label>
										{this.props.inmueble.mainPhoto &&
											<a href={this.props.inmueble.mainPhoto} data-fancybox>
												<button type="button" className=""><i className="fa fa-eye" aria-hidden="true"></i></button>
											</a>
										}
									</div>
									{this.state.archivo &&
										<CutImage
											saveFile={this.saveImage}
											state={this.state}
											refresh={this.refresh}
										/>
									}
									{this.state.upload &&
										<div className="progress">
											<div className="progress-bar progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>
												{/* {this.state.percentege}% */}
											</div>
										</div>
									}
								</div>
							</div>
						</div>
						
						<div className="prop-footer flex-sates">
							<div className="input-sates">
								<label>Observaciones:</label>
								<input type="text" value={this.props.inmueble.states.observations} onChange={(e) => { this.props.inmueble.states.observations = e.target.value.toUpperCase(), this.refresh() }} />
							</div>
							<div className="input-sates">
								<label> Destino<span>*</span></label>
								<select className="form-control" value={this.props.inmueble.destination} onChange={(e) => { this.props.inmueble.destination = e.target.value, this.props.selectTypeOfDestination(), this.props.refresh() }}>
									<option value="null" name="owner" >Seleccionar</option>
									{
										this.props.authorization.map((aut, index) => {
											return (
												<option key={index} value={aut.label}>{aut.label}</option>
											)
										})
									}
								</select>
							</div>
							{this.props.inmueble.destination === 'ADMINISTRACIÓN' &&
								<div className="input-sates">
									<label> Revisión cada:</label>
									{/* <input type="number" min="0" placeholder="Días naturales" className="form-control" value={this.props.inmueble.reviewDays} onChange={(e) => { this.props.inmueble.reviewDays = e.target.value, this.refresh() }} /> */}
									<select name="" id="" className="form-control" value={this.props.inmueble.reviewDays} onChange={(e) => { this.props.inmueble.reviewDays = e.target.value, this.refresh() }} >
										<option value="">Seleccione una opcion</option>
										<option value="1">DIARIO</option>
										<option value="7">SEMANAL</option>
										<option value="15">QUINCENAL</option>
										<option value="30">MENSUAL</option>
										<option value="90">TRIMESTRAL</option>
										<option value="180">SEMESTRAL</option>
										<option value="360">ANUAL</option>
									</select>
								</div>
							}
							</div>
					</div>
				}
			</div>


		)

	}
}

export default DatosActivo