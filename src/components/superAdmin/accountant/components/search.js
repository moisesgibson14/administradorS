import React from 'react'

const Search = (props) => (
    <div className="SearchBar">
        <span className="closeSearch"><i className="fas fa-times-circle"></i></span>
        <input autoComplete="off" type="search" name="nombre" placeholder="Buscar" onChange={(e) => props.handleSearch(e)} />
    </div>
)

export default Search