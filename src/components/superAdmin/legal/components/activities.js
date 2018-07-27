import React from 'react'
import Activity from './activity'

const Activities = (props) => (
    <div>
        {
            props.activities.map((activity, index) => (
                <Activity
                    key={index}
                    activity={activity}
                    index={index}
                    refresh={props.refresh}
                    handleNewChildrenActivity={props.handleNewChildrenActivity}
                    assignPositions={props.assignPositions}
                    handleUploadDocumentActivityInterpretation={props.handleUploadDocumentActivityInterpretation}
                    handleUploadDocumentActivity={props.handleUploadDocumentActivity}
                    handleDeleteChildrenActivity={props.handleDeleteChildrenActivity}
                    handleDeleteActivity={props.handleDeleteActivity}
                    handleNewActivity={props.handleNewActivity}
                    state={props.state}
                    final={props.activities.length}
                />
            ))
        }
        {
            props.activities.length === 0 &&
            <div className="row mb-3">
                <div className="col-md-6">
                    <h5 className="text-center">No hay actividades</h5>
                </div>
                <div className="col-md-6">
                    <button onClick={props.handleNewActivity} type="button" className="btn btn-primary">Crear nueva actividad</button>
                </div>
            </div>
        }
    </div>
)

export default Activities