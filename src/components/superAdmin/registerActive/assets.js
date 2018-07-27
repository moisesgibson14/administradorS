import React, { Component } from 'react'
import { firestore } from 'firebase'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import $ from 'jquery'
import './styles.css'
import swal from 'sweetalert';
import './stylesSearch.css'
import { confirmRequest } from '../../../swaIInputs'
import algoliasearch from 'algoliasearch'
import Cryptr from 'cryptr'
import userPermits from "../../../auth";
var cryptr = new Cryptr('satesSeguro8102')

const client = algoliasearch('MIUXU5PG2H', '536306ed1e8d981d2f02e70c444f35a0');
const index = client.initIndex("assets")

class Assets extends Component {
	constructor(props) {
		super(props)

		this.state = {
			assets: [],
			check: 'general',
			refresh: '',
			search: false,
			statusAuthorization: false,
			auth: {}
		}
		console.log(this.props);

		this.handleDeleteAsset = this.handleDeleteAsset.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.openButtoms = this.openButtoms.bind(this)
		this.userPermit = this.userPermit.bind(this)
	}

	componentDidMount() {
		this.userPermit()


		firestore().collection('assets').orderBy("creationDate", "desc").limit(12).onSnapshot(snap => {
			let assetsTMP = []
			snap.forEach(asset => {
				assetsTMP.push({ ...asset.data(), id: asset.id })
			})
			this.setState({ assets: assetsTMP })
		})

	}

	userPermit() {
		let userLocal = JSON.parse(localStorage.getItem('atadresu'))
		let userMail = cryptr.decrypt(userLocal.one)

		firestore().collection('users').where('email', '==', userMail).get().then(data => {

			data.forEach(user => {
				userPermits(user.data(), 'Activos', auth => {
					console.log(auth)
					this.state.auth.insp = auth.childrens[3].value
					this.state.auth.edit = auth.childrens[0].value
					this.state.auth.new = auth.childrens[2].value
					this.state.auth.delete = auth.childrens[1].value
				})
			})

			this.setState({
				refresh:''
			})

		})
	}

	closeSearchBar() {
		$('.search-bar-sates').fadeOut('fast');
	}

	openSearchBar() {
		$('.search-bar-sates')
			.fadeIn('fast')
			.find('input')
			.focus()
	}

