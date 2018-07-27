import React, { Component } from 'react';
import { InputText, confirmRequest } from '../../../../../../../../swaIInputs'
import { uploadFiles } from '../../../../../../../../uploadFiles'
import '../../../styles/stylesNotes.css'
import InfiniteCalendar from 'react-infinite-calendar';
import { UncontrolledTooltip } from 'reactstrap'
import $ from 'jquery'

class DocumentationRevision extends Component {
    constructor(props) {
        super(props)
        this.handleNewDocument = this.handleNewDocument.bind(this)
        this.saveDate = this.saveDate.bind(this)
        this.deleteImg = this.deleteImg.bind(this)
        this.deleteReport = this.deleteReport.bind(this)
        this.clickFancy = this.clickFancy.bind(this)
        this.handleDeleteDocumentFiles = this.handleDeleteDocumentFiles.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)

        this.state = {
            indexImg: 0,
            indexFile: 0,
            upload: true,
            upload2: true,
            percentage: 0,
            percentage2: 0,
            date: new Date()
        }
    }
    saveDate(tem) {
        this.props.data.documentationInTheAsset[i].date = this.state.date
        this.setState({
            date: new Date()
        })
        $(document).ready(function () {
            $('#close' + i).click()
        });
    }
    deleteImg(index) {
        confirmRequest('¿Estas seguro de eliminar?', 'Se borrara definitivamente', (ok) => {
            if (ok) {
                this.props.data.images.splice(index, 1)
                this.props.refresh()
            }
        })
    }
    deleteReport(indexDocument) {
        confirmRequest('¿Estas seguro de eliminar?', 'Se borrara definitivamente', (ok) => {
            if (ok) {
                this.props.data.documentationInTheAsset.splice(indexDocument, 1)
                this.props.refresh()
            }
        })
    }

    hanldeUploadDocument(e,i) {
        if (e.target.files.length > 0) {
            this.setState({ upload2: false })
            uploadFiles(e, (link) => {
                let index = this.state.indexFile
                this.props.data.documentationInTheAsset[index].url = ''
                this.props.data.documentationInTheAsset[index].url = link[0]
                this.setState({ upload2: true })
                this.props.refresh()
            }, (percentage2) => {
                this.setState({ upload2: i })
                this.setState({ percentage2: Math.round(percentage2) })
            }, 'imagesRevisionsFurniture/'
            )
        }
    }
    handleNewAnotation(e, index) {
        InputText('Ingrese: ', (value) => {
            if (value) {
                this.props.data.documentationInTheAsset[index].note = this.props.data.documentationInTheAsset[index].note.concat(value)
                this.props.refresh()
            }
        })
    }
    handleNewDocument() {
        InputText('Ingrese un nombre de Documento: ', (value) => {
            if (value) {
                let label = value
                let documentationInTheAsset = {
                    date: new Date,
                    label: label,
                    note: '',
                    url: ''
                }
                this.props.data.documentationInTheAsset = this.props.data.documentationInTheAsset.concat(documentationInTheAsset)
                this.props.refresh()
            }
        })
    }
    handleDeleteDocumentFiles(index){
        confirmRequest('¿Estas seguro de eliminar?', 'Se borrara definitivamente', (ok) => {
            if (ok) {
                this.props.data.documentationInTheAsset[index].url = ''
                this.props.data.documentationInTheAsset[index].date = ''
                this.props.data.documentationInTheAsset[index].note = ''
                this.props.refresh()
            }
        })
    }

    clickFancy(index) {
        $('#fancy').click()
    }
    openModal(index) {
        var modal = document.querySelector('#modal2'+index),
            cerrar = document.querySelector('#close'+index),
            bg = document.querySelector('.mask');

        modal.classList.toggle('tes-modal-active');
        bg.classList.toggle('modal-bg')
    }
    closeModal(index) {
        var modal = document.querySelector('#modal2'+ index),
            bg = document.querySelector('.mask');
        modal.classList.remove('tes-modal-active');
        bg.classList.toggle('modal-bg')
    }


    render() {
        let { upload } = this.state
        let { upload2 } = this.state
        return (
            <div>
                <div className="alert alert-dark text-center" role="alert">
                    <strong>DOCUMENTACIÓN</strong>
                </div>  
                <div className="row">                    
                    <br />
                    <div className="col-md-12">                   
                        {this.props.data.documentationInTheAsset.map((documents, indexDocument) =>
                            <div key={indexDocument} className="row">
                                <div className="col-md-8 col-8 text-center">
                                    <div className="alert alert-primary" role="alert">
                                        {documents.label}
                                    </div>
                                </div>
                                <div className="col-2 col-xs-12 col-md-2">
                                    <label style={{ cursor: 'pointer' }} id={`upload${indexDocument}`} className="btn btn-secondary" htmlFor={`uploadImgDoc${indexDocument}`}>
                                        <i className="fa fa-upload" ></i>
                                    </label>
                                    <input id={`uploadImgDoc${indexDocument}`} style={{ display: 'none' }} type="file" onChange={(e) => { this.hanldeUploadDocument(e, indexDocument), this.setState({ indexFile: indexDocument }) }} />
                                </div>
                                <UncontrolledTooltip placement="bottom" target={`upload${indexDocument}`}>
                                    Subir nuevo documento
                                </UncontrolledTooltip>
                                    <div className="col-2 col-xs-12 col-md-2 ">
                                    {indexDocument > 2 &&
                                        <button type="buton" onClick={(e) => this.deleteReport(indexDocument)} className="btn btn-danger" >
                                            <i className="fa fa-minus-circle" ></i>
                                        </button>
                                    }
                                    </div>
                                
                                {this.props.data.documentationInTheAsset[indexDocument].url.length > 0 &&

                                    <div className="col-2 col-xs-12 col-md-1 ">
                                        <a style={{ height: '33px' }} className="btn btn-success " data-fancybox={'fancybox' + indexDocument} data-type="iframe" data-src={this.props.data.documentationInTheAsset[indexDocument].url} href="javascript:;">
                                            <i className="fa fa-eye fa-1x" />
                                        </a>
                                    </div>

                                }
                                {this.props.data.documentationInTheAsset[indexDocument].url.length > 0 &&
                                    <div className="col-2 col-xs-12 col-md-1 ">
                                        <button type="button" id={`toltipNotes${indexDocument}`} className="btn btn-light" data-target={`#modal${indexDocument}`} data-toggle="modal">
                                            <i className="fa fa-sticky-note"></i>
                                        </button>
                                    </div>
                                }
                                {/* Empezamos el apartado del modal de calendario */}
                                {this.props.data.documentationInTheAsset[indexDocument].url.length > 0 &&
                                    <div className="col-2 col-xs-12 col-md-1 ">
                                        <button type="button" className="btn btn-outline-dark mr-1" aria-hidden="true" onClick={() => this.openModal(indexDocument)} ><i className="fas fa-calendar-alt"></i></button>
                                    </div>
                                }
                                {this.props.data.documentationInTheAsset[indexDocument].url.length > 0 &&
                                    <div className="col-2 col-xs-12 col-md-1">
                                    <button onClick={() => this.handleDeleteDocumentFiles(indexDocument)} type="button" className="btn btn-danger">
                                            <i className="fa fa-trash-alt"></i>
                                    </button>
                                    </div>
                                }
                                <div className="modal fade" id={`modal${indexDocument}`} tabIndex="-1" role="dialog" aria-labelledby={``} aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="paper">
                                                    <div className="paper-content bodyNote">
                                                        <textarea value={documents.note} onChange={(e) => { documents.note = e.target.value, this.props.refresh() }} autoFocus></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tes-modal" id={'modal2' + indexDocument} >
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
                                            selected={documents.date}
                                            onSelect={(date) => { documents.date = date, this.props.refresh() }} />
                                        <span className="cerrar" id={'close'+''+ indexDocument} onClick={() => this.closeModal(indexDocument)} >X</span>
                                    </div>
                                </div>  
                                {
                                upload2 === indexDocument &&
                                <div className="col-12 col-xs-12 col-md-12 offset-12">
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage2}%` }}>{this.state.percentage2}%</div>
                                        </div>
                                </div>       
                                }                  
                                <br /><br />
                            </div>
                        )}
                        <div className="mask" ></div>
                        <button type="button" className="btn btn-success float-right mb-2" onClick={() => this.handleNewDocument()} >  <i className="fa fa-plus-square"></i></button>
                        <br />
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default DocumentationRevision;