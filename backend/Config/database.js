const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: 'Password123',
    database: 'food_delivery',
    logging: false
})

module.exports = sequelize;