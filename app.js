const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');
const { graphqlUploadExpress } = require('graphql-upload');

// Define and start Apollo GraphQL server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => (models),
    debug: true,
    uploads: false // disable default graphql-upload init so can use pkg separately
});

// server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
// });

const app = express();
app.use(graphqlUploadExpress({ maxFileSize: 5242880, maxFiles: 1 })); // 5 MB
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);