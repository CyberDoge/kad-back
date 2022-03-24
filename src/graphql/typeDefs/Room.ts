import {gql} from 'apollo-server-express';


export const Room = gql`
    type RoomResponse {
        id: String
        members: [String]
        messageIds: [String]
    }

    extend type Mutation {
        createRoomByCompetenceId(competenceId: String!): RoomResponse 
    }
    
    extend type Query {
        rooms(from: Float!): [RoomResponse]
    }
`;
