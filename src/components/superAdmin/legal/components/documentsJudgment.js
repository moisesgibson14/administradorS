import React, { Component } from 'react'
import { InputText } from '../../../../swaIInputs'
import { UncontrolledTooltip } from 'reactstrap'
import InfiniteCalendar from 'react-infinite-calendar'
import { uploadFiles, deleteFiles } from '../../../../uploadFiles'

export class DocumentsJudgment extends Component {

    constructor(props) {
        super(props)

        this.state = {
            percentege: 0,
            upload: ''
        }

        // this.newClidren = this.newClidren.bind(this)
        this.handleUploadDocumentLegal = this.handleUploadDocumentLegal.bind(this)
        this.handleUploadDocumentInterpretation = this.handleUploadDocumentInterpretation.bind(this)
        this.handleDeleteChildren = this.handleDeleteChildren.bind(this)
        this.childMenu = this.childMenu.bind(this)
    }

    componentDidMount() {
        console.log('La documentacion', this.props)
    }

    // newClidren() {

    //     InputText('TÍTULO:', (data) => {
    //         let children = {
    //             dateOfTheDocument: new Date(),
    //             label: data,
    //             notes: '',
    //             url: '',
    //             urlInterpretation: ''
    //         }

    //         this.props.documentation.children = this.props.documentation.children.concat(children)

    //         this.props.refresh()
    //     })
    // }

    handleUploadDocumentLegal(e, i) {
        uploadFiles(e, (data) => {
            console.log(this.props.documentation.children)
            this.props.documentation.children[i].url = data[0]
            this.props.refresh()
            this.setState({upload:''})
        }, (porcentaje) => {
            this.setState({ upload: i })

            this.setState({ percentege: Math.round(porcentaje) })
        }, 'documentsState')
    }

    handleUploadDocumentInterpretation(e, i) {
        uploadFiles(e, (data) => {
            console.log(this.props.documentation.children)
            this.props.documentation.children[i].urlInterpretation = data[0]
            this.props.refresh()
            this.setState({upload:''})
        }, (porcentaje) => {
            this.setState({ upload: i })

            this.setState({ percentege: Math.round(porcentaje) })
        }, 'documentsState')
    }

    handleDeleteChildren(index) {
        this.props.documentation.children.splice(index, 1)

        this.props.refresh()
    }

    childMenu (i) {
        $('.docJudMenu').fadeOut(100)
        $('.docJudMenu' + i).fadeIn(150)
    
        $('body').click(() => {
            $('.docJudMenu').fadeOut('fast');
          })
    }

