import {gql} from 'apollo-server-express';

export const Registration = gql`
    input RegistrationCredentials {
        email: String,
        phone: String,
        password: String,
        smsCode: String,
        submitPassword: String
    }

    extend type Mutation {
        registration(credentials: RegistrationCredentials!): String
    }
`;
