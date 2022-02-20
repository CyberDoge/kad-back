import {gql} from 'apollo-server-express';


export const User = gql`
    type CurrentUser {
        id: String,
        roles: [String],
        fullName: String,
        primaryEmail: String,
        emails: [String],
    }

    input UpdateUserInfo {
        avatarUrl: String,
        firstName: String,
        secondName: String,
        thirdName: String,
        emails: [String],
        phones: [String],
    }
    extend type Query {
        currentUser: CurrentUser
    }
    extend type Mutation {
        updateCurrentUser(updateUserInfo: UpdateUserInfo!): Boolean
    }
`;
