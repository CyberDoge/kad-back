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
        workExperienceArray: [WorkExperience],
        pdfResume: String
    }

    type UserResponse {
        id: String
        avatarUrl: String,
        firstName: String,
        secondName: String,
        thirdName: String,
    }

    type WorkExperience {
        placeOfWork: String,
        position: String,
        dateFrom: String,
        dateTo: String,
        description: String
    }

    input UserDetailsRequest {
        avatarUrl: String,
        firstName: String!,
        secondName: String!,
        thirdName: String,
        emails: [String],
        phones: [String],
    }

    input UserCompetenceRequest {
        workExperienceArray: [WorkExperienceRequest],
        pdfResume: String
    }
    input WorkExperienceRequest {
        placeOfWork: String!,
        position: String!,
        dateFrom: String!,
        dateTo: String!,
        description: String
    }

    extend type Query {
        currentUser: CurrentUser
        users(userIds: [String!]): [UserResponse]
    }
    extend type Mutation {
        updateCurrentUserDetails(userDetailsRequest: UserDetailsRequest!): Boolean
        updateUserCompetence(userCompetence: UserCompetenceRequest!): Boolean
    }
`;
