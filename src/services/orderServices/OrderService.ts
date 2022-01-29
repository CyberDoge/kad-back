import {OrderFilter} from 'src/types/request/OrderFilter';
import {OrderType} from 'src/models/interfaces/Order';
import {ValidationError} from 'apollo-server-errors';

// todo move interfaces and impl as in models
export interface OrderService {
    getOrdersByFilter(filter: OrderFilter): Promise<OrderType[] | ValidationError>;
}
