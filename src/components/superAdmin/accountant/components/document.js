import React from 'react'
import DocumentsChildren from './documentChildren'
const Document = (props) => (
    <div>
        {
            props.asset.states['administration'].documentacionAdministrativa.map((doc, index) => (
                <div key={index}>
                    <div className="row">
                        <div className="col col-md-5">
                            <button className="btn btn-secondary btn-block mb-2" type="button" >{doc.mainLabel}</button>
                        </div>
                        <div className="col col-md-1">
                            <button onClick={() => props.handleNewChildren(index)} className="btn btn-info mb-3" type="button" ><i className="fa fa-plus-circle"></i></button>
                        </div>
                        {
                            index > 9 &&
                            <div className="col col-md-1">
                                <button onClick={() => props.handleDeleteFather(index)} className="btn btn-danger mb-3" type="button" ><i className="fa fa-minus-circle"></i></button>
                            </div>
                        }
                    </div>
                    <DocumentsChildren
                        children={doc.children}
                        indexFather={index}
                        assignPositions={props.assignPositions}
                        handleUploadDocumentLegal={props.handleUploadDocumentLegal}
                        handleUploadDocumentInterpretation={props.handleUploadDocumentInterpretation}
                        refresh={props.refresh}
                        handleDeleteChildren={props.handleDeleteChildren}
                    />
                </div>
            ))
        }
    </div>
)

export default Document