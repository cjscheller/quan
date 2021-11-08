const Transaction = {
    account: async (parent, args, { dataSources }, info) => {
        const gqlFields = require('graphql-fields');
        const fields = gqlFields(info, {}, { excludedFields: ['__typename'] });
        // If only 'id' field requested, return without executing additional query
        if (Object.keys(fields).length === 1 && 'id' in fields) {
            return { id: parent.dataValues.account };
        }
        return parent.getAccount();
    },
};

module.exports = Transaction;