import React, { Component } from 'react'
import { InputGroupAddon, UncontrolledTooltip } from 'reactstrap'
import { uploadFiles } from '../../../../../../uploadFiles'
import { confirmRequest, InputText } from '../../../../../../swaIInputs'
import $ from 'jquery'
import '../styles/modalStatic.css'
export default class ExternalImagesAdministration extends Component {
	constructor(props) {
		super(props)

		this.state = {
			indexExternal: 0,
			imagesDeleteTMP: [],
			indexFather: 0,
			percentege: 0,
			upload: true
		}
		this.handleAssingImages = this.handleAssingImages.bind(this)
		this.handleDeleteImages = this.handleDeleteImages.bind(this)
		this.handleNewAlbum = this.handleNewAlbum.bind(this)
		this.handleDeleteAlbum = this.handleDeleteAlbum.bind(this)
	}

	handleUploadImages(e) {
		this.setState({ upload: false })
		uploadFiles(e, (files) => {
			let filesTMP = []
			files.forEach(file => {
				filesTMP.push(file)
			})
			this.setState({ upload: true })
			this.props.active.furniture['vehicle'].administration['externalImages'][this.state.indexExternal].images = this.props.active.furniture['vehicle'].administration['externalImages'][this.state.indexExternal].images.concat(filesTMP)
			this.props.refresh()
		}, (percentege) => {
			this.setState({ percentege: Math.round(percentege) })
		}, 'imagesExternalAdministration')
	}

	handleAssingImages(index) {
		let imagesTMP = []
		this.props.active.furniture['vehicle'].administration['externalImages'][index].images.forEach(img => {
			imagesTMP.push(img)
		})
		this.setState({
			imagesDeleteTMP: imagesTMP
		})
	}

	handleDeleteImages(index, all) {
		if (all) {
			confirmRequest('¿ESTAS SEGURO?', 'AL CONFIRMAR NO SE PODRÁN RECUPERAR LAS FOTOS', (value) => {
				if (value) {
					this.props.active.furniture['vehicle'].administration['externalImages'][this.state.indexFather].images = []
					this.state.imagesDeleteTMP = []
					if (this.state.imagesDeleteTMP.length < 1) {
						$('#click').click()
					}
					this.props.refresh()
				}
			})
		} else {
			this.props.active.furniture['vehicle'].administration['externalImages'][this.state.indexFather].images.splice(index, 1)
			this.state.imagesDeleteTMP.splice(index, 1)
			if (this.state.imagesDeleteTMP.length < 1) {
				$('#click').click()
			}
			this.props.refresh()
		}
	}

	handleNewAlbum() {
		InputText('INGRESE NOMBRE PARA EL ÁLBUM: ', (value) => {
			if (value) {
				let newAlbum = {
					label: value,
					images: []
				}
				this.props.active.furniture['vehicle'].administration['externalImages'].push(newAlbum)
				this.props.refresh()
			}
		})
	}

