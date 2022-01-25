import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import express from 'express';
import session from 'express-session';
import http from 'http';
import dotenv from 'dotenv';
import morgan from 'morgan';
import {IExecutableSchemaDefinition} from '@graphql-tools/schema';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import {generateContext} from './factory/generateContext';

const config = dotenv.config();

async function startApolloServer(typeDefs: IExecutableSchemaDefinition['typeDefs'], resolvers: IExecutableSchemaDefinition['resolvers']) {
    const app = express();
    app.use(morgan(config.parsed.LOG_FORMAT, {stream: {write: console.log}}));
    app.use(session({
        secret: config.parsed.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
        context: generateContext()
    });
    await server.start();
    server.applyMiddleware({app});
    await new Promise<void>(resolve => httpServer.listen({port: config.parsed.APP_PORT}, resolve));
    console.log(`Server ready at localhost${config.parsed.APP_PORT}${server.graphqlPath}`);
}


startApolloServer(typeDefs, resolvers);
