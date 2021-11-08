const { Sequelize } = require("sequelize")

// DB configuration for Sequelize ORM
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/quan.sqlite'
});

module.exports = sequelize;