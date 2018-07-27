import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { hashHistory } from 'react-router'
import './styles.css'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <p className="zoom-area">La cuenta fue deshabilitada por un administrador</p>
                <section className="error-container">
                    <span>4</span>
                    <span><span className="screen-reader-text">0</span></span>
                    <span>4</span>
                </section>
                <div className="link-container">
                <form>
                        <button type="button" onClick={() => location.reload()} className="btn btn-primary">Regresar</button>
                </form>
                </div>
            </div>
        )
    }
}
