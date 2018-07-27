import React from 'react'
import DocumentChildrenActivity from './documentChildrenActivity'
const DocumentsChildrenActivity = (props) => (
    <div>
        <div className="row">
            <div className="col col-md-5">
                <button className="btn btn-secondary btn-block mb-2" type="button" >{props.activity.documentation.label}</button>
            </div>
            <div className="col col-md-1">
                <button onClick={() => props.handleNewChildrenActivity(props.index)} className="btn btn-info mb-3" type="button" ><i className="fa fa-plus-circle"></i></button>
            </div>
        </div>
        {
            props.activity.documentation.children.map((activityChild, indexActivity) => (
                <DocumentChildrenActivity
                    key={indexActivity}
                    activityChild={activityChild}
                    assignPositions={props.assignPositions}
                    handleUploadDocumentActivity={props.handleUploadDocumentActivity}
                    handleUploadDocumentActivityInterpretation={props.handleUploadDocumentActivityInterpretation}
                    handleDeleteChildrenActivity={props.handleDeleteChildrenActivity}
                    indexFather={props.index}
                    indexChildren={indexActivity}
                    refresh={props.refresh}
                />
            ))
        }
    </div>
)

export default DocumentsChildrenActivity