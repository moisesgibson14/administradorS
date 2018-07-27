import React, { Component } from 'react'
import { InputGroup, InputGroupAddon } from 'reactstrap'
import Ebc from '../subcomponents/ebc'
import NoDataEbc from '../subcomponents/noDataEbc'
import { InputText, confirmRequest }  from '../.../../../../../../../swaIInputs'
import Administration from './Administration'
import Subasta from "../subasta/"
import DirectSale from "../directSale"

export default class DataBasicVehicle extends Component {
    constructor(props) {
        super(props)
        this.handleDeleteDataEBC = this.handleDeleteDataEBC.bind(this)
        this.changeDestination = this.changeDestination.bind(this)
        console.log(props);
        
    }
    handleDeleteDataEBC(e) {
        if (!this.props.active.furniture['vehicle'].guideEBC) {
            this.props.active.furniture['vehicle'].guideEBC = true
            this.props.refresh()
        } else {
            confirmRequest( 'ESTAS SEGURO?', 'SE ELIMINARAN LOS DATOS SELECCIONADOS', (ok) => {
                if (ok) {
                    this.props.active.furniture['vehicle'].guideEBC = false
                    this.props.refresh()
                }
            })
        }
    }
    changeDestination(e){
        if(this.props.active.destination.length >0){
            e.persist()
            let dest = e.target.value
            confirmRequest('¿Estas seguro de cambiar el destino?', 'Se perderan los cambios ', (ok) => {
                if (ok) {
                    this.props.active.destination = dest
                    this.props.refresh()
                }
            })
        }else{            
            this.props.active.destination = e.target.value
        }        
    }
	render() {
		return (
			<div className="dataBasicSection flex-sates">
				<div className="dataBasic-left">
					<div className="input-sates">
						<label>ID SATES</label>
						<input type="text" value={this.props.active.idSates} disabled />
					</div>
					<div className="input-sates">
						<label>Número de serie</label>
						<input type="text"
							value={this.props.active.furniture['vehicle'].serialNumber}
							onChange={(e) => { this.props.active.furniture['vehicle'].serialNumber = e.target.value.toUpperCase(), this.props.refresh() }}
						/>
					</div>
					<div className="input-sates">
						<label>Número de motor</label>
						<input type="text"
							value={this.props.active.furniture['vehicle'].engineNumber}
							onChange={(e) => {
								this.props.active.furniture['vehicle'].engineNumber = e.target.value.toUpperCase(), this.props.refresh()
							}}
						/>
					</div>

					<div className="dataBasicId flex-sates">
						<div className="input-sates">
							<input
								value={this.props.active.ids[0].label}
								placeholder="ID1"
								onChange={(e) => { this.props.active.ids[0].label = e.target.value, this.props.refresh() }} type="text" value={this.props.active.ids[0].label} />
							<input type="text" c
								value={this.props.active.ids[0].value}
								placeholder="Valor ID1"
								onChange={(e) => { this.props.active.ids[0].value = e.target.value, this.props.refresh() }}
							/>
						</div>
						<div className="input-sates">
							<input
								value={this.props.active.ids[1].label}
								placeholder="ID2"
								onChange={(e) => { this.props.active.ids[1].label = e.target.value, this.props.refresh() }} type="text" value={this.props.active.ids[1].label} />

							<input type="text"
								value={this.props.active.ids[1].value}
								placeholder="Valor ID2"
								onChange={(e) => { this.props.active.ids[1].value = e.target.value, this.props.refresh() }} />
						</div>

						<div className="input-sates">
							<input
								value={this.props.active.ids[2].label}
								placeholder="ID3"
								onChange={(e) => { this.props.active.ids[2].label = e.target.value, this.props.refresh() }} type="text" value={this.props.active.ids[2].label} />

							<input type="text"
								value={this.props.active.ids[2].value}
								placeholder="Valor ID3"
								onChange={(e) => { this.props.active.ids[2].value = e.target.value, this.props.refresh() }}
							/>
						</div>
						<div className="input-sates">
							<input
								value={this.props.active.ids[3].label}
								placeholder="ID4"
								onChange={(e) => { this.props.active.ids[3].label = e.target.value, this.props.refresh() }} type="text" value={this.props.active.ids[3].label} />

							<input type="text"
								value={this.props.active.ids[3].value}
								placeholder="Valor ID4"
								onChange={(e) => { this.props.active.ids[3].value = e.target.value, this.props.refresh() }} />
						</div>
					</div>
				</div>

				<div className="dataBasic-rigth">

					<div className="switch-ebc">
						<h3>Guía EBC</h3>
						<label className="switch switch-text switch-primary-outline-alt switch-user">
							<input type="checkbox" className="switch-input"
								checked={this.props.active.furniture['vehicle'].guideEBC}
								onChange={(e) => this.handleDeleteDataEBC(e)}
							/>
							<span className="switch-label" data-on="On" data-off="Off"></span>
							<span className="switch-handle"></span>
						</label>
					</div>

						{
							this.props.active.furniture['vehicle'].guideEBC &&
							<Ebc edit={this.props.edit} active={this.props.active} valueVisible={this.props.valueVisible} refresh={this.props.refresh} />
						}
						{
							!this.props.active.furniture['vehicle'].guideEBC &&
							<NoDataEbc edit={this.props.edit} valueVisible={this.props.valueVisible} active={this.props.active} refresh={this.props.refresh} />
						}
						<div className="input-sates placas">
							<label>Placas</label>
							<input type="text"
								value={this.props.active.furniture['vehicle'].carPlates}
								onChange={(e) => { this.props.active.furniture['vehicle'].carPlates = e.target.value, this.props.refresh() }}
							/>
						</div>
					{/* {
                 this.props.active.destination === 'Administracion' && this.props.valueVisible.value === 2 &&
                <Administration active={this.props.active} refresh={this.props.refresh} edit={this.props.edit}  />
				} */}
				
				{/* this.props.valueVisible.value = 2 */}
					

					
					{/* {this.props.active.destination === "SUBASTA" &&
						<div className="row">
							<Subasta events={this.props.events}
								lotAvailable={this.props.lotAvailable}
								warranty={this.props.warranty}
								numberEvent={this.props.numberEvent}
								numberLot={this.props.numberLot}
								active={this.props.active}
								refresh={this.props.refresh} />
						</div>
					}
					{this.props.active.destination === "VENTA DIRECTA" &&
						<div className="row">
							<DirectSale active={this.props.active} refresh={this.props.refresh} />
						</div>
					} */}
				</div>
			</div>
		)
   }
}
