import React, { Component } from 'react'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import swal from 'sweetalert'
import { uploadFiles, deleteFiles } from '../../../../../uploadFiles'
import { InputText } from '../../../../../swaIInputs'


class ExternalImages extends Component {
	constructor(props) {
		super(props)

		this.state = {
			refresh: '',
			date: new Date(),
			upload: false,
			percentege: 0
		}

		this.addDocument = this.addDocument.bind(this)
		this.fileChangeEvent = this.fileChangeEvent.bind(this)
		this.addText = this.addText.bind(this)
		this.clickFancy = this.clickFancy.bind(this)
		this.deleteImage = this.deleteImage.bind(this)
		this.deleteImages = this.deleteImages.bind(this)
		this.deleteDocument = this.deleteDocument.bind(this)
		this.addArchive = this.addArchive.bind(this)
		this.deleteArchive = this.deleteArchive.bind(this)
	}


	addDocument(i, tem) {
		InputText('TÍTULO:', (data) => {
			let add = {
				label: data,
				images: [],
				notes: "",
				date: ""
			}
			if (!this.props.images[i].children[0].label) {
				this.props.images[i].children[tem - 1] = add
				console.log('todo');

			} else {
				this.props.images[i].children[tem] = add
				console.log('nada');

			}
			this.setState({
				refresh: ''
			})
			console.log(i, tem);
		})
	}


	fileChangeEvent(e, i, tem) {
		uploadFiles(e, (data) => {

			data.map(image => {
				this.props.images[i].children[tem].images = this.props.images[i].children[tem].images.concat(image)
			})

			console.log(this.props.images[i].children[tem].images);

			this.setState({
				refresh: '',
				upload: false
			})

		}, (porcentaje) => {
			this.setState({ upload: true })

			this.setState({ percentege: Math.round(porcentaje) })

		}, 'documentsState')

	}

	addText(i, tem) {
		service.inputSwal('Descripcion:', (data) => {
			this.props.images[i].children[tem].notes = data
			this.setState({
				refresh: ''
			})
		})
	}

	saveDate(i, tem) {
		this.props.images[i].children[tem].date = this.state.date
		this.setState({
			date: new Date()
		})
		$(document).ready(function () {
			$('#close' + i + tem).click()
		});
	}

	clickFancy(i, x) {
		$(document).ready(function () {
			$('#data' + i + x).click()
		});
	}

	deleteImage(i, x, j) {

		let id = this.props.images[i].children[x].images[j]

		deleteFiles(id, data => {
			if (data) {
				this.props.images[i].children[x].images.splice(j, 1)

				this.setState({
					refresh: ''
				})
			}
		})
		if (this.props.images[i].children[x].images.length === 1) {
			$(document).ready(function () {
				$('#close' + (x + 1) + i).click()
			});
		}

	}

	deleteImages(i, x) {

		let id = this.props.images[i].children[x].images
		deleteFiles(id, data => {
			if (data) {
				this.props.images[i].children[x].images = []

				this.setState({
					refresh: ''
				})
			} else {
				console.log('error', data)
			}
		})

		$(document).ready(function () {
			$('#close' + (x + 1) + i).click()
		});
	}

	addArchive(i) {
		InputText('TÍTULO:', (data) => {
			let add = {
				mainLabel: data,
				children: [
					{
						label: "",
						images: [],
						notes: "",
						date: ""
					}
				]
			}
			this.props.images[i] = add
			this.setState({
				refresh: ''
			})
		})
	}

	deleteArchive(i) {
		this.props.images.splice(i, 1)
		this.setState({
			refresh: ''
		})
	}

	deleteDocument(i, x) {
		this.deleteImages(i, x)
		let add = {
			label: "",
			images: [],
			notes: "",
			date: ""
		}
		if (this.props.images[i].children.length === 1) {
			this.props.images[i].children[x] = add;
		} else {
			this.props.images[i].children.splice(x, 1)
		}
		this.setState({
			refresh: ''
		})
	}

