import React, {useState, useEffect, Fragment} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {getDetail} from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import '../hojas-de-estilo/Detail.css'



export default function Detail(){
    
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id)

    useEffect(()=>{
        dispatch(getDetail(id));
    },[dispatch])

    const myCountry = useSelector((state) => state.detail)
    console.log(myCountry);

    return(
        <div className='card-conteiner'>
                    <div className='card-detail'>
                    <img 
                        src={myCountry.image}
                        alt='country flag'
                    />
                    <div className='conteiner-text'>
                        <h1>Pais: {myCountry.name}</h1>
                        <h3>Codigo: {myCountry.id}</h3>
                        <h3>Capital: {myCountry.capital}</h3>
                        <h3>Subregion: {myCountry.subregion}</h3>
                        <h3>Area: {myCountry.area}</h3>
                        <h3>Poblacion: {myCountry.population}</h3>
                        <hr/>
                        {
                            myCountry.hasOwnProperty('actividads') && myCountry.actividads.length > 0 ? 
                            <Fragment>
                            <h2>Actividades creadas:</h2>
                            <h3>Name: {myCountry.actividads[0].name}</h3>
                            <h3>Dificultad: {myCountry.actividads[0].difficulty}</h3>
                            <h3>Duracion: {myCountry.actividads[0].duration}</h3>
                            <h3>Temporada: {myCountry.actividads[0].season}</h3>
                            </Fragment> 
                            : 
                            <Fragment>
                                <h3>Este pais no tiene actividades creadas por el usuario</h3>
                                <div className='button-detail'>
                                <Link to='/activity'>
                                    <button>Crear actividad</button>
                                </Link>
                                </div>
                            </Fragment>
                        }
                    </div>
                    <div className='button-detail'>
                        <Link to='/home'>
                            <button>Volver</button>
                        </Link>
                    </div>
                    </div>
        </div>
    )

}