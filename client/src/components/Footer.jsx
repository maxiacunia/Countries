import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import '../hojas-de-estilo/Footer.css'


function Footer() {
    return ( 
        <div className='footer-conteiner'>
            <div className='footer-elements'>
            <p>
                Creado por <span>Maximiliano Acuña</span> 😀
            </p>
        <div className='iconos'>
            <a href='https://github.com/maxiacunia' target="_blank">
                <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href='https://www.linkedin.com/in/maximiliano-acuña' target="_blank">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>                   
        </div>
        </div>
    </div>
    );
}

export default Footer;