	handleDeleteAlbum(index) {
		confirmRequest('¿ESTAS SEGURO?', 'AL CONFIRMAR NO SE PODRÁ RECUPERAR EL ÁLBUM', (value) => {
			if (value) {
				this.props.active.furniture['vehicle'].administration['externalImages'].splice(index, 1)
				this.props.refresh()
			}
		})
	}
	render() {
		let { upload } = this.state
		return (
			<div className="image-ext">
				<h3 className="subtitle-ind">IMÁGENES EXTERNAS</h3>
				{
					upload === false  &&
					<div className="progress">
						<div className="progress-bar progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>
							{/* {this.state.percentege}% */}
							</div>
					</div>
				}
				{/* <div className=" row col col-md-6 mb-3">
					<InputGroupAddon className="mt-1">TENGO FOTOS EXTERNAS &nbsp;
								<label className="switch switch-text switch-primary-outline-alt">
							<input type="checkbox" className="switch-input"
								checked={this.props.active.furniture['vehicle'].administration['extImages']}
								onChange={(e) => { this.props.active.furniture['vehicle'].administration['extImages'] = e.target.checked, this.props.refresh() }} />
							<span className="switch-label" data-on="On" data-off="Off"></span>
							<span className="switch-handle"></span>
						</label>
					</InputGroupAddon>
				</div>
				{
					this.props.active.furniture['vehicle'].administration['extImages'] === true && */}
				<div className="img-ext-btns flex-sates">
					{
						this.props.active.furniture['vehicle'].administration['externalImages'].map((folder, indexFolder) => (
							<div className="img-ext-item flex-sates" key={indexFolder}>
								<div className="img-ext-head">
									<span className="img-ext-count">{folder.images.length}</span>
									<label className="img-ext-label">{folder.label}</label>
									<span className="far fa-image img-ext-ph"></span>
								</div>

								<div>
								<UncontrolledTooltip placement="bottom" target={`toltipUploadImgExt${indexFolder}`}>
									Click para subir imágenes
											</UncontrolledTooltip>
								<label onClick={() => this.setState({ indexExternal: indexFolder })} id={`toltipUploadImgExt${indexFolder}`}
									style={{ cursor: 'pointer' }}
									className="img-ext-btn"
									htmlFor="uploadImagesExternal"><i className="fa fa-upload"></i>
								</label>
								<input
									onChange={(e) => this.handleUploadImages(e)}
									style={{ display: 'none' }}
									accept="image/*"
									capture="camera"
									multiple
									type="file" id="uploadImagesExternal" />


								{
									folder.images.map((image, indexImage) => (
										<div className="img-ext-btn" key={indexImage}>
											{
												indexImage === 0 &&
												<a href={image} data-fancybox={`fancy${indexFolder}`} className="handleF" data-caption="Hola mundo">
													<i className="fa fa-eye"></i>
												</a>
											}
											{
												indexImage > 0 &&
												<a href={image} data-fancybox={`fancy${indexFolder}`} data-caption="Hola mundo">
												</a>
											}
										</div>
									))
								}


								{
									folder.images.length > 0 &&
									<div className="img-ext-btn">
										<UncontrolledTooltip placement="bottom" target={`toltipDeleteImages${indexFolder}`}>
											Eliminar imágenes
												</UncontrolledTooltip>
										<button type='button'
											onClick={() => { this.handleAssingImages(indexFolder), this.setState({ indexFather: indexFolder }) }}
											id={`toltipDeleteImages${indexFolder}`}
											data-toggle="modal" data-target="#deleteImagesExternal"
										>
											<i className="fa fa-trash"></i>
										</button>

										<div className="modal fade" id="deleteImagesExternal" tabIndex="-1" role="dialog" aria-labelledby="deleteImagesExternal" aria-hidden="true">
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="modal-header">
														<strong className="modal-title" id="exampleModalLabel"> ELIMINAR TODAS</strong>
														<button style={{ display: 'none' }} id="click" type="button" className="close" data-dismiss="modal" aria-label="Close">
															<span aria-hidden="true">&times;</span>
														</button>
														<button type="button" onClick={() => this.handleDeleteImages(null, true)} className="btn btn-danger float-right">
															<i className="fa fa-trash"></i>
														</button>
													</div>
													<div className="modal-body staticModal">
														{
															this.state.imagesDeleteTMP.length > 0 &&
															<div>
																{
																	this.state.imagesDeleteTMP.map((image, indexImageExternal) => (
																		<div key={indexImageExternal}>
																			<div className="row mb-3 align-items-center">
																				<div className="col col-md-5">
																					<img src={image} width={100} height={100} />
																				</div>
																				<div className="col col-md-5">
																					<button onClick={() => this.handleDeleteImages(indexImageExternal, false)}
																						type="button" className="btn btn-warning"><i className="fa fa-minus-circle"></i>
																					</button>
																				</div>
																			</div>
																		</div>
																	))
																}
															</div>
														}
													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								}
								{
									indexFolder > 2 &&
									<div className="col col-md-1">
										<button onClick={() => this.handleDeleteAlbum(indexFolder)} type="button" className="btn btn-danger">
											<i className="fa fa-minus-circle"></i>
										</button>
									</div>
								}
								</div>
							</div>
						))
					}
					<button onClick={() => this.handleNewAlbum()} type="button" className="addAlbum">
						Agregar nuevo album +
					</button>
				</div>
				{/* } */}
			</div>
		)
	}
}
