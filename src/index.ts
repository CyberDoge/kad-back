import {IExecutableSchemaDefinition} from '@graphql-tools/schema';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import http from 'http';
import morgan from 'morgan';
import {configureResolvers} from './configure/configureResolvers';
import {generateContext} from './factory/generateContext';
import {typeDefs} from './typeDefs';

const config = dotenv.config();

async function startApolloServer(
    typeDefs: IExecutableSchemaDefinition['typeDefs'],
    resolvers: IExecutableSchemaDefinition['resolvers']
) {
    if (!config.parsed) {
        throw new Error('.env parsing error');
    }
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
    await httpServer.listen({port: config.parsed.APP_PORT});
    console.log(`Server ready at localhost${config.parsed.APP_PORT}${server.graphqlPath}`);
}

const resolvers = configureResolvers();
startApolloServer(typeDefs, resolvers);
