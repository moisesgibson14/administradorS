import React, { Component } from 'react'
import { uploadFiles } from '../../../../uploadFiles'
import { InputGroup, InputGroupAddon } from 'reactstrap'
export default class LogoOwner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            percentege: 0,
            upload: true
        }

        this.handleUploadLogoOwner = this.handleUploadLogoOwner.bind(this)
    }

    handleUploadLogoOwner(e) {
        this.setState({ upload: false })
        uploadFiles(e, (link) => {
            this.props.user.logo = ''
            this.props.refresh()
            this.props.user.logo = link[0]
            this.setState({ upload: true })
            this.props.refresh()
        }, (percentege) => {
            this.setState({ percentege: Math.round(percentege) })
        }, 'documentationOwner')
    }
    render() {
        let { upload } = this.state
        return (
            <div>
                <div className="row">
                    <div className="col col-md-2" >
                        <div className="alert alert-primary" role="alert">
                            LOGOTIPO
                        </div>
                    </div>
                    <div className="col col-md-1">
                        <input
                            id="uploadLogoOwner"
                            type="file"
                            accept="image/*"
                            onChange={(e) => this.handleUploadLogoOwner(e)}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="uploadLogoOwner" className="btn btn-success"><i className="fas fa-upload"></i></label>
                    </div>
                    {
                        this.props.user.logo !== '' &&
                        <a className="btn btn-info mb-5" href={this.props.user.logo} data-fancybox="images" data-caption="Logo">
                            <i className="fas fa-eye"></i>
                        </a>
                    }
                    <div className="col col-md-1">

                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col col-xs-12 col-md-6">
                        {
                            upload === false &&
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentege}%` }}>{this.state.percentege}%</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
