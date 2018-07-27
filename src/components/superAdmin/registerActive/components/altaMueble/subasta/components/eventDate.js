import React from 'react'
import InfiniteCalendar from 'react-infinite-calendar'

const eventDate = (props) =>(
    <div className="flex-sates eventData">
        <div className="input-sates">
            <label>NÚMERO:</label>
            {/* <input type="number" value={props.data.eventNumber} className="form-control uppercase" placeholder="(#)" onChange={(e) => { props.data.eventNumber = e.target.value, props.refresh() }} /> */}
            <select name="" id="" className="form-control" value={props.data.eventNumber} placeholder="Seleccionar" onChange={(e) => { props.numberEvent(e.target.value), props.refresh() }} >
                    <option value="">Selecciona</option>
                    {props.event.map((options, index) => {
                        return (
                            <option key={index} value={options.numberEvent}>{options.numberEvent}</option>
                        )
                    })}
                </select>
        </div>


        <div className="input-sates">
            <label>TIPO DE SUBASTA:</label>
            <input type="text" value={props.data.typeOfAuction.value} disabled placeholder="" />
        </div>


        <div className="input-sates">
            <label>TÍTULO:</label>
            <input type="text" value={props.data.eventTitle} disabled placeholder="Título" />
        </div>

        <div className="input-sates">
            <label>UBICACIÓN:</label>
            <input type="text" value={props.data.locationEvent.value} disabled placeholder="Ubicación" />
        </div>

        <div className="input-sates subastaDate">
            <label>FECHA:</label> 
            <button type="button" className="btn btn-outline-primary mr-1" aria-hidden="true" onClick={() => props.openModal()} >
                <i className="fa fa-calendar"></i>
            </button>           
        </div>

        <div className="input-sates"></div>

        <div className="tes-modal" id={'modal2'} >
            <div className="tes-container">
                <h2 className="text-center">CALENDARIO</h2>
                <InfiniteCalendar
                width={450}
                height={200}
                locale={{
                    locale: require('date-fns/locale/es'),
                    headerFormat: 'dddd, D MMM',
                    weekdays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                    blank: 'Seleccione la Fecha',
                    todayLabel: {
                    long: 'Fecha de hoy',
                    short: 'Hoy.'
                    }
                }}
                selected={props.data.eventDate}
                // onSelect={(date) => { props.data.eventDate = date, props.refresh() }}
                 />
                <span className="cerrar" id={'close'} onClick={() => props.closeModal()} >X</span>
            </div>
        </div>
        <div className="mask" ></div>
    </div>
);
export default eventDate