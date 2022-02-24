import {gql} from 'apollo-server-express';

export const Event = gql`

    type Event {
        id: String,
        title: String,
        description: String,
        date: Float,
    }

    extend type Query {
        events: [Event]
    }
    extend type Mutation {
        checkEvents(eventIds: [ID]!): Boolean
    }
`;
