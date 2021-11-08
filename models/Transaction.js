const { DataTypes, Model } = require('sequelize');
const conn = require('../db/connection');

class Transaction extends Model { }

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    linkedTransactionId: {
        type: DataTypes.STRING,
        field: 'linked_transaction_id'
    },
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    originalDesc: {
        type: DataTypes.STRING,
        field: 'original_desc'
    },
    date: DataTypes.DATE,
    hidden: DataTypes.BOOLEAN
}, {
    sequelize: conn,
    modelName: "Transaction",
    timestamps: false
});

module.exports = Transaction;