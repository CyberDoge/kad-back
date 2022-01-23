import {gql} from 'apollo-server-express';

export const Login = gql`
    type Mutation {
        login(email: String!, password: String!): String!
    }
`;
