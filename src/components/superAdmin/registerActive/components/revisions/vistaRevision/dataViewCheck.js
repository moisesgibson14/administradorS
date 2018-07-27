import React, { Component } from 'react'

class DataViewCheck extends Component {
    constructor(props) {
        super(props)

        this.state = {
            perfil: '',
            upload: false,
            percentege: 0
        }

        this.openFancy = this.openFancy.bind(this)
    }


    openFancy(x, y) {
        $(document).ready(function () {
            $('#0fancy' + x + y).click()
        });
    }

    render() {
        return (
            <div className="row" >
                {this.props.type === 'construccion' &&
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <div className="input-group">
                            <span className="input-group-addon">{'Tipo de ' + this.props.label + '*'}</span>
                            <input type="text" className="form-control" aria-label="proximaRevision" defaultValue={this.props.dataBasic.type} readOnly />
                        </div>
                    </div>
                }
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <div className="input-group">
                        <span className="input-group-addon">{'Nombre de ' + this.props.label + '*'}</span>
                        <input type="text" className="form-control" aria-label="proximaRevision" defaultValue={this.props.dataBasic.name} readOnly />
                    </div>
                </div>
                {this.props.type === 'activo' &&
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <div className="input-group">
                            <span className="input-group-addon">Número de activos</span>
                            <input type="number" className="form-control" aria-label="proximaRevision" defaultValue={this.props.dataBasic.numberAsset} readOnly />
                        </div>
                    </div>
                }
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <div className="input-group">
                        <span className="input-group-addon">ID QR</span>
                        <input type="text" className="form-control" aria-label="proximaRevision" defaultValue={this.props.dataBasic.idQR} readOnly />
                    </div>
                </div>
                {this.props.type === 'activo' &&
                    <div className="col-12 mb-3 " >
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <div className="input-group">
                                    <span className="input-group-addon">Marca</span>
                                    <input type="text" className="form-control" aria-label="proximaRevision" defaultValue={this.props.dataBasic.brand} readOnly />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 mb-3">
                                <div className="input-group">
                                    <span className="input-group-addon">Modelo</span>
                                    <input type="text" className="form-control" aria-label="proximaRevision" defaultValue={this.props.dataBasic.model} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-12 mb-3 ">
                    <label htmlFor="">Descripción:</label>
                    <textarea className="form-control maxHeight" defaultValue={this.props.dataBasic.description} readOnly />
                </div>
                <div className="col-12 mb-3 ">
                    <div className="">
                        <span className="">Condiciones generales*</span>
                        <div className="col-12" >
                            <form action="" className="formulario">
                                <div className="radio">
                                    <input type="radio" name="typeRevision" id={'Excelentes' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'Excelentes'} readOnly />
                                    <label className="col-12 col-sm-6 col-md-3 col-xl-2" htmlFor={'Excelentes' + this.props.label + this.props.index}>Excelentes</label>

                                    <input type="radio" name="typeRevision" id={'Buenas' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'Buenas'} readOnly />
                                    <label className="col-12 col-sm-6 col-md-3 col-lg-2" htmlFor={'Buenas' + this.props.label + this.props.index}>Buenas</label>

                                    <input type="radio" name="typeRevision" id={'Regulares' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'Regulares'} readOnly />
                                    <label className="col-12 col-sm-6 col-md-3 col-lg-2" htmlFor={'Regulares' + this.props.label + this.props.index}>Regulares</label>

                                    <input type="radio" name="typeRevision" id={'Malas' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'Malas'} readOnly />
                                    <label className="col-12 col-sm-6 col-md-3 col-lg-2" htmlFor={'Malas' + this.props.label + this.props.index}>Malas</label>

                                    <input type="radio" name="typeRevision" id={'MuyMalas' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'Muy malas'} readOnly />
                                    <label className="col-12 col-sm-6 col-md-3 col-lg-2" htmlFor={'MuyMalas' + this.props.label + this.props.index}>Muy malas</label>

                                    <input type="radio" name="typeRevision" id={'EnObra' + this.props.label + this.props.index} checked={this.props.dataBasic.conditions.label === 'En obra'} readOnly />
                                    <label className="col-12 col-sm-6 col-md-3 col-lg-2" htmlFor={'EnObra' + this.props.label + this.props.index}>En obra</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {this.props.dataBasic.conditions.photosUrl.length > 0 &&
                    <div className="col-3 col-sm-2 col-md-1">
                        {this.props.dataBasic.conditions.photosUrl.map((image, index) => {
                            return (
                                <a key={index} href={image} style={{ display: 'none' }} className="btn btn-outline-dark mr-1" id={index + 'fancy' + this.props.label + this.props.index} data-fancybox={'fancy' + this.props.label + this.props.index}>
                                </a>
                            )
                        })}
                        <button className="btn btn-outline-dark mr-1" onClick={() => this.openFancy(this.props.label, this.props.index)} ><i className="fa fa-eye" aria-hidden="true"></i></button>
                    </div>
                }
                <div className="col-7">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end ">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DataViewCheck