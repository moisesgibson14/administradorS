import React, { Component } from 'react'
import { FormGroup, InputGroup, InputGroupAddon, Button, Row, Container, Col, Card, CardBody, CardHeader } from 'reactstrap'
import swal from 'sweetalert'
import { modelAsset } from './modelAsset'
import Cryptr from 'cryptr'
var cryptr = new Cryptr('satesSeguro8102')
import DataBasicInmueble from './components/alataInmueble/dataBasic'
import { hashHistory } from 'react-router'
import { Link } from 'react-router-dom'
import inmueble from './components/alataInmueble/modeloInmueble'
import firebase, { firestore } from 'firebase'
import AltaMueble from './components/altaMueble/'
import dateformat from 'dateformat'
import dbDos from '../../../secondDB';
import $ from 'jquery'

export default class RegisterActive extends Component {
	constructor() {
		super()
		this.state = {
			active: '',
			owners: [],
			refresh: '',
			authorized: [],
			owner: '',
			edit: false,
			saveActive: false,
			events: [],
			eventSelected: [],
			warranty: [],
			lotAvailable: false,
			noAccessToInsertLot: false,
			saveSubmitActive: false,
			numberLotTemp: 0,
			stepActive: 'step-active',
			visibleDataBasic: 0,
			readySave: false,
			valueVisible: {
				value: 0
			}
		}
		this.handleOnSubmit = this.handleOnSubmit.bind(this)
		this.handleSaveValue = this.handleSaveValue.bind(this)
		this.handleOwnerSelectd = this.handleOwnerSelectd.bind(this)
		this.refresh = this.refresh.bind(this)
		this.numberLot = this.numberLot.bind(this)
		this.numberEvent = this.numberEvent.bind(this)
		this.selectSteps = this.selectSteps.bind(this)
		this.optionDeposito = this.optionDeposito.bind(this)
		this.next = this.next.bind(this)
		this.selectTypeOfDestination = this.selectTypeOfDestination.bind(this)
	}

