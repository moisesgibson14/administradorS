import React from 'react'
const generalConditions = (props) =>(
    <div className="row">
        <div className="col-md-12">
            <div className="alert alert-info text-center mt-6" role="alert">
                <strong>CONDICIONES GENERALES</strong>
            </div>
        </div>
        {props.data.generalMechanics.map((general, indexChildren) => {
            return(
                <div key={indexChildren} className="col-12 text-center">
                    <label htmlFor="">{general.label}</label>
                    <form action="" className="formulario row">
                        {general.values.map((option,indexOptions) =>{
                            return(
                                <div key={indexOptions} className="col-sm-6 col-md-3">
                                    <div className="radio">
                                        <input type="radio" name={indexChildren + option.label + 'a' + indexOptions} id={indexChildren + option.label+'a' + indexOptions} value={option.label} checked={general.value === option.label} onChange={(e) => { general.value = e.target.value, props.refresh()}} />
                                        <label htmlFor={indexChildren + option.label + 'a' + indexOptions}> {option.label} </label>

                                        {/* <input type={child.type} name={child.label} id={indexChildren + child.label + index + 'a' + indexValue} value={valueChild.label} checked={child.value === valueChild.label} onChange={(e) => this.handleActiveCamera(e, index, indexChildren, indexValue)} />
                                        <label htmlFor={indexChildren + child.label + index + 'a' + indexValue}> {valueChild.label} </label> */}
                                    </div>
                                </div>
                            )
                        })}                        
                    </form>
                </div> 
           )
        })}
        <hr/>
        <div className="col-md-12">
            <textarea type="textarea" className="form-control mb-3" rows="4" id="Observacion" placeholder="Observaciones generales" name="Observacion" value={props.data.observations} onChange={(e) => { props.data.observations = e.target.value.toUpperCase(), props.refresh() }}  >
            </textarea>
        </div>
    </div>
)
export default generalConditions
