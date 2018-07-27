import React from 'react'
import DocumentChildren from './documentChildren'

const DocumentsChildren = (props) => (
    <div>
        {
            props.children.map((child, index) => (
                <DocumentChildren
                    key={index}
                    child={child}
                    indexFather={props.indexFather}
                    assignPositions={props.assignPositions}
                    handleUploadDocumentLegal={props.handleUploadDocumentLegal}
                    handleUploadDocumentInterpretation={props.handleUploadDocumentInterpretation}
                    refresh={props.refresh}
                    handleDeleteChildren={props.handleDeleteChildren}
                    indexChildren={index}
                    childMenu={props.childMenu}
                />
            ))
        }
    </div>
)

export default DocumentsChildren