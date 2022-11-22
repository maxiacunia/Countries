const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('actividad', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    difficulty: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5'),
    },
    duration: {
        type: DataTypes.STRING,
    },
    season: {
        type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
    },
    createdInDb:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
    });
};