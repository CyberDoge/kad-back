import {gql} from 'apollo-server-express';
import {COMMON_ORDERS_ARRAY_LENGTH} from 'src/consts';


export const Order = gql`
    type Order {
        id: String,
        title: String,
        description: String,
        price: Float,
        date: Float,
    }

    input OrderRequest {
        title: String!,
        description: String!,
        price: Float!,
    }

    input OrderFilter {
        start: Int = 0,
        count: Int = ${COMMON_ORDERS_ARRAY_LENGTH},
        title: String,
        description: String,
        priceFrom: Float,
        priceTo: Float,
        dateFrom: Float,
        dateTo: Float,
    }
    type Query {
        orders(filter: OrderFilter): [Order]
        order(orderId: String): Order
    }
    extend type Mutation {
        createOrder(order: OrderRequest!): Order
        enrollToOrder(orderId: String!): Boolean
    }
`;
