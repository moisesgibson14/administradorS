import React, { Component } from 'react'
import { types, typeFurniture } from './activesTypes'
import DataBasicVehicle from './components/dataBasicVehicle'
import Administration from './components/Administration'
import Subasta from './subasta/'
import DirectSale from './directSale/'
export default class AltaMueble extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typesActives: [],
      typesFurnitures: [],
      authorizedVehicleServices: [],
      refresh: ''
    }
  }

  componentDidMount() {
    types((actives) => {
      this.setState({ typesActives: actives })
    })
    typeFurniture((furnitures) => {
      this.setState({ typesFurnitures: furnitures })
    })
    if (this.props.active !== '') {
      this.props.active.idOwner = this.props.owner.idOwner
      if (this.props.owner.furnitures.vehicles['administration'].authorization) {
        let authorized = {
          label: 'ADMINISTRACIÓN',
          value: 'ADMINISTRACIÓN'
        }
        this.state.authorizedVehicleServices.push(authorized)
        this.props.owner.furnitures.vehicles.services.map(service => {
          if (service.authorization) {
            let authorized = {
              label: service.label,
              value: service.label
            }
            this.state.authorizedVehicleServices.push(authorized)
          }
        })
        this.setState({ refresh: '' })
      }
      this.props.refresh()
    }
  }

  render() {
    let { typesActives, typesFurnitures, authorizedVehicleServices, visibleDataBasic } = this.state
    if (this.props.active == '') return <h5>Cargando...</h5>
    return (
      <div className={(this.props.visibleDataBasic === 0) ? 'type-active flex-sates':''}>
        {this.props.visibleDataBasic === 0 &&
          <div>
            <div className="input-sates">
              <label id="basic-addon1">Tipo de mueble: <span>*</span></label>
              <select
                className="form-control"
                value={this.props.active.typeOfFurnitureOrProperty}
                onChange={(e) => { this.props.active.typeOfFurnitureOrProperty = e.target.value, this.props.refresh() }}
              >
                <option value="null" name="owner" >Selecionar</option>
                {
                  typesFurnitures.map((type, index) => (
                    <option key={index} value={type.value}>{type.label}</option>
                  ))
                }
              </select>
            </div>
            {
              this.props.active.typeOfFurnitureOrProperty === 'VEHÍCULO' &&
              <div className="input-sates">
                <label id="basic-addon1">Tipo de activo: <span>*</span></label>
                <select
                  className="form-control"
                  value={this.props.active.typeOfAsset}
                  onChange={(e) => { this.props.active.typeOfAsset = e.target.value, this.props.refresh(), this.props.valueVisible.value = 1}}
                >
                  <option value="null" name="owner" >Selecionar</option>
                  {
                    typesActives.map((type, index) => (
                      <option key={index} value={type.value}>{type.label}</option>
                    ))
                  }
                </select>
              </div>
            }
          </div>
        }
        {
          this.props.active.typeOfFurnitureOrProperty === 'VEHÍCULO' &&
          this.props.active.typeOfAsset !== '' &&
          this.props.visibleDataBasic === 1 &&
          <DataBasicVehicle
            active={this.props.active}
            refresh={this.props.refresh}
            authorizedVehicleServices={this.state.authorizedVehicleServices}
            edit={this.props.edit}
            events={this.props.events}
            numberLot={this.props.numberLot}
            numberEvent={this.props.numberEvent}
            warranty={this.props.warranty}
            lotAvailable={this.props.lotAvailable}
            valueVisible={this.props.valueVisible}
          />
        }
        {
          this.props.visibleDataBasic === 2 && 
         <Administration active={this.props.active} authorizedVehicleServices={this.state.authorizedVehicleServices} valueVisible={this.props.valueVisible} refresh={this.props.refresh} edit={this.props.edit} selectTypeOfDestination={this.props.selectTypeOfDestination}  />
        }

        	
					{this.props.active.destination === "SUBASTA" && this.props.visibleDataBasic === 6 &&
						<div>
							<Subasta events={this.props.events}
								lotAvailable={this.props.lotAvailable}
								warranty={this.props.warranty}
								numberEvent={this.props.numberEvent}
								numberLot={this.props.numberLot}
								active={this.props.active}
								refresh={this.props.refresh} />
						</div>
					}
					{this.props.active.destination === "VENTA DIRECTA" && this.props.visibleDataBasic === 7 &&
						<div>
							<DirectSale active={this.props.active} refresh={this.props.refresh} />
						</div>
          }
          
      </div>
    )
  }
}
