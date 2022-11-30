import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../hojas-de-estilo/Error404.css'

function Error() {
    return ( 
        <div className='contenedor-error'>
            <div className='content-elements-error'>
                <h1>Error 404 Not found 🛠</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi omnis ipsa excepturi quisquam neque, praesentium, fugiat commodi minima illo, quod eveniet cum inventore nisi eum obcaecati. Fugiat aperiam tempore excepturi!</p>
                <Link to='/home'>
                    <button>Home</button>
                </Link>
            </div>
        </div>
    );
}

export default Error;