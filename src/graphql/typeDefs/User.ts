import {gql} from 'apollo-server-express';


export const User = gql`
    type CurrentUser {
        id: String,
        roles: [String],
        firstName: String,
        secondName: String,
        thirdName: String,
        primaryEmail: String,
        emails: [String],
        phones: [String],
    }

    input UserDetailsRequest {
        avatarUrl: String,
        firstName: String!,
        secondName: String!,
        thirdName: String,
        emails: [String],
        phones: [String],
    }
    extend type Query {
        currentUser: CurrentUser
    }
    extend type Mutation {
        updateCurrentUser(userDetailsRequest: UserDetailsRequest!): Boolean
    }
`;
