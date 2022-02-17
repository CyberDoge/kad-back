import {gql} from 'apollo-server-express';

export const Login = gql`
    input LoginCredentials {
        email: String
        password: String
    }
    type Mutation {
        login(credentials: LoginCredentials!): String!
    }
`;