	componentDidMount() {
		let authorization = JSON.parse(localStorage.getItem('userAthorization'))
		authorization.forEach((element, index) => {
			if (element.label === "Activos" && element.value == true) {
				this.setState({
					statusAuthorization: true
				})
			}
		});
		if (this.props.match.params.id) {
			this.setState({ edit: true })
			firestore().collection('assets').doc(this.props.match.params.id).onSnapshot(snap => {
				firestore().collection('usersOwner').where('idOwner', '==', snap.data().idOwner).onSnapshot(data => {
					data.forEach(owner => {
						this.state.owner = owner.data()
						this.refresh()
						this.handleOwnerSelectd()
					})
				})
				this.setState({ active: snap.data() })
				this.refresh()
			})
			dbDos.firestore().collection("events").onSnapshot((modelEvents) => {
				this.state.events = []
				modelEvents.forEach((doc) => {
					this.state.events.push({ ...doc.data(), id: doc.id })
				});
				if (this.state.active.furniture.vehicle.Subasta.eventNumber) {
					this.numberEvent(this.state.active.furniture.vehicle.Subasta.eventNumber)
					this.refresh()
				}
				this.refresh()
			});
		} else {
			modelAsset(data => {
				data.idSates = data.idSates.toString()
				if (data) {
					this.setState({
						active: data
					})
					this.refresh()
				}
			})
			var db = firestore()
			var doc = dbDos.firestore().collection("events").onSnapshot((modelEvents) => {
				this.state.events = []
				modelEvents.forEach((doc) => {
					this.state.events.push({ ...doc.data(), id: doc.id })
				});
				this.refresh()
			});
		}
		firestore().collection('usersOwner').onSnapshot(snap => {
			let ownersTMP = []
			snap.forEach(owner => {
				ownersTMP.push({ ...owner.data() })
			})
			this.setState({ owners: ownersTMP })
		})	
	}
	numberLot(number) {
		if (number.length === 0) {
			this.setState({
				lotAvailable: false,
			})
		}
		if (this.state.eventSelected.length !== 0) {
			if (this.state.eventSelected.lots.length > 0) {
				this.state.active.furniture.vehicle.Subasta.lot = parseInt(number)
				this.state.numberLotTemp = number
				this.state.noAccessToInsertLot = false
				this.state.eventSelected.lots.forEach(element => {
					if (element === number) {
						this.state.noAccessToInsertLot = true
						this.setState({
							lotAvailable: true,
						})
					}
				});
				if (this.state.noAccessToInsertLot === false) {
					this.setState({
						lotAvailable: false,
					})
				}
			} else {
				this.state.active.furniture.vehicle.Subasta.lot = parseInt(number)
				this.state.numberLotTemp = number
				this.setState({
					lotAvailable: false,
				})
			}
		} else {
			this.setState({
				lotAvailable: false,
			})
		}
	}
	numberEvent(valor) {
		if (valor) {
			this.state.events.forEach(event => {
				if (event.numberEvent == valor) {
					this.state.eventSelected.lots = []
					this.state.warranty = []
					this.state.eventSelected = event
					//   this.state.eventSelected.lots.push('1','4','5','6','7')
					this.state.active.furniture.vehicle.Subasta.eventNumber = event.numberEvent
					this.state.active.furniture.vehicle.Subasta.typeOfAuction.value = event.typeEvent
					this.state.active.furniture.vehicle.Subasta.eventTitle = event.titleEvent
					this.state.active.furniture.vehicle.Subasta.locationEvent.value = event.location.titleLocation
					this.state.active.furniture.vehicle.Subasta.coin.value = event.currencyExchangeRate
					this.state.active.furniture.vehicle.Subasta.exchangeRate = event.exchangeRate
					this.state.active.furniture.vehicle.Subasta.eventDate = event.dateStartEvent
					event.warranty.forEach(element => {
						this.state.warranty.push(element)
					});
					this.refresh()
				}
			});
		} else {
			this.state.active.furniture.vehicle.Subasta.typeOfAuction.value = 'No se ha elegido un número'
			this.state.active.furniture.vehicle.Subasta.eventTitle = 'No se ha elegido un número'
			this.state.active.furniture.vehicle.Subasta.locationEvent.value = 'No se ha elegido un número'
			this.state.warranty = []
			this.state.eventSelected = []
		}
	}
	handleSaveValue(e) {
		this.state.owner = e.target.value
		this.handleOwnerSelectd()
	}
	handleOnSubmit() {
		this.loading(true)
		if (this.state.edit) {
			firestore().collection('assets').doc(this.props.match.params.id).update(this.state.active).then(() => {
				swal("Muy bien!", "Datos actualizados correctamente ", "success", {
					timer: 2000,
				});
				if (this.state.eventSelected.id) {
					this.state.eventSelected.lots.push(this.state.numberLotTemp)
					dbDos.firestore().collection('events').doc(this.state.eventSelected.id).update(this.state.eventSelected).then(() => {
					}).catch(err => swal("revisión", "No se guardo correctamente", "error"))
					this.refresh()
				}
				this.loading(false)
				return hashHistory.push('/assets')
			})
		} else {
			if (this.state.eventSelected.id) {
				this.state.eventSelected.lots.push(this.state.numberLotTemp)
				dbDos.firestore().collection('events').doc(this.state.eventSelected.id).update(this.state.eventSelected).then(() => {
				}).catch(err => swal("revisión", "No se guardo correctamente", "error"))
				this.refresh()
			}
			this.state.active.idSates = this.state.active.idSates.toString()
			let active = this.state.active
			firestore().collection('assets').add(active).then((data) => {
				this.loading(false)
				swal({
					title: "Activo guardado correctamente",
					text: "¿Quieres dar de alta otro activo?",
					icon: "warning",
					buttons: ['NO', 'SI'],
					dangerMode: true,
				})
					.then((willDelete) => {
						if (willDelete) {
							modelAsset(data => {
								data.idSates = data.idSates.toString()
								if (data) {
									this.setState({ active: data })
								}
							})
						} else {
							return hashHistory.push('/assets')
						}
					})
			}).catch(error => console.log(error))
		}
	}

