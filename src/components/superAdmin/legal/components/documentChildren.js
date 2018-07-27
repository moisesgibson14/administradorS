import React from 'react'
import { UncontrolledTooltip } from 'reactstrap'
import InfiniteCalendar from 'react-infinite-calendar'

const DocumentChildren = (props) => (
    <div className="flex-sates childDocI">

        <div className="childHead">
            <span className="docChildIcon"><i className="far fa-file-alt"></i></span>
            <p>{props.child.label}</p>
        </div>

			<div>
        <UncontrolledTooltip placement="bottom" target={`toltipUpload${props.indexFather}${props.indexChildren}`}>
            SUBIR DOCUMENTO
        </UncontrolledTooltip>
        <label id={`toltipUpload${props.indexFather}${props.indexChildren}`}
            style={{ cursor: 'pointer' }}
            onClick={() => props.assignPositions(props.indexFather, props.indexChildren)}
            htmlFor="handleUploadDocumentLegal"><i className="fa fa-upload"></i>
        </label>

        <div className={`childBtns childBtns${props.indexChildren}`}>
        {
            props.child.url !== '' &&
            <div>
    
                    {/* <UncontrolledTooltip placement="bottom" target={`toltipView${props.indexFather}${props.indexChildren}`}>
                        VER DOCUMENTO
                    </UncontrolledTooltip> */}
                    <a id={`toltipView${props.indexFather}${props.indexChildren}`} className="ChildDocBtn" data-fancybox={`fancy${props.indexFather}${props.indexChildren}`} data-type="iframe" data-src={props.child.url} href="javascript:;">
                        <i className="fa fa-eye"></i> VER
                    </a>

                
                    {/* <UncontrolledTooltip placement="bottom" target={`toltipDateDpcument${props.indexFather}${props.indexChildren}`}>
                        FECHA DEL DOCUMENTO
                    </UncontrolledTooltip> */}
                    <button type="button" className="ChildDocBtn" id={`toltipDateDpcument${props.indexFather}${props.indexChildren}`} data-target={`#modalDateDocument${props.indexFather}${props.indexChildren}`} data-toggle="modal">
                        <i className="fa fa-calendar"></i> FECHA
                    </button>
 
              
                    {/* <UncontrolledTooltip placement="bottom" target={`toltipNotes${props.indexFather}${props.indexChildren}`}>
                        DESCRIPCIÓN DEL DOCUMENTO
                    </UncontrolledTooltip> */}
                    <button type="button" className="ChildDocBtn" id={`toltipNotes${props.indexFather}${props.indexChildren}`}  data-target={`#modal${props.indexFather}${props.indexChildren}`} data-toggle="modal">
                        <i className="fa fa-sticky-note"></i> DESCRIPCIÓN
                    </button>
                    
                
                
                    {/* <UncontrolledTooltip placement="bottom" target={`toltipUoloadInterpretation${props.indexFather}${props.indexChildren}`}>
                        SUBIR INTERPRETACIÓN
                    </UncontrolledTooltip> */}
                    <label id={`toltipUoloadInterpretation${props.indexFather}${props.indexChildren}`}
                        style={{ cursor: 'pointer' }}
                        className="ChildDocBtn"
                        onClick={() => props.assignPositions(props.indexFather, props.indexChildren)}
                        htmlFor="handleUploadDocumentInterpretation"><i className="fas fa-cloud-upload-alt"></i> INTERPRETACIÓN
                    </label>
                
                {
                    props.child.urlInterpretation &&
                    <div>
                        {/* <UncontrolledTooltip placement="bottom" target={`toltipViewInterpretation${props.indexFather}${props.indexChildren}`}>
                            VER INTERPRETACIÓN
                         </UncontrolledTooltip> */}
                        <a id={`toltipViewInterpretation${props.indexFather}${props.indexChildren}`} data-fancybox={`fancy${props.indexFather}${props.indexChildren}`} data-type="iframe" data-src={props.child.urlInterpretation} href="javascript:;">
                            <i className="fa fa-eye"></i>
                        </a>
                    </div>
                }
            </div>
        }
        </div>
            {/* <UncontrolledTooltip placement="bottom" target={`toltipDeleteChildren${props.indexFather}${props.indexChildren}`}>
                ELIMINAR DOCUMENTO
            </UncontrolledTooltip> */}
            <button onClick={() => props.handleDeleteChildren(props.indexFather, props.indexChildren)} type="button" id={`toltipDeleteChildren${props.indexFather}${props.indexChildren}`}><i className="fa fa-trash"></i> </button>
        {
            props.child.url !== '' &&
            <button onClick={() => props.childMenu(props.indexChildren)}><i className="fas fa-ellipsis-v"></i></button>
        }

        <div className="modal fade" id={`modalDateDocument${props.indexFather}${props.indexChildren}`} tabIndex="-1" role="dialog" aria-labelledby="Hola mundo!" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <InfiniteCalendar
                            width={450}
                            height={200}
                            selected={props.child.dateOfTheDocument}
                            onSelect={(date) => { props.child.dateOfTheDocument = date, props.refresh() }}
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

        <div className="modal fade" id={`modal${props.indexFather}${props.indexChildren}`} tabIndex="-1" role="dialog" aria-labelledby={`${props.indexChildren}`} aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Notas {props.child.label}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="paper">
                            <div className="paper-content bodyNote">
                                <textarea value={props.child.notes} onChange={(e) => { props.child.notes = e.target.value, props.refresh() }} autoFocus></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <input style={{ display: 'none' }} onChange={(e) => props.handleUploadDocumentLegal(e)} type="file" id="handleUploadDocumentLegal" />
        <input style={{ display: 'none' }} onChange={(e) => props.handleUploadDocumentInterpretation(e)} type="file" id="handleUploadDocumentInterpretation" />
		</div>
    </div>
)

export default DocumentChildren