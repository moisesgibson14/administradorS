import React from 'react'

const Search = (props) => (
    <div className="col-12 d-flex justify-content-center searchMargin">
        <div className="col-11 m-1 m-lg-auto d-flex justify-content-center position-fixed searchFixed">
            <input autoComplete="of" className="form-control" type="search" name="nombre" placeholder="Buscar" onChange={(e) => props.handleSearch(e)} />
        </div>
    </div>
)

export default Search