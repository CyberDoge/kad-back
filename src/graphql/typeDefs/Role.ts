import {gql} from 'apollo-server-express';

export const Role = gql`
    directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

    enum Role {
        ANON,
        COMMON_USER,
        ADMIN,
        CUSTOMER,
        EXECUTOR,
    }
`;
