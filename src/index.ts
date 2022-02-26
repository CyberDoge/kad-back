import {IExecutableSchemaDefinition, makeExecutableSchema} from '@graphql-tools/schema';
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core';
import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import {applyMiddleware} from 'graphql-middleware';
import http from 'http';
import morgan from 'morgan';
import {parsedConf} from 'src/configure';
import {permissions} from 'src/configure/permissions';
import {configureResolvers} from 'src/graphql/resolvers/configureResolvers';
import {jwtMiddleWare} from 'src/helpers/jwtHelper';
import {typeDefs} from './graphql/typeDefs';


async function startApolloServer(
    typeDefs: IExecutableSchemaDefinition['typeDefs'],
    resolvers: IExecutableSchemaDefinition['resolvers']
) {

    const app = express();

    app.use(morgan(parsedConf.LOG_FORMAT, {stream: {write: console.log}}));
    app.use(jwtMiddleWare);

    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({typeDefs, resolvers});

    const server = new ApolloServer({

        schema: applyMiddleware(
            schema,
            permissions
        ),
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
        context: ({req}) => {
            return {...req};
        }
    });
    await server.start();
    server.applyMiddleware({app});
    await httpServer.listen({port: parsedConf.APP_PORT});
    console.log(`Server ready at localhost${parsedConf.APP_PORT}${server.graphqlPath}`);
}

const resolvers = configureResolvers();
startApolloServer(typeDefs, resolvers);
