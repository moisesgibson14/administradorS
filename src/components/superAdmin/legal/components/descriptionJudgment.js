import React, { Component } from 'react'

export default class DescriptionJudgment extends Component {

    constructor(props) {
        super(props)


    }

    componentDidMount() {
        console.log('description', this.props.description)
    }

    render() {
        let description = this.props.description
        return (
            <div className="flex-sates">
                {description.map((unDes, index) => {
                    return (
                        <div key={index} className="descPanel">
                            <strong>{unDes.label}</strong>
                            <textarea className="form-control" name="" id="" cols="30" rows="10" onChange={e => {unDes.description, this.props.refresh()} } placeholder="Descripción:" ></textarea>
                        </div>
                    )
                })

                }
            </div>
        )
    }
}

