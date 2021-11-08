# Quan

![Quan - Jerry Maguire](/quan-vue/src/assets/img/quan-jerry-maguire.png)

A local-first personal finance application. Includes a GraphQL API for interacting with personal finance information stored in a local SQLite DB, as well as a Vue front-end app.

## Development

### Prerequisites

- Node + NPM
- [Sqlite3](https://sqlite.org/index.html)

### Database Initialization

The app uses a local SQLite database, and connection to the database is managed using the [Sequelize ORM](https://github.com/sequelize/sequelize/).

To initialize the database, run the following commands to **create** and **seed**:

```bash
sqlite3 db/quan.sqlite < db/create.sql
sqlite3 db/quan.sqlite < db/seed.sql
```

### GraphQL API

To start the GraphQL API, run the following from the project root:

```bash
npm run api
```

The GraphQL schema is available at [schema.js](/schema.js). The app uses the Apollo GraphQL [server](https://www.apollographql.com/docs/apollo-server/) and [client](https://github.com/vuejs/vue-apollo) libraries.

When the GraphQL API is running, access the Apollo GraphQL Playground at [localhost:4000/graphql](localhost:4000/graphql)

### Vue App

To start the Vue front-end app, run the following from the project root:

```bash
cd quan-vue
npm run serve
```

![Vue app screenshot](/quan-vue/src/assets/img/screenshot.png)

Alternatively, run both back-end and front-end for development simultaneously with:

```bash
npm run dev
```

## Importing transactions

To import transaction data into the app, it's easiest to use the **Import** functionality available on the _Transactions_ page in the Vue front-end app. The import file should be in CSV format with the header (column data) as first row and transactions starging in the second row.

## To-do:

Planned features include:

- [Plaid](https://plaid.com/) integration for automatically importing transactions
- A Summary view showing monthly and YTD summary of total spending, including per category spending.
- A rudimentary Venmo scraper for importing Venmo data
- UI improvements
- Continue investing building Vue app as [Tauri](https://github.com/tauri-apps/tauri) desktop application
- Explore building app in Flutter
