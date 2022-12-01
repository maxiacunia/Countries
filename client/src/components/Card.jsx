import React from 'react';
import '../hojas-de-estilo/Card.css'

export default function Card({image, name, continent}){
    return(
        <div className='card'>
            <img src={image} alt='img not found'/>
            <div className='container'>
                <h3>{name}</h3>
                <h5>{continent}</h5>
            </div>
        </div>
    );
}