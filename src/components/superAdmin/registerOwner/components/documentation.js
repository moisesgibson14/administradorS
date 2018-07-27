import React, { Component } from 'react'
import { uploadFiles } from '../../../../uploadFiles'
import { InputText, confirmRequest } from '../../../../swaIInputs'


export default class Documentation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            index: 0,
            uploadDocument: true,
            percentage: 0
        }

        this.handleChangeDocuments = this.handleChangeDocuments.bind(this)
        this.handleDeletedDocument = this.handleDeletedDocument.bind(this)
    }

    handleChangeDocuments(e) {
        if (e.target.files.length > 0) {
            let index = this.state.index
            this.setState({ uploadDocument: false })
            uploadFiles(e, (link) => {
                this.props.user.documents[index].urlFile = ''
                this.setState({ uploadDocument: true })
                this.props.user.documents[index].urlFile = link[0]
                this.setState({ uploadDocument: true })
                this.props.refresh()
            }, (percentage) => {
                this.setState({ percentage: Math.round(percentage) })
            }, 'documentationOwner/'
            )
        }
    }

    handleNewDocument() {
        InputText('Ingrese nombre nuevo documento:', (value) => {
            if (value) {
                let newDocument = {
                    name: value.toUpperCase(),
                    urlFile: ''
                }
                this.props.user.documents = this.props.user.documents.concat(newDocument)
                this.props.refresh()
            }
        })
    }

    handleDeletedDocument(index) {
        confirmRequest('¿Desea eliminar el documento?', 'Confirmando ya no se podrá recuperar', (ok) => {
            if(ok) {
                let documentsTMP = []
                this.props.user.documents.map((documentt, key) => {
                    if (index !== key) {
                        documentsTMP = documentsTMP.concat(documentt)
                    }
                })
                this.props.user.documents = documentsTMP
                this.props.refresh()
            }
        })
    }

    render() {
        return (
            <div>
                {
                    this.props.user.documents.map((documentt, indexDocument) => (
                        <div key={indexDocument}>
                            <div className="row mb-2">
                                <div className="col col-xs-12 col-md-5">
                                    <button type="button" className="btn btn-primary btn-block" >
                                        {
                                            documentt.name
                                        }
                                    </button>
                                </div>
                                <div className="col col-xs-12 col-md-1">
                                    <label onClick={() => this.setState({ index: indexDocument })} style={{ cursor: 'pointer' }} className="btn btn-success" htmlFor="uploadDocument">
                                        <i className="fas fa-upload" ></i>
                                    </label>
                                    <input onChange={this.handleChangeDocuments} style={{ display: 'none' }} type="file" id="uploadDocument" />
                                </div>
                                    {
                                        documentt.urlFile !== '' &&
                                    <div className="col col-xs-12 col-md-1">
                                        <a className="btn btn-info" data-fancybox data-type="iframe" data-src={documentt.urlFile} href="javascript:;">
                                            <i className="fas fa-eye"></i>
                                        </a>
                                    </div>
                                    }                                
                                    {
                                        documentt.urlFile !== '' &&
                                    <div className="col col-xs-12 col-md-1">
                                        <button type="button" onClick={() => { documentt.urlFile = '', this.props.refresh() }} className="btn btn-warning"><i className="fas fa-minus-circle"></i></button>
                                    </div>
                                    }
                                    {
                                        indexDocument > 4 &&
                                    <div className="col col-xs-12 col-md-1">
                                        <button type="button" onClick={() => { this.handleDeletedDocument(indexDocument) }} className="btn btn-danger"><i className="fas fa-times-circle"></i></button>
                                    </div>
                                    }
                            </div>
                        </div>
                    ))
                }
                <button onClick={() => this.handleNewDocument()} type="button" className="btn btn-success float-right mb-3 mr-3" ><i className="fas fa-plus-circle"></i></button>
                {
                    this.state.uploadDocument === false &&
                    <div className="row">
                        <div className="col col-md-6">
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>{this.state.percentage}%</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
