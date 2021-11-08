const Account = {
    transactions: async (parent, args, { dataSources }, info) => {
        // TODO: support query agruments here, or redundant?
        // Should we check if only ID is requested and return w/o query? (see Transaction resolver)
        return parent.getTransactions({ where: { hidden: 0 } });
    }
};

module.exports = Account;