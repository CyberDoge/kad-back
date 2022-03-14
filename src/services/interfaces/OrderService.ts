import {OrderType} from 'src/models/interfaces';
import {CreateOrderRequest} from 'src/types/request';
import {OrderFilter} from 'src/types/request/OrderFilter';

export interface OrderService {
    getOrderById(orderId: OrderType['id']): Promise<OrderType | undefined>;

    getOrdersByFilter(filter: OrderFilter): Promise<OrderType[]>;

    createOrder(order: CreateOrderRequest): Promise<OrderType>;
}
