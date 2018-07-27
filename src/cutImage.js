import React, { Component } from 'react';
import firebase from 'firebase'
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import './App.css';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import uuid from 'uuid'

class CutImage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            file: '',
            imagePreviewUrl: '',
            finImage: '',
            imagenF: '',
            percentage: 0,
            upload: false
        }

        this.saveImage = this.saveImage.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    componentDidMount() {
        //   this.fileSave(this.props.file)
        this.setState({
            imagePreviewUrl: this.props.state.archivo
        })
    }

    saveImage() {
        let imagen = this.refs.cropper.getCroppedCanvas().toDataURL()

        var file = this.dataURLtoFile(imagen, 'imgAuto.png');

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagenF: reader.result
            });
        }

        reader.readAsDataURL(file)
        this.uploadFiles(file)
    }


    uploadFiles(image) {
        this.setState({
            upload: true
        })
        let name = uuid.v4() + '_' + image.name
        const task = firebase.storage().ref(`/cutImage/${name}`).put(image)
        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                percentage: Math.round(percentage)
            })
        }, error => { console.log(error.message) }, () => {
            this.props.saveFile(task.snapshot.downloadURL)
            this.setState({
                upload: false
            })
        }
        )
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    render() {
        return (
            <div className="fullPage" >
                <div className="row d-flex justify-content-center  " >
                    <div className="col-12 col-md-10 col-lg-6 mt-3 sombra ">
                        <h5 className="text-center" >RECORTAR IMAGEN</h5>
                        <hr/>
                        <div className="col-12">
                            <Cropper
                                ref='cropper'
                                src={this.state.imagePreviewUrl}
                                style={{ height: 400, width: '100%' }}
                                // Cropper.js options
                                aspectRatio={1 / 1}
                                guides={false}
                            />
                        </div>
                        <div className="col-12 mt-3 ">
                            <div className="row">
                                <div className="col-6">
                                    <LaddaButton
                                        className="btn btn-success btn-block "
                                        loading={this.state.upload}
                                        onClick={() => this.saveImage()}
                                        data-color="green"
                                        data-style={EXPAND_LEFT}
                                    >
                                        Guardar
                            </LaddaButton>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-danger btn-block " type="button" onClick={() => { this.props.state.archivo = '', this.props.refresh() }} >Cancelar</button>
                                </div>
                            </div>
                        </div>
                        {this.state.upload &&
                            <div className="progress mb-3 mt-3 ">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${this.state.percentage}%` }}>
                                    {this.state.percentage}%
                        </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default CutImage;