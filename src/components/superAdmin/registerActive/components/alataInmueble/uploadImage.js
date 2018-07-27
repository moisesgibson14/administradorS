import React, { Component } from 'react'
import { uploadFiles, deleteFiles } from '../../../../../uploadFiles'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import '../../components/altaMueble/styles/stylesNotes.css'
import $ from 'jquery'
import swal from 'sweetalert'
import { InputText } from '../../../../../swaIInputs'

class UploadImage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			refresh: '',
			date: new Date(),
			percentege: 0,
			upload: false
		}

		this.addDocument = this.addDocument.bind(this)
		this.fileChangeEvent = this.fileChangeEvent.bind(this)
		this.deleteDocument = this.deleteDocument.bind(this)
		this.addArchive = this.addArchive.bind(this)
		this.deleteArchive = this.deleteArchive.bind(this)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

	addDocument(i, tem) {
		InputText('TÍTULO:', (data) => {
			let add = {
				label: data,
				url: "",
				notes: "",
				dateOfTheDocument: new Date(),
				urlInterpretation: ''
			}

			this.props.propietario.documentacionAdministrativa[i].children[tem] = add

			this.setState({
				refresh: ''
			})
			console.log(i);

		})
	}

	openModal(i, index) {
		var modal = document.querySelector('#modal' + i + '' + index),
			cerrar = document.querySelector('#close' + i + '' + index),
			bg = document.querySelector('.mask');

		modal.classList.toggle('tes-modal-active');
		bg.classList.toggle('modal-bg')


	}

	closeModal(i, index) {
		var modal = document.querySelector('#modal' + i + '' + index),
			bg = document.querySelector('.mask');
		modal.classList.remove('tes-modal-active');
		bg.classList.toggle('modal-bg')
	}

	fileChangeEvent(e, i, tem) {
		uploadFiles(e, (data) => {
			this.props.propietario.documentacionAdministrativa[i].children[tem].url = ''
			this.setState({
				refresh: ''
			})
			this.props.propietario.documentacionAdministrativa[i].children[tem].url = data[0]
			this.setState({
				refresh: '',
				upload: false
			})
		}, (porcentaje) => {
			this.setState({ upload: i })

			this.setState({ percentege: Math.round(porcentaje) })
		}, 'documentsState')
	}

	deleteDocument(i, tem) {
		let id = this.props.propietario.documentacionAdministrativa[i].children[tem].url

		if (id) {
			deleteFiles(id, (data) => {
				if (data) {

					this.props.propietario.documentacionAdministrativa[i].children.splice(tem, 1)
					this.setState({
						refresh: ''
					})
				} else {
					console.log('error al eliminar');
				}
			})
		} else {

			this.props.propietario.documentacionAdministrativa[i].children.splice(tem, 1)

			this.setState({
				refresh: ''
			})
		}
	}

	addArchive(i) {
		InputText('Titulo:', (data) => {
			let add = {
				mainLabel: data,
				children: [
					{
						label: "",
						url: "",
						notes: "",
						dateOfTheDocument: "",
						urlInterpretation: ''
					}
				]
			}
			this.props.propietario.documentacionAdministrativa[i] = add
			this.setState({
				refresh: ''
			})
		})
	}

	deleteArchive(i) {
		this.props.propietario.documentacionAdministrativa.splice(i, 1)
		this.setState({
			refresh: ''
		})
	}

	render() {
		return (
			<div className="flex-sates">
				{this.props.propietario.documentacionAdministrativa.map((documento, index) => {
					let i = index
					return (
						<div key={index} className="wrap-item">
							<div className="doc-item">
								<div className="doc-item-head flex-sates">
									<div>
										<span className="folder far fa-folder"></span>
										<label>{documento.mainLabel}</label>
									</div>
									<button className="" type="button" onClick={() => this.addDocument(i, documento.children.length)} ><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
									{i > 9 &&
										<button className="" type="button" onClick={() => this.deleteArchive(i)} ><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
								}
								</div>
								<div className="">
									{(documento.children.length != 0) &&
										<div className="doc-child" >
											{documento['children'].map((contenido, index) => {
												return (
													<div key={index} className="flex-sates doc-child-item" >
														<div key={index} className="child-head" >
															<span className="docum far fa-file-alt"></span>
															<label>{contenido.label}</label>
														</div>
														<div className="">
															<input type="file" id={'fileU' + index + i} className="display-none" onChange={(e) => this.fileChangeEvent(e, i, index)} />
															<label htmlFor={'fileU' + index + i} className="fileU"><i className="fas fa-upload" aria-hidden="true"></i></label>
															{(contenido.url) &&
																<a href={contenido.url} data-fancybox={'fileUFancy' + index + i} data-type="iframe" >
																	<button type="button" className="" ><i className="fas fa-eye" aria-hidden="true"></i></button>
																</a>
															}
															{(contenido.url) &&
																<button type="button" className="" id={'a' + i + index} data-target={'#modalFile' + i + index} data-toggle="modal" ><i className="fas fa-file-alt" aria-hidden="true"></i></button>
															}
															<div className="modal fade" id={'modalFile' + i + index} tabIndex="-1" role="dialog" aria-labelledby={`${index}`} aria-hidden="true">
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

															{
																(contenido.url) &&
																<button type="button" className="" aria-hidden="true" onClick={() => this.openModal(i, index)} ><i className="fas fa-calendar-alt"></i></button>
															}

															<div className="tes-modal" id={'modal' + i + '' + index}>
																<div className="tes-container">
																	<h2 className="text-center">CALENDARIO</h2>
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
																		onSelect={(date) => contenido.dateOfTheDocument} />
																	<span className="cerrar" id={'close' + i + '' + index} onClick={() => this.closeModal(i, index)} >X</span>
																</div>
															</div>

															{/* Terminamos el apartado de modal calendario */}

															<button type="button" className="" aria-hidden="true" onClick={() => this.deleteDocument(i, index)} ><i className="fas fa-trash-alt"></i></button>
															<div className="mask" ></div>
														</div>
													</div>
												)
											})}
										</div>
									}
								</div>
							</div>
							{this.state.upload === i &&
								<div className="progress">
									<div className="progress-bar progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>
										{this.state.percentege}%
                                    </div>
								</div>
							}
						</div>
					)
				})}
					<button className="add-doc" type="button" onClick={() => this.addArchive(this.props.propietario.documentacionAdministrativa.length)}>Agregar documento + </button>
			</div>
		)
	}
}

export default UploadImage