import {gql} from 'apollo-server-express';

export const Registration = gql`
    input RegistrationCredentials {
        email: String!,
        password: String!,
        asCustomer: Boolean,
        asExecutor: Boolean,
    }

    extend type Mutation {
        registration(credentials: RegistrationCredentials!): String!
    }
`;
