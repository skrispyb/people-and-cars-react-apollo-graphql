import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { typeDefs, resolvers } from './src/schema';

const startApolloServer = async ( typeDefs, resolvers ) => {
    const app = express()

    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })

    await server.start()

    server.applyMiddleware({ app })

    await new Promise(resolve => httpServer.listen({ port: 4004 }, resolve))
    console.log(`Server is ready at http://localhost:4004${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)