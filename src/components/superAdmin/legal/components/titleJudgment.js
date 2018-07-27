import React from 'react'

const TitleJudgment = (props) => (
    <div className="input-sates">
        <label>Titulo del juicio #{props.indexFhater+1}:</label> 
        <input type="text"
            value={props.judgment.titleJudgment}
            onChange={(e) => { props.judgment.titleJudgment = e.target.value, props.refresh()}}
        />
    </div>
)

export default TitleJudgment