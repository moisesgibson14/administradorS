import React, { Component } from 'react'
import { InputText, confirmRequest } from '../../../../../../swaIInputs'
import { uploadFiles } from '../../../../../../uploadFiles'
import { UncontrolledTooltip } from 'reactstrap';
import '../styles/stylesNotes.css'
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'
import $ from 'jquery'

export default class AdministrativeDocumentation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      indexFather: 0,
      indexChildren: 0,
      refresh: '',
      percentege: 0,
      upload: true
    }
    this.handleNewFhater = this.handleNewFhater.bind(this)
    this.handleNewChildren = this.handleNewChildren.bind(this)
    this.handleUploadDocumentAdministration = this.handleUploadDocumentAdministration.bind(this)
    this.handleDeleteChildren = this.handleDeleteChildren.bind(this)
    this.handleDeleteFather = this.handleDeleteFather.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openChild = this.openChild.bind(this);
  }

  handleNewFhater() {
    InputText('INGRESE EL NOMBRE DEL DOCUMENTO: ', (value) => {
      if (value) {
        let newFather = {
          mainLabel: value,
          children: []
        }
        this.props.active.furniture['vehicle'].administration['administrativeDocumentation'].push(newFather)
        this.props.refresh()
      }
    })
  }
  handleNewChildren(index) {
    InputText('INGRESE EL NOMBRE: ', (value) => {
      if (value) {
        let newChildren = {
          label: value,
          urlDocument: '',
          notes: '',
          dateOfTheDocument: new Date()
        }
        this.props.active.furniture['vehicle'].administration['administrativeDocumentation'][index].children.push(newChildren)
        
        this.props.refresh()
      }
      this.openChild(index)
    })
  }
  handleUploadDocumentAdministration(e) {
    this.setState({upload: false})
    uploadFiles(e, (file) => {
      this.props.active.furniture['vehicle'].administration['administrativeDocumentation'][this.state.indexFather].children[this.state.indexChildren].urlDocument = ''
      this.props.refresh()
      this.props.active.furniture['vehicle'].administration['administrativeDocumentation'][this.state.indexFather].children[this.state.indexChildren].urlDocument = file[0]
      this.props.refresh()
      this.setState({upload: true})
    }, (percentege) => {
            this.setState({percentege: Math.round(percentege) })
    }, 'documentsFurniture')
  }

  handleDeleteChildren(indexFather, indexChildren) {
    confirmRequest('¿ESTAS SEGURO DE ELIMINAR ESTE DOCUMENTO?', 'AL CONFIRMAR NO SE PODRA RECUPERAR EL ARCHIVO!', (value) => {
      if(value) {
        this.props.active.furniture['vehicle'].administration['administrativeDocumentation'][indexFather].children.splice(indexChildren, 1)
        this.props.refresh()
      }
    })
  }
  handleDeleteFather(indexFather) {
    confirmRequest('¿ESTAS SEGURO?', 'AL CONFIRMAR NO SE PODRÁN RECUPERAR LOS ARCHIVOS', (value) => {
      if (value) {
        this.props.active.furniture['vehicle'].administration['administrativeDocumentation'].splice(indexFather, 1)
        this.props.refresh()
      }
    })
  }
  openModal(index) {
    var modal = document.querySelector('#modal2' + index),
      cerrar = document.querySelector('#close' + index),
      bg = document.querySelector('.mask');

    modal.classList.toggle('tes-modal-active');
    bg.classList.toggle('modal-bg')
  }
  closeModal(index) {
    var modal = document.querySelector('#modal2' + index),
      bg = document.querySelector('.mask');
    modal.classList.remove('tes-modal-active');
    bg.classList.toggle('modal-bg')
  }

  openChild(indexDoc) {
    $('.doc-child-hide').slideUp()
    $('.doc-child'+indexDoc).slideToggle()
  }

  render() {
    let {upload} = this.state
    let administrativeDocumentation = this.props.active.furniture['vehicle'].administration['administrativeDocumentation']
    return (
      <div className="documents-sec flex-sates">
        {
          administrativeDocumentation.map((docummentt, indexFather) => (
            <div className="documents-item" key={indexFather}>
              <div className="doc-head" onClick={() => this.openChild(indexFather)}>
                <span className="folder far fa-folder"></span>
                <p className="documents-title">{docummentt.mainLabel}</p>
                <button onClick={() => this.handleNewChildren(indexFather)} className="add-document" type="button" ><i className="fa fa-plus-circle"></i></button>
              </div>

              {
                indexFather > 4 &&
                <button onClick={() => this.handleDeleteFather(indexFather)} type="button" ><i className="fa fa-minus-circle"></i></button>
              }
              {
                indexFather > 4 &&
                <button onClick={() => this.handleDeleteFather(indexFather)} type="button" ><i className="fa fa-minus-circle"></i></button>
              }

              {
                docummentt.children.map((documentChildren, indexChildren) => (
                  <div className={`doc-child-hide doc-child${indexFather}`}>
                  <div className="documents-child flex-sates" key={indexChildren}>
                    <div>
                      <span className="docum far fa-file-alt"></span>
                      <p>{documentChildren.label}</p>
                    </div>
                    
                    <div className="documents-child-btns">
                      <UncontrolledTooltip placement="bottom" target={`toltipUpload${indexFather}${indexChildren}`}>
                        Subir documento
                      </UncontrolledTooltip>
                      <label className-="doc-btn" id={`toltipUpload${indexFather}${indexChildren}`} style={{ cursor: 'pointer' }} onClick={() => this.setState({ indexFather: indexFather, indexChildren: indexChildren })} htmlFor="uploadDocumentAdministration"><i className="fa fa-upload"></i> </label>

                      {
                      documentChildren.urlDocument !== '' &&
                      <div className="btn-act">
                        <UncontrolledTooltip placement="bottom" target={`toltipView${indexFather}${indexChildren}`}> Ver documento </UncontrolledTooltip>
                        <a id={`toltipView${indexFather}${indexChildren}`} className-="doc-btn" data-fancybox={`fancy${indexFather}${indexChildren}`} data-type="iframe" data-src={documentChildren.urlDocument} href="javascript:;">
                          <i className="fa fa-eye"></i>
                        </a>

                        <div>
                          <UncontrolledTooltip placement="bottom" target={`toltipNotes${indexFather}${indexChildren}`}> Agregar notas al documento </UncontrolledTooltip>
                          <button type="button" id={`toltipNotes${indexFather}${indexChildren}`} className-="doc-btn" data-target={`#modal${indexFather}${indexChildren}`} data-toggle="modal">
                            <i className="fa fa-sticky-note"></i>
                          </button>
                          <div className="modal fade" id={`modal${indexFather}${indexChildren}`} tabIndex="-1" role="dialog" aria-labelledby={`${indexChildren}`} aria-hidden="true">
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">Notas {documentChildren.label}</h5>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <div className="paper">
                                    <div className="paper-content bodyNote">
                                      <textarea value={documentChildren.notes} onChange={(e) => { documentChildren.notes = e.target.value, this.props.refresh() }} autoFocus></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          {/* <UncontrolledTooltip placement="bottom" target={`toltipDateDpcument${indexFather}${indexChildren}`}>
                                Agregar fecha del documento
                              </UncontrolledTooltip> */}
                          <button type="button" className-="doc-btn" aria-hidden="true" onClick={() => this.openModal(indexChildren)} >
                            <i className="fa fa-calendar"></i>
                          </button>
                          <div className="tes-modal" id={'modal2' + indexChildren} >
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
                                selected={documentChildren.dateOfTheDocument}
                                onSelect={(date) => { documentChildren.dateOfTheDocument = date, this.setState({ refresh: '' }) }} />
                              <span className="cerrar" id={'close' + '' + indexChildren} onClick={() => this.closeModal(indexChildren)} >X</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    <UncontrolledTooltip placement="bottom" target={`toltipDeleteDocument${indexFather}${indexChildren}`}> Eliminar documento </UncontrolledTooltip>
                    <button onClick={() => this.handleDeleteChildren(indexFather, indexChildren)} type="button" id={`toltipDeleteDocument${indexFather}${indexChildren}`} className="doc-btn"><i className="fa fa-trash"></i> </button>

                    </div>
                    
                    <div className="mask" ></div>
                    
                  </div>
                  </div>
                ))
              }
            </div>
          ))
        }


        {
          upload === false &&
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>
              {this.state.percentege}%
            </div>
          </div>
        }
        <button onClick={() => this.handleNewFhater()} className="documents-item btn-add-doc" type="button" >Agregar documento</button>
        <input style={{ display: 'none' }} onChange={(e) => this.handleUploadDocumentAdministration(e)} type="file" id="uploadDocumentAdministration" />
      </div>
    )
  }
}
