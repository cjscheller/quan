const { gql } = require('apollo-server-express');

const schema = gql`

    type Query {
        transaction(id: ID!): Transaction

        # Fetch transactions w/ various filter option
        transactions(
            id: ID, 
            date: DateFilter,
            category: CategoryType,
            account: Int,
            linkedTransactionId: Int
            hidden: Boolean
        ): [Transaction]

        # Fetch accounts - filter by ID
        account(id: ID!): Account
        accounts(id: ID): [Account]

        # Fetch category list
        categories: [CategoryType]!
    }

    type Mutation {
        # Create transaction
        createTransaction(
            description: String!,
            originalDesc: String, 
            linkedTransactionId: Int,
            category: CategoryType, 
            amount: Float!, 
            account: Int!,
            date: String!
        ): Transaction!

        # Update transaction
        updateTransaction(
            id: ID!,
            description: String,
            originalDesc: String,
            linkedTransactionId: Int,
            category: CategoryType,
            amount: Float,
            account: Int,
            date: String,
            hidden: Boolean
        ): Transaction

        # Create account
        createAccount(title: String!, linkedAccountId: Int, active: Boolean): Account!

        # Update account
        updateAccount(id: ID!, linkedAccountId: Int, title: String, active: Boolean): Account

        # Import CSV containing transactions for account
        importCSV(account: ID!, file: Upload!): ImportResponse!
    }

    type Account {
        id: ID!,
        linkedAccountId: Int,
        title: String,
        active: Boolean
        transactions: [Transaction]
    }

    type Transaction {
        id: ID!,
        linkedTransactionId: Int,
        account: Account, 
        category: CategoryType,
        description: String, 
        originalDesc: String,
        amount: Float,
        date: String,
        hidden: Boolean
    }

    enum CategoryType {
        UNCATEGORIZED,
        AUTO,
        DONATIONS,
        RECREATION,
        GROCERIES,
        HEALTH,
        SERVICES,
        RENT,
        DINING,
        TRANSPORTATION,
        SHOPPING,
        TRAVEL
    }

    input DateFilter {
        gt: String,
        lt: String,
        month: String,
    }

    # Implemented via graphql-upload pkg
    scalar Upload

    type ImportResponse {
        success: Boolean!,
        count: Int
    }
`;

module.exports = schema;