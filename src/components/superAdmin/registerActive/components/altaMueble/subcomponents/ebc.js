import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, InputGroup, InputGroupAddon, Button } from 'reactstrap'
export default class Ebc extends Component {
	constructor(props) {
		super(props)

		this.state = {
			years: [],
			brands: [],
			models: [],
			versions: [],
			brand: '',
			model: '',
			version: '',
			year: '',
			idBrand: '',
			idModel: '',
			idVersion: '',
			refresh: '',
			title: ''
		}
		this.handleGetBrands = this.handleGetBrands.bind(this)
		this.handleAssignBrand = this.handleAssignBrand.bind(this)
		this.handleGetModels = this.handleGetModels.bind(this)
		this.handleAssignModel = this.handleAssignModel.bind(this)
		this.handleGetVersions = this.handleGetVersions.bind(this)
		this.handleAssignVersion = this.handleAssignVersion.bind(this)
		this.handleGetPrice = this.handleGetPrice.bind(this)
	}

	componentDidMount() {
		axios.get('https://catalogo-ebc.herokuapp.com/year/').then((response) => {
			this.setState({
				years: response.data.years
			})
		})
		if (this.props.edit) {
			axios.get('https://catalogo-ebc.herokuapp.com/brand/' + this.props.active.furniture['vehicle'].year).then((response) => {
				this.setState({
					brands: response.data.brand,
				})
			})
			let dataModels = {
				year: this.props.active.furniture['vehicle'].year,
				brand: this.props.active.furniture['vehicle'].brand
			}
			axios.post('https://catalogo-ebc.herokuapp.com/model/', dataModels).then(response => {
				this.state.models = response.data.model
				this.setState({ refresh: '' })
			})
			let dataVersion = {
				year: this.props.active.furniture['vehicle'].year,
				brand: this.props.active.furniture['vehicle'].brand,
				model: this.props.active.furniture['vehicle'].model
			}
			axios.post('https://catalogo-ebc.herokuapp.com/version', dataVersion).then(response => {
				this.state.versions = response.data.version
				this.setState({
					refresh: ''
				})
			})
		}
	}

	handleGetBrands(year) {
		axios.get('https://catalogo-ebc.herokuapp.com/brand/' + year).then((response) => {
			this.setState({
				brands: response.data.brand,
			})
			this.props.active.furniture['vehicle'].year = year
		}).catch((err) => {
			console.log(err)
		})
	}

	handleAssignBrand(clave) {
		this.state.brands.map(brand => {
			if (brand.Clave === clave) {
				this.state.brand = brand.Nombre
				this.state.idBrand = brand.Clave
				this.props.active.furniture['vehicle'].brand = brand.Clave
				this.setState({ refresh: '' })
				this.handleGetModels()
			}
		})
	}

	handleGetModels() {
		let data = {
			year: this.state.year,
			brand: this.state.idBrand
		}
		axios.post('https://catalogo-ebc.herokuapp.com/model/', data).then(response => {
			this.state.models = response.data.model
			this.setState({ refresh: '' })
		}).catch(err => {
			console.log(err)
		})
	}

	handleAssignModel(clave) {
		this.state.models.map(model => {
			if (model.Clave === clave) {
				this.state.model = model.Nombre
				this.state.idModel = model.Clave
				this.props.active.furniture['vehicle'].model = model.Clave
				this.setState({ refresh: '' })
				this.handleGetVersions()
			}
		})
	}

	handleGetVersions() {
		let data = {
			year: this.state.year,
			brand: this.state.idBrand,
			model: this.state.idModel
		}
		axios.post('https://catalogo-ebc.herokuapp.com/version', data).then(response => {
			this.state.versions = response.data.version
			this.setState({
				refresh: ''
			})
		}).catch(err => {
			console.log(err)
		})
	}

	handleAssignVersion(clave) {
		this.state.versions.map(version => {
			if (version.Clave === clave) {
				this.state.version = version.Nombre
				this.state.idVersion = version.Clave
				this.props.active.furniture['vehicle'].version = version.Clave
				this.setState({
					refresh: ''
				})
				this.handleGetPrice()
			}
		})
	}