    render() {
        let documents = this.props.documentation
        let i = this.props.IJ
        return (
            <div className="flex-sates">
                {documents.children.map((document, index) => {
                    return (
                        <div className="docJudgeItem flex-sates" key={index} >
                            <div className="docJudHead">
                                <span><i className="far fa-file-alt"></i></span>
                                <label>{document.label}</label>
                            </div>

                            <div className="docJudBtns">
                                <UncontrolledTooltip placement="bottom" target={'a' + i +`toltipUpload` + index}>
                                    SUBIR DOCUMENTO
                                </UncontrolledTooltip>
                                <label id={'a' + i +`toltipUpload` + index}
                                    style={{ cursor: 'pointer' }}
                                    className="btnJudDoc" htmlFor={'a' + i +'handleUploadDocumentLegal' + index}><i className="fa fa-upload"></i>
                                </label>

                                <UncontrolledTooltip placement="bottom" target={'a' + i +`toltipDeleteChildren` + index}>
                                    ELIMINAR DOCUMENTO
                                </UncontrolledTooltip>
                                <button onClick={() => this.handleDeleteChildren(index)} type="button" id={'a' + i +`toltipDeleteChildren` + index} className="btnJudDoc"><i className="fa fa-trash"></i> </button>
                                {
                                    document.url !== '' &&
                                    <button className="btnJudDoc" onClick={() => this.childMenu(index)}><i className="fas fa-ellipsis-v"></i></button>
                                }


                                {
                                document.url !== '' &&
                                <div className={`docJudMenu docJudMenu${index}`}>
                                    <div>
                                        {/* <UncontrolledTooltip placement="bottom" target={'a' + i +`toltipView` + index}>
                                            VER DOCUMENTO
                                        </UncontrolledTooltip> */}
                                        <a id={'a' + i +`toltipView` + index} className="btnJudDoc" data-fancybox={'a' + i +`fancy` + index} data-type="iframe" data-src={document.url} href="javascript:;">
                                            <i className="fa fa-eye"></i> Ver
                                        </a>
                                    </div>
                                    <div>
                                        {/* <UncontrolledTooltip placement="bottom" target={'a' + i +`toltipDateDpcument` + index}>
                                            FECHA DEL DOCUMENTO
                                        </UncontrolledTooltip> */}
                                        <button type="button" id={ 'a' + i +`toltipDateDpcument` + index} className="btnJudDoc" data-target={`#modalDateDocument` + index + 'a' + i} data-toggle="modal">
                                            <i className="fa fa-calendar"></i> Fecha
                                        </button>
                                        
                                    </div>
                                    <div>
                                        {/* <UncontrolledTooltip placement="bottom" target={'a' + i +`toltipNotes` + index}>
                                            DESCRIPCIÓN DEL DOCUMENTO
                                        </UncontrolledTooltip> */}
                                        <button type="button" id={'a' + i +`toltipNotes` + index} className="btnJudDoc" data-target={`#modal` + index + i} data-toggle="modal">
                                            <i className="fa fa-sticky-note"></i> Descripción
                                        </button>
                                        
                                    </div>

                                    <div>
                                        {/* <UncontrolledTooltip placement="bottom" target={'a' + i +`toltipUoloadInterpretation` + index}>
                                            SUBIR INTERPRETACIÓN
                                        </UncontrolledTooltip> */}
                                        <label id={'a' + i +`toltipUoloadInterpretation` + index}
                                            style={{ cursor: 'pointer' }}
                                            className="btnJudDoc" htmlFor={'a' + i +'handleUploadDocumentInterpretation' + index}><i className="fas fa-cloud-upload-alt"></i> Interpretación
                                        </label>
                                    </div>
                                    {
                                        document.urlInterpretation &&
                                        <div className="col col-md-2">
                                            <UncontrolledTooltip placement="bottom" target={i +`toltipViewInterpretation` + index}>
                                                VER INTERPRETACIÓN
                                            </UncontrolledTooltip>
                                            <a id={'a' + i +`toltipViewInterpretation` + index} className="btnJudDoc" data-fancybox={`fancy`} data-type="iframe" data-src={document.urlInterpretation} href="javascript:;">
                                                <i className="fa fa-eye"></i>
                                            </a>
                                        </div>
                                    }
                                </div>
                            }

                            {this.state.upload === index &&
                                <div className="progress mb-3 mt-3 col-12">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>
                                        {this.state.percentege}%
                                    </div>
                                </div>
                            }

                            <div className="modal fade" id={`modal` + index + i} tabIndex="-1" role="dialog" aria-labelledby={`${index}`} aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Notas {document.label}</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="paper">
                                                <div className="paper-content bodyNote">
                                                    <textarea value={document.notes} onChange={(e) => { document.notes = e.target.value, this.props.refresh() }} autoFocus></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id={`modalDateDocument` + index + 'a' + i} tabIndex="-1" role="dialog" aria-labelledby="Hola mundo!" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <InfiniteCalendar
                                                width={450}
                                                height={200}
                                                selected={document.dateOfTheDocument}
                                                onSelect={(date) => { document.dateOfTheDocument = date, this.props.refresh() }}
                                                locale={{
                                                    locale: require('date-fns/locale/es'),
                                                    headerFormat: 'dddd, D MMM',
                                                    weekdays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                                                    blank: 'Selecione la fecha',
                                                    todayLabel: {
                                                        long: 'Hoy',
                                                        short: 'Hoy'
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input style={{ display: 'none' }} onChange={(e) => this.handleUploadDocumentLegal(e, index)} type="file" id={ 'a' + i +'handleUploadDocumentLegal' + index} />
                            <input style={{ display: 'none' }} onChange={(e) => this.handleUploadDocumentInterpretation(e, index)} type="file" id={'a' + i +'handleUploadDocumentInterpretation' + index} />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default DocumentsJudgment
