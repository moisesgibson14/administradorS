import React from 'react'
import { UncontrolledTooltip } from 'reactstrap'
import InfiniteCalendar from 'react-infinite-calendar'

const DocumentChildrenActivity = (props) => (
    <div className="row">
        <div className="col col-md-5">
            <div className="alert alert-success" role="alert">
                {props.activityChild.label}
            </div>
        </div>
        <div className="col col-md-1">
            <UncontrolledTooltip placement="bottom" target={`toltipUpload${props.indexFather}${props.indexChildren}`}>
                SUBIR DOCUMENTO
            </UncontrolledTooltip>
            <label id={`toltipUpload${props.indexFather}${props.indexChildren}`}
                style={{ cursor: 'pointer' }}
                onClick={() => props.assignPositions(props.indexFather, props.indexChildren)}
                className="btn btn-light" htmlFor="handleUploadDocumentActivity"><i className="fa fa-upload"></i>
            </label>
        </div>
        {
            props.activityChild.url !== '' &&
            <div className="col col-md-5 row">
                <div className="col col-md-2">
                    <UncontrolledTooltip placement="bottom" target={`toltipView${props.indexFather}${props.indexChildren}`}>
                        VER DOCUMENTO
                    </UncontrolledTooltip>
                    <a id={`toltipView${props.indexFather}${props.indexChildren}`} className="btn btn-light" data-fancybox={`fancy${props.indexFather}${props.indexChildren}`} data-type="iframe" data-src={props.activityChild.url} href="javascript:;">
                        <i className="fa fa-eye"></i>
                    </a>
                </div>
                <div className="col col-md-2">
                    <UncontrolledTooltip placement="bottom" target={`toltipDateDpcument${props.indexFather}${props.indexChildren}`}>
                        FECHA DEL DOCUMENTO
                    </UncontrolledTooltip>
                    <button type="button" id={`toltipDateDpcument${props.indexFather}${props.indexChildren}`} className="btn btn-light" data-target={`#modalDateDocument${props.indexFather}${props.indexChildren}`} data-toggle="modal">
                        <i className="fa fa-calendar"></i>
                    </button>
                    <div className="modal fade" id={`modalDateDocument${props.indexFather}${props.indexChildren}`} tabIndex="-1" role="dialog" aria-labelledby="Hola mundo!" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <InfiniteCalendar
                                        width={450}
                                        height={200}
                                        selected={props.activityChild.dateOfTheDocument}
                                        onSelect={(date) => { props.activityChild.dateOfTheDocument = date, props.refresh() }}
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
                </div>
                <div className="col col-md-2">
                    <UncontrolledTooltip placement="bottom" target={`toltipNotes${props.indexFather}${props.indexChildren}`}>
                        DESCRIPCIÓN DEL DOCUMENTO
                    </UncontrolledTooltip>
                    <button type="button" id={`toltipNotes${props.indexFather}${props.indexChildren}`} className="btn btn-light" data-target={`#modal${props.indexFather}${props.indexChildren}`} data-toggle="modal">
                        <i className="fa fa-sticky-note"></i>
                    </button>
                    <div className="modal fade" id={`modal${props.indexFather}${props.indexChildren}`} tabIndex="-1" role="dialog" aria-labelledby={`${props.indexChildren}`} aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Notas {props.activityChild.label}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="paper">
                                        <div className="paper-content bodyNote">
                                            <textarea value={props.activityChild.notes} onChange={(e) => { props.activityChild.notes = e.target.value, props.refresh() }} autoFocus></textarea>
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
                <div className="col col-md-2">
                    <UncontrolledTooltip placement="bottom" target={`toltipUoloadInterpretation${props.indexFather}${props.indexChildren}`}>
                        SUBIR INTERPRETACIÓN
                    </UncontrolledTooltip>
                    <label id={`toltipUoloadInterpretation${props.indexFather}${props.indexChildren}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => props.assignPositions(props.indexFather, props.indexChildren)}
                        className="btn btn-light" htmlFor="handleUploadDocumentInterpretation"><i className="fas fa-cloud-upload-alt"></i>
                    </label>
                </div>
                {
                    props.activityChild.urlInterpretation &&
                    <div className="col col-md-2">
                        <UncontrolledTooltip placement="bottom" target={`toltipViewInterpretation${props.indexFather}${props.indexChildren}`}>
                            VER INTERPRETACIÓN
                         </UncontrolledTooltip>
                        <a id={`toltipViewInterpretation${props.indexFather}${props.indexChildren}`} className="btn btn-light" data-fancybox={`fancy${props.indexFather}${props.indexChildren}`} data-type="iframe" data-src={props.activityChild.urlInterpretation} href="javascript:;">
                            <i className="fa fa-eye"></i>
                        </a>
                    </div>
                }
            </div>
        }
        <div className="col col-md-1">
            <UncontrolledTooltip placement="bottom" target={`toltipDeleteChildren${props.indexFather}${props.indexChildren}`}>
                ELIMINAR DOCUMENTO
            </UncontrolledTooltip>
            <button onClick={() => props.handleDeleteChildrenActivity(props.indexFather, props.indexChildren)} type="button" id={`toltipDeleteChildren${props.indexFather}${props.indexChildren}`} className="btn btn-warning"><i className="fa fa-trash"></i> </button>
        </div>
        <input style={{ display: 'none' }} onChange={(e) => props.handleUploadDocumentActivity(e)} type="file" id="handleUploadDocumentActivity" />
        <input style={{ display: 'none' }} onChange={(e) => props.handleUploadDocumentActivityInterpretation(e)} type="file" id="handleUploadDocumentInterpretation" />
    </div>
)


export default DocumentChildrenActivity