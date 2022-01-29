import {gql} from 'apollo-server-express';

export const Order = gql`
    type Order {
        title: String,
        description: String,
        price: Float,
        date: String,
    }

    input OrderFilter {
        start: Int = 0,
        count: Int = 20,
        title: String,
        description: String,
        priceFrom: Float,
        priceTo: Float,
        dateFrom: String,
        dateTo: String,
    }
    type Query {
        orders(filter: OrderFilter): [Order]
    }
`;
