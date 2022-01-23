import {gql} from 'apollo-server-express';

export const HelloWorld = gql`
    type Query {
        test: String
    }
`;