	handleOwnerSelectd() {
		let owner = this.state.owner
		this.state.authorized = []
		this.refresh()
		if (this.state.edit) {
			if (owner.furnitures.authorization) {
				let newAuthorized = {
					label: 'MUEBLES',
					authorized: true
				}
				this.state.authorized = this.state.authorized.concat(newAuthorized)
			}
			if (owner.estate.authorization) {
				let newAuthorized = {
					label: 'INMUEBLES',
					authorized: true
				}
				this.state.authorized = this.state.authorized.concat(newAuthorized)
			}
			this.refresh()
		} else {
			this.state.owners.map((owner, index) => {
				if (owner.socialReason === this.state.owner) {
					this.state.owner = owner
					if (this.state.owner.furnitures.authorization) {
						let newAuthorized = {
							label: 'MUEBLES',
							authorized: true
						}
						this.state.authorized = this.state.authorized.concat(newAuthorized)
					}
					if (this.state.owner.estate.authorization) {
						let newAuthorized = {
							label: 'INMUEBLES',
							authorized: true
						}
						this.state.authorized = this.state.authorized.concat(newAuthorized)
					}
					this.refresh()
				}
			})
		}
		this.refresh()
	}
	refresh() {
		this.setState({ refresh: '' })
		this.validateSaveActive()
		console.log(this.state);
	}
	validateSaveActive() {
		let active = this.state.active
		if (active.kindOfGood === 'MUEBLES' && active.typeOfAsset && active.title && active.destination) {
			if (active.furniture.vehicle.year && active.furniture.vehicle.brand && active.furniture.vehicle.model && active.reviewDays) {
				if (active.destination === 'VENTA DIRECTA') {
					let ventaDirecta = active.furniture.vehicle.directSale
					if (ventaDirecta.documentaryStatus.value && ventaDirecta.lot && ventaDirecta.coin.value && ventaDirecta.salePrice && ventaDirecta.lotStatus.value) {
						this.setState({
							saveActive: true
						})
					} else {
						this.setState({
							saveActive: false
						})
					}
				} else if (active.destination === 'SUBASTA') {
					let subasta = active.furniture.vehicle.Subasta
					if (subasta.DocumentaryStatusAsset.value && subasta.eventNumber && subasta.lot && subasta.warrantyColor && subasta.coin.value && subasta.startingPrice && subasta.lotStatus.value && !this.state.noAccessToInsertLot) {
						this.setState({
							saveActive: true
						})
					} else {
						this.setState({
							saveActive: false
						})
					}
				} else {
					this.setState({
						saveActive: true
					})
				}
			} else {
				this.setState({
					saveActive: false
				})
			}
		} else if (active.kindOfGood === 'INMUEBLES' && active.typeOfAsset && active.title && active.destination) {
			this.setState({
				saveActive: true
			})
		} else {
			this.setState({
				saveActive: false
			})
		}
	}
	loading(loading) {
		if (loading) {
			$(document).ready(function () {
				$('.loading').css({ 'display': 'block' })
			})
		} else {
			$(document).ready(function () {
				$('.loading').css({ 'display': 'none' })
			})
		}
	}

	next() {
		console.log(this.state.valueVisible.value);
		console.log('entro aqui');

		this.setState({
			visibleDataBasic: this.state.valueVisible.value,
		})
		console.log(this.state);

		if (this.state.active.destination === "SUBASTA" || this.state.active.destination === "VENTA DIRECTA") {
			this.setState({
				readySave: true
			})
		}
	}

	selectSteps(number) {
		this.setState({
			visibleDataBasic: number
		})
	}

