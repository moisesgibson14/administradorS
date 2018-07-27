import React, { Component } from 'react'
import { InputGroupAddon, UncontrolledTooltip } from 'reactstrap'
import { uploadFiles } from '../../../../../../../../uploadFiles'
import { confirmRequest, InputText } from '../../../../../../../../swaIInputs'
import $ from 'jquery'
import '../../../styles/modalStatic.css'

export default class MultipleImages extends Component {
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

    handleUploadImages(e,i) {
        if (e.target.files.length > 0) {
            this.setState({ upload: false })
            uploadFiles(e, (files) => {
                let filesTMP = []
                files.forEach(file => {
                    filesTMP.push(file)
                })
                this.setState({ upload: true })
                this.props.data.images[this.state.indexExternal].urls = this.props.data.images[this.state.indexExternal].urls.concat(filesTMP)
                this.props.refresh()
            }, (percentege) => {
                // this.setState({ upload: i })
                this.setState({ percentege: Math.round(percentege) })           
                }, 'imagesRevisionsFurniture')
        }
    }

    handleAssingImages(index) {
        let imagesTMP = []
        this.props.data.images[this.state.indexExternal].urls.forEach(img => {
            imagesTMP.push(img)
        })
        this.setState({
            imagesDeleteTMP: imagesTMP
        })
    }

    handleDeleteImages(index, all) {
        if (all) {
            confirmRequest('¿Estas seguro?', 'Al confirmar no se podrán recuperar las fotos', (value) => {
                if (value) {
                    this.props.data.images[this.state.indexExternal].urls = []
                    this.state.imagesDeleteTMP = []
                    if (this.state.imagesDeleteTMP.length < 1) {
                        $('#click').click()
                    }
                    this.props.refresh()
                }
            })
        } else {
            this.props.data.images[this.state.indexExternal].urls.splice(index, 1)
            this.state.imagesDeleteTMP.splice(index, 1)
            if (this.state.imagesDeleteTMP.length < 1) {
                $('#click').click()
            }
            this.props.refresh()
        }
    }

    handleNewAlbum() {
        InputText('Ingrese nombre para el álbum: ', (value) => {
            if (value) {
                let newAlbum = {
                    label: value,
                    urls: []
                }
                this.props.data.images.push(newAlbum)
                this.props.refresh()
            }
        })
    }

    handleDeleteAlbum(index) {
        confirmRequest('¿Estas seguro?', 'Al confirmar no se podrá recuperar el álbum', (value) => {
            if (value) {                
                this.props.data.images.splice(index, 1)
                this.props.refresh()
            }
        })
    }
    render() {
        let { upload } = this.state
        return (
            <div>
                <div className="alert alert-dark text-center" role="alert">
                    <strong>IMÁGENES</strong>
                </div>                            
                    <div>
                        {
                            this.props.data.images.map((imageDocumentation, indexImgRevision) => (
                                <div className="row" key={indexImgRevision}>
                                    <div className="col-md-6 col-12 text-center">
                                        <div className="alert alert-info" role="alert">
                                            {imageDocumentation.label}
                                        </div>
                                    </div>
                                    <div className="col col-md-1 col-2">
                                        <UncontrolledTooltip placement="bottom" target={`toltipUpImg${indexImgRevision}`}>
                                            Click para subir imágenes
                                        </UncontrolledTooltip>
                                        <div className="col col-xs-12 col-md-2 mr-1">
                                            <label onClick={() => this.setState({ indexExternal: indexImgRevision })} id={`toltipUpImg${indexImgRevision}`}
                                                style={{ cursor: 'pointer' }}
                                                className="btn btn-light"
                                                htmlFor="uploadImagesExternal"><i className="fa fa-upload"></i>
                                            </label>
                                            <input
                                                onChange={(e) => this.handleUploadImages(e)}
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                                multiple
                                                capture="camera"
                                                type="file" id="uploadImagesExternal" />
                                        </div>
                                    </div>    
                                    {imageDocumentation.urls.length > 0 &&
                                    <div className="col col-md-1 col-2 mr-2">
                                        {
                                            imageDocumentation.urls.map((image, indexImage) => (
                                                <div key={indexImage}>
                                                    {
                                                        indexImage === 0 &&
                                                    <div className="col col-xs-12 col-md-2 mr-1">
                                                        <a className="btn btn-light" href={image} data-fancybox={`fancyImg${indexImgRevision}`} data-caption="Hola mundo">
                                                            <i className="fa fa-eye"></i>
                                                        </a>
                                                    </div>
                                                    }
                                                    {
                                                        indexImage > 0 &&
                                                    <div className="col col-xs-12 col-md-2 mr-1">
                                                        <a href={image} data-fancybox={`fancyImg${indexImgRevision}`} data-caption="Hola mundo">
                                                        </a>
                                                    </div>
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    }
                                    {
                                    indexImgRevision > 1 &&
                                    <div className="col col-md-1 col-2 mr-2">
                                            <div className="col col-xs-12 col-md-2 mr-1">
                                                <button onClick={() => this.handleDeleteAlbum(indexImgRevision)} type="button" className="btn btn-danger">
                                                    <i className="fa fa-minus-circle"></i>
                                                </button>
                                            </div>
                                    </div>
                                    }
                                    {
                                        imageDocumentation.urls.length > 0 &&
                                        <div className="col col-md-2 col-2">
                                            <UncontrolledTooltip placement="bottom" target={`toltipDeleteImgEspecific${indexImgRevision}`}>
                                                Eliminar imágenes
                                            </UncontrolledTooltip>
                                            <button type='button'
                                                onClick={() => { this.handleAssingImages(indexImgRevision), this.setState({ indexFather: indexImgRevision }) }}
                                                className="btn btn-danger" id={`toltipDeleteImgEspecific${indexImgRevision}`}
                                                data-toggle="modal" data-target="#deleteImagesDocRevision"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>

                                            <div className="modal fade" id="deleteImagesDocRevision" tabIndex="-1" role="dialog" aria-labelledby="deleteImagesDocRevision" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <strong className="modal-title" id="exampleModalLabel">ELiminar todas</strong>
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
                                                                        this.state.imagesDeleteTMP.map((image, indexImageRevision) => (
                                                                            <div key={indexImageRevision}>
                                                                                <div className="row mb-3 align-items-center">
                                                                                    <div className="col col-md-5">
                                                                                        <img src={image} width={100} height={100} />
                                                                                    </div>
                                                                                    <div className="col col-md-5">
                                                                                        <button onClick={() => this.handleDeleteImages(indexImageRevision, false)}
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
                                </div>
                            ))
                        }
                        {
                            upload === false &&
                            <div className="progress mb-3">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>
                                    {this.state.percentege}%
                                </div>
                            </div>
                        }
                        <button onClick={() => this.handleNewAlbum()} type="button" className="btn btn-success float-right mb-3">
                            <i className="fa fa-plus-square"></i>
                        </button>
                    </div>               
            </div>
        )
    }
}