	render() {
		return (
			<div>
				{this.props.images.map((image, index) => {
					let i = index
					return (
						<div key={index} className="img-ext-item" >
							<div className="flex-sates">
								<label>{image.mainLabel}</label>
								<button className="" type="button" onClick={() => this.addDocument(i, image.children.length)} ><i className="fa fa-plus" aria-hidden="true"></i></button>
							</div>

							{i > 1 &&
									<button className="btn btn-outline-primary" type="button" onClick={() => this.deleteArchive(i)} ><i className="fa fa-minus" aria-hidden="true"></i></button>
							}

								<div className="arch-ext">
									{(image.children[0].label) &&
										<div >
											{image.children.map((contenido, index) => {
												let x = index
												return (
													<div key={index}>
														<div key={index} className="arch-ext-item">
															<label>{contenido.label}</label>
														</div>
														<div className="arch-btns">
															<input type="file" capture="camera" accept="image/*" multiple id={'file' + index + i} className="display-none" onChange={(e) => this.fileChangeEvent(e, i, index)} />
															<label htmlFor={'file' + index + i} className="btn btn-outline-dark" ><i className="fa fa-upload" aria-hidden="true"></i></label>
															{contenido.images.length > 0 &&
																<button type="button" className="btn btn-outline-dark" onClick={() => this.clickFancy(i, x)} ><i className="fa fa-eye" aria-hidden="true"></i></button>
															}
															{this.props.images[i].children[x].images.length > 0 &&
																<button type="button" className="btn btn-outline-dark" id={'a' + i + index} data-target={'#modalFileE' + i + index} data-toggle="modal" ><i className="fas fa-file-alt" aria-hidden="true"></i></button>
															}
															<div className="modal fade" id={'modalFileE' + i + index} tabIndex="-1" role="dialog" aria-labelledby={`${index}`} aria-hidden="true">
																<div className="modal-dialog" role="document">
																	<div className="modal-content">
																		<div className="modal-header">
																			<h5 className="modal-title" id="exampleModalLabel">Notas {contenido.label}</h5>
																			<button type="button" className="close" data-dismiss="modal" aria-label="Close">
																				<span aria-hidden="true">&times;</span>
																			</button>
																		</div>
																		<div className="modal-body">
																			<div className="paper">
																				<div className="paper-content bodyNote">
																					<textarea value={contenido.notes} onChange={(e) => { contenido.notes = e.target.value, this.props.refresh() }} autoFocus></textarea>
																				</div>
																			</div>
																		</div>
																		<div className="modal-footer">
																			<button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
																		</div>
																	</div>
																</div>
															</div>

															{/* Empezamos el apartado del modal de calendario */}
															{this.props.images[i].children[x].images.length > 0 &&
																<button type="button" className="btn btn-outline-dark mr-1" data-toggle="modal" data-target={'#' + i + index} ><i className="fa fa-calendar" aria-hidden="true"></i></button>
															}
															<div className="modal" id={i + '' + index} tabIndex="-1" role="dialog">
																<div className="modal-dialog" role="document">
																	<div className="modal-content">
																		<div className="modal-header">
																			<h5 className="modal-title">Calendario</h5>
																			<button type="button" className="close" id={'close' + i + index} data-dismiss="modal" aria-label="Close">
																				<span aria-hidden="true">&times;</span>
																			</button>
																		</div>
																		<div className="modal-body">
																			<InfiniteCalendar
																				width={450}
																				height={200}
																				locale={{
																					locale: require('date-fns/locale/es'),
																					headerFormat: 'dddd, D MMM',
																					weekdays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
																					blank: 'Seleccione la Fecha',
																					todayLabel: {
																						long: 'Fecha de hoy',
																						short: 'Hoy.'
																					}
																				}}
																				selected={contenido.dateOfTheDocument}
																				onSelect={(date) => this.setState({
																					date
																				})} />
																		</div>
																		<div className="modal-footer">
																			<button type="button" className="btn btn-primary" onClick={() => this.saveDate(i, index)}  >Guardar</button>
																		</div>
																	</div>
																</div>
															</div>

															{/* Terminamos el apartado de modal calendario */}

															{/* empesamos el modal de imagenes */}
															{this.props.images[i].children[x].images.length > 0 &&
																<button type="button" className="btn btn-outline-dark mr-1" data-toggle="modal" data-target={'#modal' + index + i} ><i className="fas fa-trash-alt" aria-hidden="true"></i></button>
															}
															<div className="modal fade" id={'modal' + index + i} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
																<div className="modal-dialog" role="document">
																	<div className="modal-content">
																		<div className="modal-header">
																			<h5 className="modal-title" id="exampleModalLabel">Eliminar imagenes</h5>
																			<button type="button" className="close" id={'close' + (x + 1) + i} data-dismiss="modal" aria-label="Close">
																				<span aria-hidden="true">&times;</span>
																			</button>
																		</div>
																		<div className="modal-body">
																			<div className="col-12 d-flex justify-content-end " >
																				<button type="button" className="ml-2 btn btn-outline-dark " onClick={() => this.deleteImages(i, x)} ><i className="fas fa-minus-square fa-2x" aria-hidden="true"></i></button>
																			</div>
																			<hr />
																			{contenido.images.map((data, index) => {
																				let j = index
																				return (
																					<div key={j} >
																						<div className="d-flex justify-content-between" >
																							<a href={data} data-fancybox={'data' + i + x} id={'data' + i + x} >
																								<img src={data} className="col-md-3" alt="Responsive image" />
																							</a>
																							<div className="col-2">
																								<button type="button" className="ml-2 btn btn-outline-dark " onClick={() => this.deleteImage(i, x, j)}> <i className="fas fa-minus-square" aria-hidden="true"></i> </button>
																							</div>
																						</div>
																						<hr />
																					</div>
																				)
																			})}
																		</div>
																		<div className="modal-footer">
																			<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
																		</div>
																	</div>
																</div>
															</div>
															{/* terminamos el modal de imagenes */}
															<button type="button" className="btn btn-outline-dark mr-1" data-toggle="modal" onClick={() => this.deleteDocument(i, x)}><i className="fas fa-minus-square" aria-hidden="true"></i></button>
														</div>
													</div>
												)
											})}
										</div>
									}
								</div>
						</div>
					)
				})}
					
				<button type="button" className="add-img-ext" onClick={() => this.addArchive(this.props.images.length)} >Agregar album +</button>

				{this.state.upload &&
					<div className="progress mb-3 mt-3 col-12">
						<div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>
							{this.state.percentege}%
                        </div>
					</div>
				}
			</div>
		)
	}

}

export default ExternalImages 