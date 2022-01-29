import {gql} from 'apollo-server-express';

export const Login = gql`
    type Login {
        token: String
        userId: ID
    }
    input LoginCredentials {
        email: String
        password: String
    }
    type Mutation {
        login(credentials: LoginCredentials!): Login
    }
`;
