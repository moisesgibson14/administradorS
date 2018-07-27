import React from 'react'
import InfiniteCalendar from 'react-infinite-calendar'
import DocumentsChildrenActivity from './documentsChildrenActivity'
const Activity = (props) => (
    <div className="jumbotron">
        <div className="row mb-3">
            <div className="col-12 col-md-1">
                <button type="button" className="btn btn-secondary">{props.index + 1}</button>
            </div>
            <div className="col-12 col-md-10">
                <input
                    type="text"
                    className="form-control"
                    placeholder="ACTIVIDAD"
                    value={props.activity.description}
                    onChange={(e) => { props.activity.description = e.target.value, props.refresh() }}
                />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-12 col-md-2">
                <button
                    data-target={`#modal${props.index}`} data-toggle="modal"
                    type="button"
                    className="btn btn-primary">
                    DESCRIPCIÓN
                   </button>
            </div>
            <div className="col-12 col-md-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="ESTATUS"
                    value={props.activity.status}
                    onChange={(e) => { props.activity.status = e.target.value, props.refresh() }}
                />
            </div>
            <div className="col-12 col-md-2">
                <input
                    type="number"
                    className="form-control"
                    placeholder="COSTO"
                    value={props.activity.price}
                    onChange={(e) => { props.activity.price = e.target.value, props.refresh() }}
                />
            </div>
            <div className="col-12 col-md-3">
                <button
                    type="button"
                    className="btn btn-success"
                    data-target="#modalDateStart" data-toggle="modal"
                >
                    FECHA DE INICIO
                </button>
            </div>
            <div className="col-12 col-md-3">
                <button
                    type="button"
                    className="btn btn-info"
                    data-target="#modalDateEnd" data-toggle="modal"
                >
                    FECHA DE FIN
                </button>
            </div>
        </div>
        <DocumentsChildrenActivity
            activity={props.activity}
            handleNewChildrenActivity={props.handleNewChildrenActivity}
            assignPositions={props.assignPositions}
            handleUploadDocumentActivity={props.handleUploadDocumentActivity}
            handleUploadDocumentActivityInterpretation={props.handleUploadDocumentActivityInterpretation}
            handleDeleteChildrenActivity={props.handleDeleteChildrenActivity}
            index={props.index}
            refresh={props.refresh}
        />
        <div className="modal fade" id={`modal${props.index}`} tabIndex="-1" role="dialog" aria-labelledby={`${props.index}`} aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">DESCRIPCIÓN</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="paper">
                            <div className="paper-content bodyNote">
                                <textarea
                                    onChange={(e) => { props.activity.activity = e.target.value, props.refresh() }}
                                    autoFocus
                                    value={props.activity.activity}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="modalDateStart" tabIndex="-1" role="dialog" aria-labelledby="Hola mundo!" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <InfiniteCalendar
                            width={450}
                            height={200}
                            selected={props.activity.dateStart}
                            onSelect={(date) => { props.activity.dateStart = date, props.refresh() }}
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
        <div className="modal fade" id="modalDateEnd" tabIndex="-1" role="dialog" aria-labelledby="Hola mundo!" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <InfiniteCalendar
                            width={450}
                            height={200}
                            selected={props.activity.dateEnd}
                            onSelect={(date) => { props.activity.dateEnd = date, props.refresh() }}
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
        <button
            type="button"
            className="btn btn-danger float-right"
            onClick={() => props.handleDeleteActivity(props.index)}
        >
            <i className="icon-close"></i>
        </button>
        {
            props.final === (props.index + 1) &&
            <button
                type="button"
                className="btn btn-success float-right mr-2"
                onClick={() => props.handleNewActivity()}
            >
                <i className="icon-plus"></i>
            </button>
        }
    </div>
)

export default Activity