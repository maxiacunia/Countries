import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {postActivity} from '../actions/index';
import { useDispatch } from 'react-redux';
import '../hojas-de-estilo/ActivityCreate.css'

    function validate(input){
    let errors = {};
    if(!input.nameCountry){
        errors.nameCountry = 'Debe ingresar un pais';
    } else if(!input.name){
        errors.name = 'Debe ingresar el nombre de la actividad';
    } else if(!input.duration){
        errors.duration = 'Debe ingresar la duracion de la actividad';
    }

    return errors;
    }

export default function ActivityCreate(){
    const dispatch = useDispatch()

    const [errors, setErrors] = useState({});

    const [ input, setInput] = useState({
        nameCountry: '',
        name:'',
        difficulty:'',
        duration:'',
        season:''
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleSelectDifficulty(e){
        setInput({
            ...input,
            difficulty: e.target.value
        })
    }

    function handleSelectSeason(e){
        setInput({
            ...input,
            season: e.target.value
        })
    }

    function handleSubmit(e){
        dispatch(postActivity(input))
        alert('Actividad Creada con exito !')
        setInput({
            nameCountry: '',
            name:'',
            difficulty:'',
            duration:'',
            season:''            
        })
    }

    return(
        <div className='conteiner-form'>
            <div className='form-elemts'>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <h1>Crea la actividad!</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Nombre del pais :</label>
                    <input
                        name="nameCountry"
                        type='text'
                        value={input.nameCountry}
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.nameCountry && (
                            <p className='error'>{errors.nameCountry}</p>
                        )
                    }
                </div>
                <div>
                    <label>Nombre de la actividad:</label>
                    <input
                        name="name"
                        type='text'
                        value={input.name}
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.name && (
                            <p className='error'>{errors.name}</p>
                        )
                    }                    
                </div>
                <div>
                    <label>Duracion de la actividad:</label>
                    <input
                        name="duration"
                        type='number'
                        value={input.duration}
                        placeholder="Duracion en hs"
                        onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.duration && (
                            <p className='error'>{errors.duration}</p>
                        )
                    }
                </div>
                <div>
                    <label>Dificultad de la actividad:</label>
                    <select onChange={(e) => handleSelectDifficulty(e)}>
                        <option name="1" value="1">1</option>
                        <option name="2" value="2">2</option>
                        <option name="3" value="3">3</option>
                        <option name="4" value="4">4</option>
                        <option name="5" value="5">5</option>
                    </select>
                </div>
                <div>
                    <label>Temporada:</label>
                    <select onChange={(e) => handleSelectSeason(e)}>
                        <option name="Verano" value="Verano">Verano</option>
                        <option name="Invierno" value="Invierno">Invierno</option>
                        <option name="Otoño" value="Otoño">Otoño</option>
                        <option name="Primavera" value="Primavera">Primavera</option>
                        <option></option>
                    </select>
                </div>
                <div className='submit'>
                    <button type='submit'>Crear Actividad</button>
                </div>
                
            </form>

            </div>

        </div>
    )
}