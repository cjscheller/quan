const Mutation = {
    createTransaction: async (parent, args, { dataSources }) => {
        if ('id' in args) delete args.id;
        return await dataSources.Transaction.create(args);
    },
    updateTransaction: async (parent, args, { dataSources }) => {
        const tx = await dataSources.Transaction.findByPk(args.id);
        if (!tx) {
            throw new Error("Transaction does not exist")
        } else {
            delete args.id;
            return await tx.update(args);
        }
    },
    createAccount: async (parent, args, { dataSources }) => {
        if ('id' in args) delete args.id;
        return await dataSources.Account.create(args);
    },
    updateAccount: async (parent, args, { dataSources }) => {
        const account = await dataSources.Account.findByPk(args.id);
        if (!account) {
            throw new Error("Account does not exist")
        } else {
            delete args.id;
            return await account.update(args);
        }
    },
    importCSV: async (parent, args, { dataSources }) => {
        const parse = require('csv-parse');
        const upload = await args.file;
        const file = upload.file;
        const response = {
            success: false,
            count: 0
        }

        const parser = parse({
            columns: true,
            skipEmptyLines: true,
        });

        try {
            await new Promise((resolve, reject) => {
                file.createReadStream().pipe(parser)
                    .on('data', async record => {
                        const newTx = {
                            account: args.account,
                            amount: (record.Debit) ? `-${record.Debit}` : record.Credit,
                            category: defineCategory(record.Category),
                            description: record.Description,
                            originalDesc: record.Description,
                            date: record['Transaction Date']
                        };
                        // await dataSources.Transaction.create(newTx);
                        response.count++;
                    })
                    .on('end', () => {
                        response.success = true;
                        resolve();
                    })
                    .on('error', reject);
            })

            return response;
        } catch (err) {
            console.error(err);
            return response;
        }


        // For now, simple category definition function here
        function defineCategory(category) {
            switch (category) {
                case 'Gas/Automotive':
                    return 2;
                case 'Health Care':
                    return 6;
                case 'Dining':
                    return 9;
                case 'Merchandise':
                    return 11;
                case 'Internet':
                case 'Phone/Cable':
                    return 7;
                default:
                    return 1;
            }
        }
    }
};

module.exports = Mutation;