	selectTypeOfDestination() {
		console.log('entro');

		if (this.state.active.destination == "ADMINISTRACIÓN") {
			this.setState({
				readySave: true
			})
		} else if (this.state.active.destination == "SUBASTA" && this.state.active.kindOfGood == "MUEBLES") {
			this.state.valueVisible.value = 6
			this.setState({
				readySave: false
			})
		} else if (this.state.active.destination == "VENTA DIRECTA" && this.state.active.kindOfGood == "MUEBLES") {

			this.state.valueVisible.value = 7
			this.setState({
				readySave: false
			})
		} else if (this.state.active.destination == "SUBASTA" && this.state.active.kindOfGood == "INMUEBLES") {
			this.setState({
				readySave: true
			})
		} else if (this.state.active.destination == "VENTA DIRECTA" && this.state.active.kindOfGood == "INMUEBLES") {
			this.setState({
				readySave: true
			})
		}
	}

	selectNumberOptions(option) {
		if (option == 0) {
			this.state.valueVisible.value = 0
			this.setState({
				visibleDataBasic: this.state.valueVisible.value,
			})
		} else if (option == 1) {
			if (this.state.active.kindOfGood == "MUEBLES") {
				if (this.state.active.typeOfAsset) {
					this.state.valueVisible.value = 1
					this.setState({
						visibleDataBasic: this.state.valueVisible.value,
					})
				}
			} else {
				if (this.state.active.typeOfAsset && this.state.active.kindOfGood == "INMUEBLES") {
					this.state.valueVisible.value = 4
					this.setState({
						visibleDataBasic: this.state.valueVisible.value,
					})
				}
			}
		} else if (option == 2) {
			if (this.state.active.kindOfGood == "MUEBLES") {
				if (this.state.active.furniture.vehicle.year) {
					this.state.valueVisible.value = 2
					this.setState({
						visibleDataBasic: this.state.valueVisible.value,
					})
				}
			} else if (this.state.active.kindOfGood == "INMUEBLES") {
				if (this.state.active.idSates) {
					this.state.valueVisible.value = 5
					this.setState({
						visibleDataBasic: this.state.valueVisible.value,
					})
				}
			}
		} else if (option == 6) {
			this.state.valueVisible.value = 6
			this.setState({
				visibleDataBasic: this.state.valueVisible.value,
			})
		} else if (option == 7) {
			this.state.valueVisible.value = 7
			this.setState({
				visibleDataBasic: this.state.valueVisible.value,
			})
		}
	}

	optionDeposito(){
		if(this.state.active.deposito.option === true){
			this.state.active.deposito.value = this.state.owner.socialReason
			this.state.active.deposito.clabe = this.state.owner.bankAccounts[0].clabe
			this.state.active.deposito.bank = this.state.owner.bankAccounts[0].nameBank
			this.state.active.deposito.noCuenta = this.state.owner.bankAccounts[0].numberAccount
			this.state.active.deposito.noReference = this.state.owner.bankAccounts[0].noReference
		}
	}

