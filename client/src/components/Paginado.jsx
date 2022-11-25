import React from 'react';
import '../hojas-de-estilo/Paginado.css'

export default function Paginado({countriesPerPage, allCountries, paginado}){
    //aca se genera un arreglo de numero que seria el page number
    const pageNumbers = []
    for (let i = 0; i < Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i+1)
    }

    return(
        <nav className='contenedor-pagination'>
            <ul className='pagination'>
                {
                    pageNumbers &&
                    pageNumbers.map( number => (
                        <li className='number' key={number}>
                            <a onClick={()=> paginado(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}