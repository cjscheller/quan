const Account = require('./Account');
const Transaction = require('./Transaction');
const Category = require('./Category');

// Define foreign key associations
Account.hasMany(Transaction, {
    onDelete: 'CASCADE',
    foreignKey: 'account'
});
Transaction.belongsTo(Account, {
    onDelete: 'CASCADE',
    foreignKey: 'account'
});

Category.hasMany(Transaction, {
    onDelete: 'CASCADE',
    foreignKey: 'category'
});
Transaction.belongsTo(Category, {
    onDelete: 'CASCADE',
    foreignKey: 'category'
});

module.exports = {
    Account: Account,
    Transaction: Transaction,
    Category: Category
}