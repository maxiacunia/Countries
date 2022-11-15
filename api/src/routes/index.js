const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//IMPORTAMOS AXIOS PARA LA API
const axios = require('axios');

//TRAEMOS LAS TABLAS DE NUESTRA BD
const {Country, Actividad, Actividad_Pais } = require('../db.js')

//TRAIGO OPERADORES DE SEQUILIZE PARA LAS RUTAS
const {Op} = require('sequelize');
const { routes } = require('../app.js');




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries/:id', async (req, res)=>{
    const id = req.params.id.toUpperCase()
    try {
        let char = await Country.findByPk(id,{include: Actividad});
        return res.status(200).json(char)
    } catch (error) {
        console.log(error);
    }
})


//ME TRAE LA INFO DE LA API
const getApiInfo = async()=>{
    // TRAE TODA LA INFO QUE TIENE LA API
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    //ACA SELECCIONAMOS LA INFO QUE VAMOS A USAR NOSTOROS
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.cca3,
            name: el.name.common,
            image: el.flags[1],
            continent: el.continents[0],
            capital: el.capital != null? el.capital[0]: 'No data',
            subregion: el.subregion != null? el.subregion: 'No data',
            area: el.area,
            population: el.population
        }
    })
    //const newDB = await Country.bulkCreate(apiInfo)
    //return newDB
    return apiInfo
}

router.get('/countries', async (req, res)=>{
        
        //SI ME VIENE UN NOMBRE POR QUERY LO GUARDO    
        const name = req.query.name
        //GUARDO EN UNA CONSTANTE LA DATA DE LA API
        const countriesAPI = await getApiInfo();
        //SI YA TENGO MI DB LLENA NO HAGO NADA
        try {
            let data = await Country.findAll();
            //SI NO TENGO NADA EN MI BASE DATOS LOS CREO
            if(!data.length) await Country.bulkCreate(countriesAPI);
        } catch (error) {
            console.log(error);
        }
        if(name){
            let countryName = await countriesAPI.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
            countryName.length ?
            res.status(200).send(countryName) :
            res.status(400).send('El pais no se enceuntra')
        } else {
            res.status(200).send(countriesAPI)
        }
})

router.post('/activities', async (req, res) => {
    //ME TRAIGO LOS DATOS DE BODY
    const {nameCountry, name, difficulty, duration, season } = req.body;
    
    try {
        //CREO LA ACTIVIDAD EN MI DB
        const newActivity = await Actividad.create({
            name,
            difficulty, 
            duration, 
            season
        });
        //BUSCO EN MI DB EL NAMECOUNTRY
        const countryDb = await Country.findAll({
            where:{
                name: nameCountry
            }
        });
        //relaciono la actividad turistica con el pais que corresponde
        await newActivity.addCountry(countryDb)
        res.status(200).send('Actividad creada correctamente')
    } catch (error) {
        res.status(500).json({msg: error.message})
    }

})

module.exports = router;
