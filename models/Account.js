const { DataTypes, Model } = require('sequelize');
const conn = require('../db/connection');

class Account extends Model {}

Account.init({
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        allowNull: false 
    },
    title: DataTypes.STRING,
    linkedAccountId: {
        type: DataTypes.STRING,
        field: 'linked_account_id'
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: conn,
    modelName: "Account",
    timestamps: false
});

module.exports = Account;