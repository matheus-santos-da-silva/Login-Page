const { DataTypes } = require('sequelize');
const database = require('../db/conn');

const User = database.define('user', {
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }

})

module.exports = User;