import React, { Component } from 'react'
import Information from './information'

export default class Principal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: '',
      data:''
    }
  }

  selectOption(option) {
    if (option === 1) {
      this.setState({
        option: option
      })

      var jsonData = {
        "data": [{
          "name":"EQUIPO 1",
          "age":"33"
        },{
          "name":"Equipo 2",
          "age":"44"
        }]
      }

      this.setState({
        data:jsonData
      })
    }
  }
  render() {
    let { option,data } = this.state
    return (
      <div className="accountantSec">
        <div className="accountantsSec">
          <div className="wrapper">
            <h2>Reportes</h2>
            <hr/>
            <ul className="nav nav-tabs no-print" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" onClick={() => this.selectOption(1)} data-toggle="tab" href="#information" role="tab" aria-controls="information" aria-selected="true">Información</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#estadisticas" role="tab" aria-controls="reports" aria-selected="false">Estadísticas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#balance" role="tab" aria-controls="balance" aria-selected="false">Balance</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#resumen" role="tab" aria-controls="resumen" aria-selected="false">Resúmenes financieros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#asignacionUser" role="tab" aria-controls="asignUser" aria-selected="false">Asignación de Usuarios </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade" id="information" role="information" aria-labelledby="profile-tab">
                <hr />
                <h4>Descripción general.</h4>
                <small>Datos que le ayudarán a comprender y verificar Información detallada.</small>
                <hr />
                {
                  option === 1 &&
                  <Information data={data} />
                }
              </div>
              <div className="tab-pane fade" id="estadisticas" role="reports" aria-labelledby="profile-tab">
                Estadisticas
              </div>
              <div className="tab-pane fade" id="balance" role="balance" aria-labelledby="profile-tab">
                Balance
              </div>
              <div className="tab-pane fade" id="resumen" role="resumen" aria-labelledby="profile-tab">
                Resumenes
              </div>
              <div className="tab-pane fade" id="asignacionUser" role="asignUser" aria-labelledby="profile-tab">
                Asignacion de usuarios
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
