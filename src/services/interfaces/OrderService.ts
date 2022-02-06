import {ValidationError} from 'apollo-server-errors';
import {ContextUser} from 'src/types/ContextUser';
import {CreateOrderRequest} from 'src/types/request';
import {OrderFilter} from 'src/types/request/OrderFilter';
import {OrderResponse} from 'src/types/response';

export interface OrderService {
    getOrdersByFilter(filter?: OrderFilter): Promise<OrderResponse[] | ValidationError>;

    createOrder(order: CreateOrderRequest, user: ContextUser): Promise<OrderResponse | ValidationError>;
}
