import React, {useState, useEffect} from 'react';
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
                        <h2>Codigo: {myCountry.id}</h2>
                        <h2>Capital: {myCountry.capital}</h2>
                        <h2>Subregion: {myCountry.subregion}</h2>
                        <h2>Area: {myCountry.area}</h2>
                        <h2>Poblacion: {myCountry.population}</h2>
                    </div>
                    <Link to='/home'>
                        <button>Volver</button>
                    </Link>
                    </div>
        </div>
    )

}