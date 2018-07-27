import React from 'react'
import DocumentsChildren from './documentsChildren'
const Document = (props) => (
    <div className="flex-sates docFlex">
        {
            props.asset.states['administration'].documentacionAdministrativa.map((doc, index) => (
                <div key={index} className="docItemLegal">
                    <div className="flex-sates">
                        <div className="docHeader">
                            <span><i className="far fa-folder"></i></span>
                            <p>{doc.mainLabel}</p>
                        </div>
                        <button onClick={() => props.handleNewChildren(index)} className="" type="button" ><i className="fa fa-plus-circle"></i></button>
                        {
                            index > 9 &&
                            <button onClick={() => props.handleDeleteFather(index)} className="" type="button" ><i className="fa fa-minus-circle"></i></button>
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
                        childMenu={props.childMenu}
                    />
                </div>
            ))
        }
    </div>
)

export default Document