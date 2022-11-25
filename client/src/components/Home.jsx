import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getCountries, filterByContinent, filterActivity, orderByName, orderByPopulation } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar'
import '../hojas-de-estilo/Home.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'

export default function Home(){
    const dispatch = useDispatch()
    
    //Me trae todo lo que esta en el estado de countries (lee data del store)
    const allCountries = useSelector ((state) => state.countries)
    //paginado
    //guarda en un estado actual la pagina actual
    const [currentPage, setCurrentPage] = useState(1)
    const [orden, setOrden] = useState('')
    //guarda en un estado actual la cantidad de paises por pagina
    const [countriesPerPage, setCountriesPerPAge] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage //10
    const indexOfFisrtCountry = indexOfLastCountry - countriesPerPage//0
    //Aca tengo los paises de la pagina actual(10)
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
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
    }


    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        //seteo la pagina en la primera
        setCurrentPage(1)
        //lo uso para que me lo renderice
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSort2(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1)
        setOrden(`Ordenado2 ${e.target.value}`)
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
                            <option value='asc'>A - Z</option>
                            <option value='desc'>Z - A</option>
                        </select>
                    </div>
                    <div className='filter-population input'>
                        <select name='Filtrar por poblacion' onChange={e => handleSort2(e)}>
                            <option value='asc'>Menor poblacion</option>
                            <option value='desc'>Mayor poblacion</option>
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
            <div className='footer-conteiner'>
                <div className='footer-elements'>
                <p>
                    Creado por <span>Maximiliano Acuña</span> 😀
                </p>
                <div className='iconos'>
                    <a href='https://github.com/maxiacunia'>
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href='www.linkedin.com/in/maximiliano-acuña'>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>                   
                </div>
                </div>
            </div>
        </div>
    );
}