	handleGetPrice() {
		axios.get('https://catalogo-ebc.herokuapp.com/price/' + this.state.idVersion).then(response => {
			this.props.active.furniture['vehicle'].priceBuyEbc = response.data.price.Compra
			this.props.active.furniture['vehicle'].priceSaleEbc = response.data.price.Venta
			this.setState({ refresh: '' })
			this.props.refresh()
		}).catch(err => {
			console.log(err)
		})
	}

	render() {
		let { years, brands, models, versions } = this.state
		if (!this.props.edit) {
			let titleLocal = this.state.brand + ' ' + this.state.model + ' ' + this.state.version + ' ' + this.state.year
			this.props.active.title = titleLocal
		}
		if (this.state.title !== '') {
			console.log('entra en el if: ', this.props.active.title);
			this.props.active.title = this.state.title
		}

		return (
			<div className="flex-sates">
				<div className="ebc-input flex-sates">
					<div className="input-sates">
						<label>Año: <span>*</span></label>
						<select className="form-control"
							value={this.props.active.furniture['vehicle'].year}
							onChange={(e) => { this.props.active.furniture['vehicle'].year = e.target.value, this.setState({ year: e.target.value }),this.props.valueVisible.value = 2, this.handleGetBrands(e.target.value), this.props.refresh() }}>
							<option value="null">{(years.length < 1) ? 'Cargando...' : 'Seleccionar año'}</option>
							{
								years.map((year, index) => (
									<option key={index} value={year.Clave}>{year.Nombre}</option>
								))
							}
						</select>
					</div>

					<div className="input-sates">
						<label>Marca: <span>*</span></label>
						<select className="form-control"
							value={this.props.active.furniture['vehicle'].brand}
							onChange={(e) => this.handleAssignBrand(e.target.value)} >
							<option value="null">{(brands.length < 1) ? 'Cargando...' : 'Seleccionar marca'}</option>
							{
								brands.map((brand, index) => (
									<option key={index} value={brand.Clave}>{brand.Nombre}</option>
								))
							}
						</select>
					</div>
				</div>

				<div className="ebc-input flex-sates">
					<div className="input-sates">
						<label>Modelo: <span>*</span></label>
						<select className="form-control"
							value={this.props.active.furniture['vehicle'].model}
							onChange={(e) => this.handleAssignModel(e.target.value)} >
							<option value="null">{(models.length < 1) ? 'Cargando...' : 'Seleccionar modelo'}</option>
							{
								models.map((model, index) => (
									<option key={index} value={model.Clave}>{model.Nombre}</option>
								))
							}
						</select>
					</div>

					<div className="input-sates">
						<label>Versión:</label>
						<select className="form-control"
							value={this.props.active.furniture['vehicle'].version}
							onChange={(e) => this.handleAssignVersion(e.target.value)} >
							<option value="null">{(versions.length < 1) ? 'Cargando...' : 'Seleccionar versión'}</option>
							{
								versions.map((version, index) => (
									<option value={version.Clave} key={index}>{version.Nombre}</option>
								))
							}
						</select>
					</div>
				</div>

				<div className="input-sates tituloEBC">
					<label>Título: <span>*</span></label>
					<input
						type="text" value={this.props.active.title}
						onChange={(e) => { this.setState({ title: e.target.value }), this.props.refresh() }}
					/>
				</div>

				<div className="ebc-input-precio flex-sates">
					<div className="input-sates precioEBC">
						<label>Precio Compra GUIA EBC:</label>
						<input disabled type="number" value={this.props.active.furniture['vehicle'].priceBuyEbc} />
					</div>

					<div className="input-sates precioEBC">
						<label>Precio Venta GUIA EBC:</label>
						<input disabled type="number" value={this.props.active.furniture['vehicle'].priceSaleEbc} />
					</div>
				</div>
			</div>
		)
	}
}
