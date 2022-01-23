import {gql} from 'apollo-server-express';

export const Login = gql`
    input Credentials{
        email: String,
        phone: String,
        password: String!
    }

    type Mutation{
        login(credentials: Credentials!): String
    }

    type Query{
        foo: String
    }
`;
