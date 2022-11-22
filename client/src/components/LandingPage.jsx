import {React, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../hojas-de-estilo/LandingPage.css'

export default function LandingPage(){
    document.body.style.backgroundImage = '../hojas-de-estilo/greg-rosenke-1TjORT2dLOw-unsplash.jpg';

    useEffect(() => {
        // 👇 add class to body element
        document.body.classList.add('bg-img');
    }, []);

    return(
        <div className='contenedor-landing'>
            <div className='contenedor-bienvenida'>
                <h1>Bienvenidos a Countries !</h1>
                <Link to ='/home'>
                    <button className='button-32' role="button">Ingresar</button>
                </Link>
            </div>
        </div>
    )
}