	openButtoms(index) {
		$('#assets-sates-act' + index).slideToggle('fast');
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

	handleDeleteAsset(id, objectID) {
		confirmRequest('Confirmar eliminación de activo', 'Una vez eliminado el activo ya no se podrá recuperar', (confirm) => {
			let deleteID = ''
			if (this.state.search) {
				deleteID = objectID
			} else {
				deleteID = id
			}
			if (confirm) {
				firestore().collection('assets').doc(deleteID).delete().then(() => {
					swal("Listo", "Activo eliminado correctamente", "success")
					this.setState({ search: false })
				})
			}
		})
	}

	handleSearch(e) {
		if (e.target.value === '') {
			firestore().collection('assets').orderBy("creationDate").limit(12).onSnapshot(snap => {
				let assetsTMP = []
				snap.forEach(asset => {
					assetsTMP.push({ ...asset.data(), id: asset.id })
				})
				this.setState({ assets: assetsTMP, search: false })
			})
		} else {
			index.search({ query: e.target.value }).then(responses => {
				this.setState({ assets: responses.hits, search: true })
				console.log(responses.hits)
			})
		}
	}

	render() {
		let { assets, search, auth } = this.state
		return (
			<div>

				<section className="assets-sates">
				<div className="headerSections flex-sates">
					<h2>Consulta General de Activos</h2>

					<span className="btnSearch"><i className="fas fa-search"></i></span>
					<div className="SearchBar">
						<span className="closeSearch"><i className="fas fa-times-circle"></i></span>
						<input autoComplete="off" type="search" name="nombre" placeholder="Buscar" onChange={(e) => this.handleSearch(e)} />
					</div>
				</div>

					<div className="wrapper">
						{auth.new &&<Link to={'/registerAsset'} className="btn btn-success buttonCircle position-fixed"><i className="fas fas fa-plus marginTop"></i></Link>}


						{/* card - item */}
						{assets.length > 0 &&
							<div className="flex-sates">
								{
									assets.map((asset, indexAssett) => (
										<article key={indexAssett} className="assets-sates-item flex-sates">
											<figure className="assets-sates-img">
												{/* <img src={(asset.mainPhoto) ? asset.mainPhoto : 'https://image.ibb.co/jnZBTH/Recurso_15.png'} alt="Card image cap" /> */}
												<img src={(asset.mainPhoto) ? asset.mainPhoto : 'http://colegiolibertad.com.mx//content/972486/FACHADA_KINDER.jpg'} alt="Card image cap" />

												<figcaption>
													<span className="assets-sates-date">{dateFormat(asset.creationDate, 'dd/mm/yy - h:MM:ss TT')}</span>
												</figcaption>
											</figure>

											<div className="assets-sates-info">
												<button className="btn-assets-action" onClick={() => this.openButtoms(indexAssett)} >
													<i className="fas fa-cog"></i>
												</button>

												<span className="assets-sates-type">{asset.typeOfAsset}</span>
												<span className="assets-sates-destination">{asset.destination}</span>

												<h2 className="assets-sates-title">{asset.title}</h2>

												<p className="assets-sates-reason">{asset.socialReason}</p>

												<div className="assets-sates-id">
													<span>ID SATES:{asset.idSates}</span>
													<span> {(asset.kindOfGood === 'INMUEBLES') ? `${asset.states.basicInformation[0].id}: ${asset.states.basicInformation[0].valueId}` : `No DE SERIE: ${asset.furniture.vehicle.serialNumber}`} </span>
												</div>
											</div>

											<div className="assets-sates-actions" id={`assets-sates-act${indexAssett}`}>
												{auth.edit &&
													<Link to={(search === true) ? `/editAsset/${asset.objectID}` : `/editAsset/${asset.id}`}>
														<button className="btn-edit"> <i className="fas fa-pencil-alt"></i> </button>
													</Link>
												}
												{auth.insp &&
													<Link to={
														(asset.kindOfGood === 'MUEBLES') ? `/revisionAssetForniture/${(search === true) ? asset.objectID : asset.id}` : `/revisionAssetState/${(search === true) ? asset.objectID : asset.id}`
													} >
														<button className="btn-date"><i className="far fa-calendar-check"></i></button>
													</Link>
												}
												{auth.delete &&
													<button type="button" onClick={() => this.handleDeleteAsset(asset.id, asset.objectID)} className="btn-delete">
														<i className="fas fa-trash"></i>
													</button>
												}
											</div>
										</article>
									))
								}
							</div>
						}
					</div>
				</section>
				

				
				{/* <div className="search-bar-sates">
					<input autoComplete="off" type="text" name="nombre" placeholder="Buscar" onChange={(e) => this.handleSearch(e)} />
					<span id="searchbar-close" onClick={() => this.closeSearchBar()}>X</span>
				</div> */}

				{/* <div className="col-12 d-flex justify-content-center searchMargin">
					<div className="col-11 m-1 m-lg-auto d-flex justify-content-center position-fixed searchFixed">
						<input autoComplete="of" className="form-control" type="search" name="nombre" placeholder="Buscar" onChange={(e) => this.handleSearch(e)} />
					</div>
				</div> */}


				{/* <div className="card">
					<div className="col-12">
						<h5 className="text-center mt-3 mb-3" >CONSULTA GENERAL DE ACTIVOS</h5>
						<hr />
						<Link to={'/registerAsset'} className="btn btn-success buttonCircle position-fixed"><i className="fas fas fa-plus marginTop"></i></Link>
					</div>
					{assets.length > 0 &&
						<div style={{ padding: '20px' }}>
							{
								assets.map((asset, indexAssett) => (
									<div key={indexAssett} className="row">
										<div className=" col-md-3 col-lg-3 col-xl-2 centerSm ">
											<img className="card-img-top" src={(asset.mainPhoto) ? asset.mainPhoto : 'https://image.ibb.co/jnZBTH/Recurso_15.png'} alt="Card image cap" />
										</div>
										<div className="col-md-9 col-lg-9 col-xl-7 centerSm ">
											<h5 className="card-title">{asset.typeOfAsset}</h5>
											<p className="card-text">{asset.title}</p>

											<p className="card-text">{asset.destination}</p>
											<p className="card-text">{asset.socialReason}</p>
											<div className="col-12">
												<div className="row">
													<p className=" col-6 "><strong> ID SATES:</strong> {asset.idSates}</p>
													<p className=" col-6 "> {(asset.kindOfGood === 'INMUEBLES') ? `${asset.states.basicInformation[0].id}: ${asset.states.basicInformation[0].valueId}` : `No DE SERIE: ${asset.furniture.vehicle.serialNumber}`} </p>
												</div>
											</div>
										</div>
										<div className="col-12 m-lg-3 m-xl-auto col-xl-3">
											<div className="row d-flex justify-content-end ">
												<p className="col-12 col-md-7 col-xl-12 d-flex justify-content-center justify-content-lg-end" title="Source Title">{dateFormat(asset.creationDate, 'dd/mm/yy - h:MM:ss TT')}</p>
												<div className="col-12 col-md-5 col-xl-12 d-flex justify-content-center justify-content-lg-end " >
													<Link to={(search === true) ? `/editAsset/${asset.objectID}` : `/editAsset/${asset.id}`}>
														<button className="btn btn-success mr-2"> <i className="fas fa-pencil-alt"></i> </button>
													</Link>
													<Link to={
														(asset.kindOfGood === 'MUEBLES') ? `/revisionAssetForniture/${(search === true) ? asset.objectID : asset.id}` : `/revisionAssetState/${(search === true) ? asset.objectID : asset.id}`
													} >
														<button className="btn btn-info mr-2"><i className="far fa-calendar-check"></i></button>
													</Link>
													<button type="button" onClick={() => this.handleDeleteAsset(asset.id, asset.objectID)} className="btn btn-danger">
														<i className="fas fa-trash"></i></button>
												</div>
											</div>
										</div>
										<div className="col-12">
											<hr />
										</div>
									</div>
								))
							}
						</div>
					}
					{
						assets.length === 0 &&
						<div className="col-12">
							<div className="alert alert-warning text-center" role="alert">
								<h5>{(search === true) ? 'NO SE ENCONTRARON COINCIDENCIAS' : 'SIN ACTIVOS'}</h5>
							</div>
						</div>
					}
				</div> */}
			</div>
		)
	}
}


export default Assets