const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(
    'authPage',
    dbUsername,
    dbPassword,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

try {

    sequelize.authenticate();
    console.log('Connected to database');

} catch (error) {
    console.log(error);
}

module.exports = sequelize;