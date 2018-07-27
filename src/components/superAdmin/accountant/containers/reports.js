import React, { Component } from 'react'
import ListReports from '../components/listReports'
import { firestore } from 'firebase'
import $ from 'jquery'

export default class Reports extends Component {
    constructor(props) {
        super(props)
        this.state =  {
            assetReport: '',
            ready: false,
            edit:false,
            assetSelected:''
        }

        this.handleGetListReports = this.handleGetListReports.bind(this)
        this.viewReport = this.viewReport.bind(this)
        this.print = this.print.bind(this)
    }
    componentWillMount() {
        let idasset = this.props.dataB.id
        this.handleGetListReports(idasset)
    }
    handleGetListReports(idasset){
        firestore().collection('reportCountable').where("idAsset", "==", idasset).orderBy("date", "asc").onSnapshot((snap, index) => {
            let assetsReportTMP = []
            snap.forEach((asset, index) => {
                assetsReportTMP.push({ ...asset.data(), id: asset.id })
            })
            this.setState({ assetReport: assetsReportTMP, ready: true })
            this.refresh()
        })
    }
    refresh() {
        this.setState({ refresh: '' })
        console.log(this.state);
    }

    viewReport(id){
        console.log(id);
        this.state.assetReport.forEach(element => {
            if(element.id === id){
                this.setState({
                    edit:true,
                    assetSelected:element
                })
                console.log(this.state.assetSelected);
                
            }
        });
    }
    print(){
        window.print();
    }

    render() {
        let { assetReport, ready, edit,assetSelected } = this.state
        if (assetReport == '' && ready == false) return <h5>Cargando...</h5>
        return (
            <div>
                {ready && assetReport && !edit &&
                    <div className="tb-responsive">
                        <table className="table table-borderless table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Responsable</th>
                                    <th scope="col">Correo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.assetReport.map((list, index) => {
                                    return(
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            {new Intl.DateTimeFormat('en-GB', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            }).format(list.date)}
                                        </td>
                                        <td>{list.name}</td>
                                        <td>{list.email}</td>
                                        <td><button type="button" className="btn btn-success viewReport" onClick={() => this.viewReport(list.id)} ><i className="fas fa-eye"></i></button></td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                }
                {edit &&
                <ListReports assetSelected={assetSelected} print={this.print} />
                }
            </div>
        )
    }
}
