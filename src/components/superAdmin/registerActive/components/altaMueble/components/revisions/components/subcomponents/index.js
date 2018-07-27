import React, { Component } from 'react';
import Checklist from './checklist'
import ConditionsReports from './conditionsReports'
import $ from 'jquery'
import  {UncontrolledTooltip}  from 'reactstrap'
class Reports extends Component {
    constructor(props) {
        super(props)  
        console.log(this.props);
console.log('entrooooooooooo');

    }    
    render() {
        return (
            <div className="container-fluid">
                {this.props.editCheckList == false && this.props.data.editConditionsReports === false &&
                <div className="alert alert-secondary text-center mt-6" role="alert">
                    <strong>REPORTES</strong>
                </div>
                }
                {this.props.editCheckList == false && this.props.data.editConditionsReports === false &&
                    <div className="row">
                        <div className="col-10 col-md-6 ">
                            <button className="btn btn-secondary btn-block mb-2"><i className="fas fa-list-alt"></i> Checklist</button>
                        </div>
                        {this.props.data.editChecklistRevision === false &&
                            <button type="button" className="btn btn-success float-right mb-3" id="checklisttoltip" onClick={() => this.props.changedToCheckList(1)}>
                                <i className="fa fa-plus-square"></i>
                            </button>
                        }
                       {this.props.data.editChecklistRevision === true &&
                            <span className="d-inline-block" data-toggle="tooltip" title="Editar checklist">   
                                <button type="button" className="btn btn-success float-right mb-3"  onClick={() => this.props.changedToCheckList(1)}>
                                <i className="fas fa-edit"></i>
                                </button>
                            </span>
                       }             
                        <div className="col-10 col-md-6 ">
                            <button className="btn btn-secondary btn-block mb-2" ><i className="fab fa-elementor"></i> Condiciones</button>
                        </div>
                        {this.props.data.editConditions === false &&
                        <button type="button" className="btn btn-success float-right mb-2" disabled={!this.props.data.revision.checklist.length > 0}  onClick={() => this.props.changedToCheckList(5) }>
                            <i className="fa fa-plus-square"></i>
                        </button>
                        }
                        {this.props.data.editConditions === true  &&
                            <span className="d-inline-block" data-toggle="tooltip" title="Editar reporte">
                                <button type="button" className="btn btn-success float-right mb-3" onClick={() => this.props.changedToCheckList(4)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                            </span>   
                        }
                    </div>
                }
                {this.props.editCheckList == true &&
                    <div className="row">
                        <div className="col-12">
                            <Checklist data={this.props} />
                        </div>
                    </div>
                }
                {this.props.data.editConditionsReports === true &&
                    <div className="row">
                        <div className="col-12">
                            <ConditionsReports data={this.props} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Reports;