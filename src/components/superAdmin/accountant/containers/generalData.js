import React, { Component } from 'react'
import Assets from '../components/assets'
import Search from '../components/search'
import BookInventory from './bookInventory'
import RealInventory from './realInventory'
import Conciliation from './conciliation'
import DataBasic from '../components/dataBasic'
import Settings from './settings'
import Reports from './reports'
import { firestore } from 'firebase'

export default class GeneralData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assetsFurniture: {},
            countAsset: {},
            ready: false,
            assetsFurnitureConciliation: {},
            activeOptions: ''

        }
        this.selectOption = this.selectOption.bind(this)
        this.getAccountantInfo = this.getAccountantInfo.bind(this)
    }
    componentWillMount(){
        console.log(this.props);
    }

    getAccountantInfo() {
        $('.accountanInfo').toggleClass('infoLeft');

        if($('.accountanInfo').hasClass('infoLeft')) {
            $('.maskInf').fadeIn()
        } else {
            $('.maskInf').fadeOut('fast');
        }
    }

    selectOption(option) {
        if (option == 1) {
            this.loading(true)
            let idasset = this.props.asset.states.basicInformation[0].valueId
            firestore().collection('assetsFurniture').where("cct", "==", idasset).orderBy("typeAsset", "asc").orderBy("description", "asc").onSnapshot(snapOne => {
                let assetsFurnitureTMP = []
                snapOne.forEach((asset, index) => {
                    assetsFurnitureTMP.push({ ...asset.data(), id: asset.id })
                })
                var matriz = {};
                assetsFurnitureTMP.forEach(function (registro) {
                    var assett = registro["typeAsset"];
                    matriz[assett] = matriz[assett] ? (matriz[assett] + 1) : 1;
                });
                matriz = Object.keys(matriz).map(function (data) {
                    return { name: data, cant: matriz[data] };
                });
                this.setState({ assetsFurniture: assetsFurnitureTMP, ready: true, countAsset: matriz, activeOptions: 1 })
                this.loading(false)
            })

        } else if (option == 2) {
            this.loading(true)
            let idasset = this.props.asset.id
            firestore().collection('revisionsStates').where("idAsset", "==", idasset).onSnapshot(snap => {
                let assetsFurnitureTMP = []
                snap.forEach(asset => {
                    assetsFurnitureTMP.push({ ...asset.data(), id: asset.id })
                })
                this.setState({ assetsFurniture: assetsFurnitureTMP, ready: true, activeOptions: 2 })
                this.loading(false)
            })
        } else if (option == 3) {
            this.loading(true)
            let idasset = this.props.asset.id
            let idassetTemp = this.props.asset.states.basicInformation[0].valueId
            firestore().collection('assetsFurniture').where("cct", "==", idassetTemp).orderBy("typeAsset", "asc").onSnapshot((snap, index) => {
                let assetsFurnitureTMP = []
                snap.forEach((asset, index) => {
                    assetsFurnitureTMP.push({ ...asset.data(), id: asset.id })
                })
                var matriz = {};
                assetsFurnitureTMP.forEach(function (registro) {
                    var assett = registro["typeAsset"];
                    matriz[assett] = matriz[assett] ? (matriz[assett] + 1) : 1;
                });
                matriz = Object.keys(matriz).map(function (data) {
                    return { name: data, cant: matriz[data], type: 'book' };
                });
                this.setState({ assetsFurnitureConciliation: assetsFurnitureTMP, search: false, countAsset: matriz })
            })

            firestore().collection('revisionsStates').where("idAsset", "==", idasset).onSnapshot((snap, index) => {
                let assetsFurnitureTMP = []
                snap.forEach((asset, index) => {
                    assetsFurnitureTMP.push({ ...asset.data(), id: asset.id })
                })
                this.setState({ assetsFurniture: assetsFurnitureTMP, search: false, ready: true, activeOptions: 3 })
                this.loading(false)
            })
        } else if (option == 4) {
            this.loading(true)
            let idasset = this.props.asset.id
            let idassetTemp = this.props.asset.states.basicInformation[0].valueId
            firestore().collection('assetsFurniture').where("cct", "==", idassetTemp).orderBy("typeAsset", "asc").onSnapshot((snap, index) => {
                let assetsFurnitureTMP = []
                snap.forEach((asset, index) => {
                    assetsFurnitureTMP.push({ ...asset.data(), id: asset.id })
                })
                var matriz = {};
                assetsFurnitureTMP.forEach(function (registro) {
                    var assett = registro["typeAsset"];
                    matriz[assett] = matriz[assett] ? (matriz[assett] + 1) : 1;
                });
                matriz = Object.keys(matriz).map(function (data) {
                    return { name: data, cant: matriz[data], type: 'book' };
                });
                this.setState({ assetsFurnitureConciliation: assetsFurnitureTMP, search: false, countAsset: matriz })
            })

            firestore().collection('revisionsStates').where("idAsset", "==", idasset).onSnapshot((snap, index) => {
                let assetsFurnitureTMP = []
                snap.forEach((asset, index) => {
                    assetsFurnitureTMP.push({ ...asset.data(), id: asset.id })
                })
                this.setState({ assetsFurniture: assetsFurnitureTMP, search: false, ready: true, activeOptions: 4 })
                this.loading(false)
            })
        } else if (option == 5) {
            this.setState({ ready: true, activeOptions: 5 })
        }
    }
    loading(loading) {
        if (loading) {
          $(document).ready(function () {
            $('.loading').css({ 'display': 'block' })
          })
        } else {
          $(document).ready(function () {
            $('.loading').css({ 'display': 'none' })
          })
        }
      }
    render() {
        if (this.props.asset.length < 1) {
            $('.loading').css({ 'display': 'block' })
        } else {
            $('.loading').css({ 'display': 'none' })
        }
        let { ready, assetsFurniture, countAsset, assetsFurnitureConciliation, activeOptions } = this.state
        return (
            <div className="accountantsSec">
                <div className="wrapper">
                    <div className="no-print">
                    <DataBasic 
                    asset={this.props.asset} 
                    getAccountantInfo={this.getAccountantInfo}
                    />
                    </div>
                    <ul className="nav nav-tabs no-print" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" onClick={() => { this.selectOption(1) }} data-toggle="tab" href="#bookI" role="tab" aria-controls="inventaryB" aria-selected="true">Inventario en libros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" onClick={() => { this.selectOption(2) }} data-toggle="tab" href="#bookR" role="tab" aria-controls="inventaryR" aria-selected="false">Inventario Real</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" onClick={() => { this.selectOption(3) }} data-toggle="tab" href="#conciliation" role="tab" aria-controls="Conciliation" aria-selected="false">Conciliación fiscal-contable </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" onClick={() => { this.selectOption(4) }} data-toggle="tab" href="#settings" role="tab" aria-controls="Settings" aria-selected="false">Ajustes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" onClick={() => { this.selectOption(5) }} data-toggle="tab" href="#reports" role="tab" aria-controls="reports" aria-selected="false">Reporte</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade" id="bookI" role="inventaryB" aria-labelledby="profile-tab">
                            {
                                activeOptions == 1 &&
                                <BookInventory
                                    assetsFurniture={assetsFurniture}
                                    countAsset={countAsset}
                                />
                            }
                        </div>
                        <div className="tab-pane fade" id="bookR" role="inventaryR" aria-labelledby="contact-tab">
                            {
                                activeOptions == 2 &&
                                <RealInventory
                                    assetsFurniture={assetsFurniture}
                                />
                            }
                        </div>
                        <div className="tab-pane fade" id="conciliation" role="Conciliation" aria-labelledby="contact-tab">
                            {
                                activeOptions == 3 && ready &&
                                <Conciliation
                                    assetsFurniture={assetsFurniture}
                                    assetsFurnitureConciliation={assetsFurnitureConciliation}
                                    countAsset={countAsset}
                                />
                            }
                        </div>
                        <div className="tab-pane fade" id="settings" role="Settings" aria-labelledby="contact-tab">
                            {
                                activeOptions == 4 && ready &&
                                <Settings
                                    dataB={this.props.asset}
                                    assetsFurniture={assetsFurniture}
                                    assetsFurnitureConciliation={assetsFurnitureConciliation}
                                    countAsset={countAsset}
                                    refresh={this.props.refresh}
                                />
                            }
                        </div>
                        <div className="tab-pane fade" id="reports" role="Reports" aria-labelledby="contact-tab">
                            {
                                activeOptions == 5 && ready &&
                                <Reports
                                    dataB={this.props.asset}
                                    refresh={this.props.refresh}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
