import {gql} from 'apollo-server-express';

export const OrderAndUser = gql`
    type OrderExecutorsWorkExperience {
        workExperienceArray: [WorkExperience],
        id: String
    }
    extend type Query {
        orderExecutorsWorkExperience(orderId: String): [OrderExecutorsWorkExperience]
    }
`;
