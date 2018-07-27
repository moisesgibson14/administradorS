import React, { Component } from 'react'
import { InputGroup, InputGroupAddon } from 'reactstrap'
export default class NoDataEbc extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }
        if(!this.props.edit){
        this.props.active.furniture['vehicle'].priceBuyEbc = ''
        this.props.active.furniture['vehicle'].priceSaleEbc = ''
        this.props.active.furniture['vehicle'].brand = ''
        this.props.active.furniture['vehicle'].model = ''
        this.props.active.furniture['vehicle'].year = ''
        this.props.active.furniture['vehicle'].version = ''
        this.props.refresh()
        }        
    }
    render() {
        let titleLocal = this.props.active.furniture['vehicle'].brand + ' ' + this.props.active.furniture['vehicle'].model + ' ' + this.props.active.furniture['vehicle'].version + ' ' + this.props.active.furniture['vehicle'].year
        if (this.state.title !== '') {
            this.props.active.title = this.state.title
        } else {
            this.props.active.title = titleLocal
        }
        return (
            <div className="flex-sates">
                <div className="ebc-input flex-sates">
                    <div className="input-sates">
                        <label>Año: <span>*</span></label>
                        <input type="number"
                            value={this.props.active.furniture['vehicle'].year}
                            onChange={(e) => { this.props.active.furniture['vehicle'].year = e.target.value, this.props.valueVisible.value = 2, this.props.refresh() }} />
                    </div>

                    <div className="input-sates">
                        <label>Marca: <span>*</span></label>
                        <input type="text"
                            value={this.props.active.furniture['vehicle'].brand}
                            onChange={(e) => { this.props.active.furniture['vehicle'].brand = e.target.value,this.props.valueVisible.value = 2, this.props.refresh() }} />
                    </div>
                </div>

                <div className="ebc-input flex-sates">
                    <div className="input-sates">
                        <label>Modelo: <span>*</span></label>
                        <input type="text"
                            value={this.props.active.furniture['vehicle'].model}
                            onChange={(e) => { this.props.active.furniture['vehicle'].model = e.target.value, this.props.refresh() }} />
                    </div>
                    <div className="input-sates">
                        <label>Versión: <span>*</span></label>
                        <input type="text"
                            value={this.props.active.furniture['vehicle'].version}
                            onChange={(e) => { this.props.active.furniture['vehicle'].version = e.target.value, this.props.refresh() }} />
                    </div>
                </div>
                <div className="input-sates">
                    <label>Título <span>*</span></label>
                    <input type="text" value={this.props.active.title} onChange={(e) => { this.setState({ title: e.target.value }), this.props.refresh() }} />
                </div>
            </div>
        )
    }
}
