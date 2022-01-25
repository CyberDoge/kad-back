import {ApolloError} from 'apollo-server-express';

export interface LoginResponse {
    token?: string;
    userId?: string;
    error?: ApolloError;
}
