import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getCountries, filterByContinent, filterActivity, orderByName, orderByPopulation } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar'
import '../hojas-de-estilo/Home.css'

export default function Home(){
    const dispatch = useDispatch()
    
    //Me trae todo lo que esta en el estado de countries (lee data del store)
    const allCountries = useSelector ((state) => state.countries)
    //paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [orden, setOrden] = useState('')
    const [countriesPerPage, setCountriesPerPAge] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage //10
    const indexOfFisrtCountry = indexOfLastCountry - countriesPerPage//0
    const currentCountries = allCountries.slice(indexOfFisrtCountry, indexOfLastCountry)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    //despacha las acciones
    useEffect(()=>{
        dispatch(getCountries())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilterContinent(e){
        dispatch(filterByContinent(e.target.value));
    }


    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSort2(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div className='home-container'>
                <div className='titulo'>
                    <h1>Esto es Countries !</h1>
                </div>           
                <div className='inputs-container'>
                    <div className='create-pais-btn input'>
                        <Link to='/activity'>
                            <button>Crear Actividad</button>
                        </Link>
                    </div>
                    <div className='reload-country input'>
                        <button onClick={e => {handleClick(e)}}>
                            Vovler a cargar todos los paises
                        </button>
                    </div>
                    <div className='filter-continent input'>
                        <select name='Filtrar por continente' onChange={e => handleFilterContinent(e)}>
                            <option value='All'>Todos</option>
                            <option value='North America'>Norteamerica</option>
                            <option value='South America'>Sudamerica</option>
                            <option value='Europe'>Europa</option>
                            <option value='Asia'>Asia</option>
                            <option value='Africa'>Africa</option>
                            <option value='Oceania'>Oceania</option>
                            <option value='Antarctica'>Antartida</option>
                        </select>
                    </div>
                    <div className='filter-ordenamiento input'>
                        <select name='Filtrar por ordenamiento' onChange={e => handleSort(e)}>
                            <option value='asc'>Ascendente</option>
                            <option value='desc'>Descendente</option>
                        </select>
                    </div>
                    <div className='filter-population input'>
                        <select name='Filtrar por poblacion' onChange={e => handleSort2(e)}>
                            <option value='morepop'>Mayor poblacion</option>
                            <option value='lesspop'>Menor poblacion</option>
                        </select>
                    </div>

                </div>
                <div className='searchbar'>
                        <SearchBar/>
                    </div>
            <div className='pagination'>
                <Paginado
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    paginado={paginado}
                />
            </div>
            <div className='card-container'>      
                {
                currentCountries?.map( (el) => {
                    return(
                    <Fragment className='cartas'>
                        <Link to={'/countries/' + el.id}>
                            <Card image={el.image} name={el.name} continent={el.continent} key={el.id}/>
                        </Link>
                    </Fragment>
                    );
                })
                }            
            </div>
            
        </div>
    );
}