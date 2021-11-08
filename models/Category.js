const { DataTypes, Model } = require('sequelize');
const conn = require('../db/connection');

class Category extends Model {}

Category.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
    },
    title: DataTypes.STRING,
}, {
    sequelize: conn,
    modelName: "Category",
    timestamps: false
});

module.exports = Category;