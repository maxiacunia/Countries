import React from 'react';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getNameCountries } from '../actions';
import '../hojas-de-estilo/SearchBar.css'

export default function SearchBar(){
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        console.log(name);
    }

    function handleInputSubmit(e){
        e.preventDefault();
        dispatch(getNameCountries(name))
    }

    return(
        <div className='searchbar-container'>
            <input
                type='text'
                placeholder='Buscar...'
                onChange={e => handleInputChange(e)}
            />
            <button 
                type='submit'
                onClick={e => handleInputSubmit(e)}
            >
            Buscar
            </button>
        </div>
    )
}