	render() {

		let { owners, active, authorized, areas, owner, assetType, visibleDataBasic, readySave } = this.state
		let events = this.state.events
		let saveSubmitActive = this.state.saveSubmitActive
		// console.log('AQUI ESTOY 0',this.state.warranty);
		if (active !== '') {
			if (active.furniture['vehicle'].Subasta['warrantyColor'].value !== '') {
				// this.state.warranty = active.furniture['vehicle'].Subasta['warrantyColor'].value
			}
			if(owner){
				// active.deposito.value = owner.socialReason
				// this.refresh()
			}
		}
		if (active === '') return <h5>Cargando...</h5>
		if (this.state.edit) {
			if (owner === '') return <h5>Cargando propietario...</h5>
		}
		if (!this.state.statusAuthorization) return <h5>NO TIENES PERMISOS</h5>
		return (
			<div>
				<section className="active-high">
					{/* <h2><span onClick={()=> { this.backToPrincipal()}}><i className="fas fa-arrow-left accountantArrow"></i></span>Alta de Activo</h2> */}


					<div className="headerSections flex-sates">
						<h2><Link to={'/assets'} className=""><span><i className="fas fa-arrow-left accountantArrow"></i></span></Link>Alta de Activo</h2>
					</div>

					<div className="wrapper">
						<div className="high-steps">
							<ul className="flex-sates">
								<li onClick={() => this.selectNumberOptions(0)} className={(visibleDataBasic >= 0) ? this.state.stepActive : ''}><span>Tipo activo</span></li>
								<li onClick={() => this.selectNumberOptions(1)} className={(visibleDataBasic >= 1) ? this.state.stepActive : ''}><span>Datos básicos</span></li>
								<li onClick={() => this.selectNumberOptions(2)} className={(visibleDataBasic >= 2) ? this.state.stepActive : ''}><span>Documentación</span></li>
								{this.state.active.destination === "SUBASTA" &&
									<li onClick={() => this.selectNumberOptions(6)} className={(visibleDataBasic >= 6) ? this.state.stepActive : ''}><span>Subasta</span></li>
								}
								{this.state.active.destination === "VENTA DIRECTA" &&
									<li onClick={() => this.selectNumberOptions(7)} className={(visibleDataBasic >= 7) ? this.state.stepActive : ''}><span>Venta directa</span></li>
								}
							</ul>
							<small>Nota: Las etiquetas marcadas con " * " son obligatorias para completar el alta de activo</small>
						</div>
						<form className="flex-sates">
							<div className={(visibleDataBasic === 0) ? 'high-left flex-sates' : ''}>
								{visibleDataBasic === 0 &&

									<div>
										{
											this.state.edit &&
											<div className="row">
												<div className="col-md-12">
													<div className="alert alert-success text-center" role="alert">
														<strong>Fecha de creación: {dateformat(active.creationDate, 'dd/mm/yy - h:MM:ss TT')}</strong>
													</div>
												</div>
											</div>
										}

										<div className="input-sates">
											<label htmlFor="">Propietario: <span>*</span></label>
											<select className="form-control" value={active.socialReason} onChange={(e) => { this.handleSaveValue(e), active.socialReason = e.target.value }}>
												<option value="" name="owner" >Seleccionar</option>
												{
													owners.map((owner, index) => (
														<option key={index} value={owner.socialReason}>{owner.socialReason}</option>
													))
												}
											</select>
										</div>

										<div className="input-sates">
											<label htmlFor="">Tipo de bien: <span>*</span></label>
											<select className="form-control" value={active.kindOfGood} onChange={(e) => { active.kindOfGood = e.target.value, this.refresh() }} >
												<option value="null" name="owner" >Seleccionar</option>
												{
													authorized.length > 0 &&
													authorized.map((check, index) => {
														return (
															<option key={index} value={check.label}>{check.label}</option>
														)
													})
												}
												{
													authorized.length <= 0 &&
													<option disabled value="null">No tiene habilitados servicios en el contrato</option>
												}
											</select>
										</div>
									</div>

								}
								{(this.state.active.kindOfGood === 'INMUEBLES') &&
									<DataBasicInmueble
										inmueble={this.state.active}
										refresh={this.refresh}
										idPropietario={this.state.owner.idOwner}
										owner={this.state.owner}
										edit={this.state.edit}
										visibleDataBasic={this.state.visibleDataBasic}
										valueVisible={this.state.valueVisible}
										selectTypeOfDestination={this.selectTypeOfDestination}
									/>
								}
								{(this.state.active.kindOfGood === 'MUEBLES') &&
									<AltaMueble
										active={this.state.active}
										refresh={this.refresh}
										owner={this.state.owner}
										edit={this.state.edit}
										events={events}
										numberLot={this.numberLot}
										numberEvent={this.numberEvent}
										warranty={this.state.warranty}
										lotAvailable={this.state.lotAvailable}
										selectSteps={this.selectSteps}
										visibleDataBasic={this.state.visibleDataBasic}
										valueVisible={this.state.valueVisible}
										selectTypeOfDestination={this.selectTypeOfDestination}
									/>
								}
							</div>

							{visibleDataBasic === 0 && active.socialReason &&
								<div className="high-right flex-sates">
									<h5>Depositar a proveedor:</h5>
									<label className="switch switch-text switch-primary-outline-alt switch-user">
										<input type="checkbox" className="switch-input"
											checked={this.state.active.deposito.option}
											onChange={(e) => { this.state.active.deposito.option = e.target.checked, this.refresh(), this.optionDeposito()  }}
										/>
										<span className="switch-label" data-on="On" data-off="Off"></span>
										<span className="switch-handle"></span>
									</label>

									{
										!this.state.active.deposito.option &&
										<div className="provMessage">
											<strong>Para poder Depositar a un proveedor es necesario:</strong>
											<ul>
												<li>Nombre del propietario</li>
												<li>Nombre del banco</li>
												<li>Clave interbancaria (18 dígitos)</li>
												<li>Número de cuenta</li>
												<li>Número de referencia</li>
											</ul>
										</div>
									}

									{this.state.active.deposito.option &&
										<div className="flex-sates provInfo" >
											<div className="input-sates">
												<label htmlFor="">Depositar a:</label>
												<input value={active.deposito.value}  disabled="true" type="text" />
												{
													!active.deposito &&
													<p className="textDanger">Dato requerido *</p>
												}
											</div>

											<div className="input-sates">
												<label htmlFor="">Banco</label>
												<input value={active.deposito.bank} disabled="true" type="text" />
												{
													!active.deposito.bank &&
													<p className="textDanger">Dato requerido *</p>
												}
											</div>

											<div className="input-sates">
												<label htmlFor="">Clabe interbancaria</label>
												<input  value={active.deposito.clabe} disabled="true" type="text" />
												{
													!active.deposito.clabe &&
													<p className="textDanger">Dato requerido *</p>
												}
											</div>

											<div className="input-sates">
												<label htmlFor="">Número de Cuenta</label>
												<input  value={active.deposito.noCuenta} disabled="true" type="text" />
												{
													!active.deposito.noCuenta &&
													<p className="textDanger">Dato requerido *</p>
												}
											</div>

											<div className="input-sates">
												<label htmlFor="">Número de Referencia</label>
												<input  value={active.deposito.noReference} disabled="true" type="text" />
												{
													!active.deposito.noReference &&
													<p className="textDanger">Dato requerido *</p>
												}
											</div>
										</div>
									}
								</div>
							}
							

							{visibleDataBasic === 0 && this.state.active.kindOfGood === 'INMUEBLES' &&
								<div className="high-right flex-sates addAreas">
									{active.areas.map((area, index) => {
										return (
											<div className="input-sates" key={index}>
												<input onChange={(e) => { area.label = e.target.value.toUpperCase(), this.refresh() }} type="text" value={area.label} placeholder={index + 1 + ". Tipo de Área"} />
												<input type="text" onChange={(e) => { area.value = e.target.value.toUpperCase(), this.refresh() }} value={area.value} placeholder="Valor del Área" />
											</div>
										)
									})
									}
								</div>
							}
						</form>

						<div className="high-btns">
							<Link to="/assets" className="btn-cancel">
								<i className="fas fa-times-circle"></i> <strong> Cancelar</strong>
							</Link>

							{!saveSubmitActive && this.state.edit &&
								<button onClick={() => this.handleOnSubmit()} type="button" className="btn-next">
									Actualizar registro
									{/* <strong> {(this.state.edit) ? 'Actualizar registro' : 'Continuar'}</strong> */}
									<i className="fas fa-save"></i>
								</button>
							}
							{!saveSubmitActive && !this.state.edit && !readySave &&
								<button onClick={() => this.next()} type="button" className="btn-next">
									Continuar
									{/* <strong> {(this.state.edit) ? 'Actualizar registro' : 'Continuar'}</strong> */}
									<i className="fas fa-long-arrow-alt-right"></i>
								</button>
							}
							{!saveSubmitActive && !this.state.edit && readySave &&
								<button onClick={() => this.handleOnSubmit()} type="button" className="btn-next">
									Guardar
									<i className="fas fa-save"></i>
								</button>
							}
							{saveSubmitActive &&
								<button className="btn btn-info btn-block mt-3">Guardando... <i className='fa fa-spinner fa-pulse fa-1x fa-fw'></i></button>
							}
						</div>
					</div>
				</section>
			</div>
		)
	}
}
