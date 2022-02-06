import {gql} from 'apollo-server-express';
import {COMMON_ORDERS_ARRAY_LENGTH} from 'src/consts';


export const Order = gql`
    type Order {
        title: String,
        description: String,
        price: Float,
        date: String,
    }

    input OrderFilter {
        start: Int = 0,
        count: Int = ${COMMON_ORDERS_ARRAY_LENGTH},
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
