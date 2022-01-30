import {ValidationError} from 'apollo-server-errors';
import {OrderType} from 'src/models/interfaces/Order';
import {Order} from 'src/types/request/Order';
import {OrderFilter} from 'src/types/request/OrderFilter';

export interface OrderService {
    getOrdersByFilter(filter: OrderFilter): Promise<OrderType[] | ValidationError>;

    saveOrder(order: Order): Promise<OrderType | ValidationError>;
}
