const { Op } = require("sequelize");

const Query = {
    transaction: async (parent, args, { dataSources }, info) => {
        // For now, we'll lazy load in transaction resolver rather than eager load
        // const opts = { raw: true, nest: true, include: models.Account };
        return await dataSources.Transaction.findByPk(args.id);
    },
    transactions: async (parent, args, { dataSources }, info) => {
        // Add filter params if specificed. Will be added as AND where clauses
        const where = {};
        where.hidden = 0;
        if (args.id) where.id = args.id;
        if (args.category) where.category = args.category;
        if (args.account) where.account = args.account;
        if (args.linkedTransatctionId) where.linked_transatction_id = args.linkedTransatctionId;
        if (args.date && Object.keys(args.date).length) {
            where.date = {}
            if (args.date.gt) where.date[Op.gt] = args.date.gt;
            if (args.date.lt) where.date[Op.lt] = args.date.lt;
            if (args.date.month && /^[0-9]{4}-[0-9]{2}$/.test(args.date.month)) {
                where.date[Op.startsWith] = args.date.month;
            }
        }
        const order = [["date", "ASC"]]

        return await dataSources.Transaction.findAll({ where, order });
    },
    account: async (parent, args, { dataSources }, info) => {
        return await dataSources.Account.findByPk(args.id)
    },
    accounts: async (parent, args, { dataSources }, info) => {
        return await dataSources.Account.findAll()
    }
};

module.exports = Query;