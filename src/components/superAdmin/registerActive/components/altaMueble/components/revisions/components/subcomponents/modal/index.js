import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody } from 'reactstrap';
// import axios from 'axios'
import uuid from 'uuid'
import '../checklist.css'
import SignaturePad from '../appPaint/index'
import uploadFiles from '../upluadImgCheck'
import swal from 'sweetalert'



class Modals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            large: false,
            small: false,
            primary: false,
            success: false,
            warning: false,
            danger: false,
            edit: false,
            url_local: false,
            loading: false,
            local: '',
            saving: false,
            refresh: '',
            percentage: 0,
            upload: false,
            saved:false,
            editImgDaños: false

        };

   
        this.handleOnClickClear = this.handleOnClickClear.bind(this)
        this.handleGetImage = this.handleGetImage.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.dataURLtoFile = this.dataURLtoFile.bind(this)
        this.hanldeUploadDocument = this.hanldeUploadDocument.bind(this)
        this.handleOnClickClearAndNew = this.handleOnClickClearAndNew.bind(this)
        this.changeToNew = this.changeToNew.bind(this)

    }
    componentDidMount() {
        this.state.loading = false
        if (this.props.data.tipeCheck === 3) {
            this.handleGetImage()
        }        
        this.setState({
            url_local: false
        })
    }
    handleOnClickClear() {
        let signature = this.refs.mySignature
        signature.clear()
        signature.fromDataURL(this.state.local)
    }
    handleOnClickClearAndNew(){
        let signature = this.refs.mySignature
        signature.clear()
        signature.fromDataURL(this.state.local)
        this.setState({ saving: false, saved: false })
    }

    handleSave() {
        let signature = this.refs.mySignature
        let img = signature.toDataURL()
        this.setState({
            img,
            texto: img,
            saving: true
        })
        var file = this.dataURLtoFile(img, 'imgAuto.png');
        let formData = new FormData()
        formData.append('file', file)
        this.hanldeUploadDocument(file)

    }
    hanldeUploadDocument(e) {
        uploadFiles(e, (link) => {
            this.props.data.modelo[13].childrens[0].value = link[0]
            this.props.data.tipeCheck = 2
            this.setState({ saving: false, saved: true })

            swal("Muy bien!", "Daños guardados correctamente", "success", {
                timer: 2000,
            });
            this.setState({
                refresh: ''
            })
        }, (percentage) => {
            this.setState({ percentage: Math.round(percentage) })
        }, 'ImgChecklist/'
        )
    }
    handleGetImage(url) {
        const toDataURL = url => fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(blob)
            }))
        toDataURL('https://preview.ibb.co/exCLoH/autoImg.jpg')
            .then(dataUrl => {
                this.setState({
                    loading: true,
                    local: dataUrl,
                    upload: true
                })
            })
        setTimeout(() => {
            let signature = this.refs.mySignature
            signature.clear()
            signature.fromDataURL(this.state.local)
            this.sta
            this.setState({
                refresh: ''
            })
        }, 1000);
    }
    changeToNew(value){
        if(value == 1){
            this.state.editImgDaños = true
            this.props.data.tipeCheck = 3
            this.state.saving = false
            this.state.saved = false
            this.handleGetImage()
        }else{
            this.props.data.tipeCheck = 1
        }
        
        this.setState({
            refresh: ''
        })
        console.log(this.props.data);
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
        let { edit, url_local, saving, loading, active, saved, editImgDaños } = this.state
        if (this.props.data === '') return <div><h5>Cargando....</h5></div>
        return (
            <div>
                <div className="animated fadeIn">
                            <Row className="d-flex justify-content-center">
                                <Col sm="12" xs="12">                                   
                                    {this.props.data.tipeCheck === 3  &&
                                    <div className={'margen'} >
                                         <div ref='canvas' id="canvas" className='canvas-state'>
                                        {!loading &&
                                            <img style={{ display: 'block', margin: 'auto', width: "50%", marginTop: '50%' }} src="https://image.ibb.co/n8itCn/sates_logo.gif" alt="" />
                                        }
                                         {loading &&
                                            <SignaturePad clearButton="true" ref="mySignature" id="mySignature" />
                                         }
                                        </div>
                                    </div>
                                    }
                                    { this.props.data.tipeCheck === 2  &&
                                        <div className="signature">
                                            <img className="img-sig" src={this.props.data.modelo[13].childrens[0].value} alt="" />
                                        </div>
                                    }
                                    {this.props.data.tipeCheck === 1 &&
                                        <div className="signature">
                                            <img className="img-sig" src={this.props.data.modelo[13].childrens[0].value} alt="" />
                                        </div>
                                    }
                                </Col>
                            </Row>
                            <div className="row text-center"> 
                                
                                {
                                this.props.data.tipeCheck === 3 &&
                                <div className="col-12 text-center">
                                    {
                                    this.props.data.tipeCheck === 3 && !saved &&
                                        <Button title="Nuevo" className="mr-3" disabled={!loading}  outline color="danger" style={{ "marginTop": "5px" }} onClick={() => this.handleOnClickClear()}>Borrar <i className='fa fa-eraser'></i></Button>
                                    }
                                    {
                                        saving && !saved &&
                                        <Button title="Nuevo" className="mr-3" outline color="primary" style={{ "marginTop": "5px" }} onClick={() => this.handleSave()}>Guardando <i className='fa fa-spinner fa-pulse fa-1x fa-fw'></i></Button>
                                    }
                                    {
                                        !saving && !saved && 
                                    <Button title="Nuevo" className="mr-3" disabled={!loading} outline color="success" style={{ "marginTop": "5px" }} onClick={() => this.handleSave()}>Guardar <i className='far fa-save'></i></Button>

                                    }
                                    {
                                        editImgDaños &&
                                    <Button title="Nuevo" className="mr-3" outline color="warning" style={{ "marginTop": "5px" }} onClick={() => this.changeToNew(2)}>Cancelar <i className='fas fa-ban'></i></Button>
                                    }
                                    {
                                        saved &&
                                        <Button title="Nuevo" className="mr-3" disabled={!loading} outline color="danger" style={{ "marginTop": "5px" }} onClick={() => this.handleOnClickClearAndNew()}>Corregir todo <i className='fa fa-eraser'></i></Button>
                                    }
                                </div>
                                    }
                                    {
                                        this.props.data.tipeCheck !== 3 &&
                                        <div className="col-12 col-sm-12 col-md-12 mb-3 text-center">
                                            <Button title="Nuevo" outline color="primary" style={{ "marginTop": "5px" }} onClick={() => this.changeToNew(1)}>Nuevos cambios <i className='fa fa-eraser'></i></Button>
                                        </div>
                                    }
                            </div>

                </div>
            </div>


        )
    }
}

export default Modals
