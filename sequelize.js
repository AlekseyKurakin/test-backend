require('pg').defaults.parseInt8 = true;

const Sequelize = require('sequelize');

let sequelize;
sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    define: {
        timestamps: false
    }
})

module.exports = sequelize;
