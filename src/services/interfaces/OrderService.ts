import {ValidationError} from 'apollo-server-errors';
import {OrderDto} from 'src/types/dto/OrderDto';
import {OrderFilter} from 'src/types/request/OrderFilter';

export interface OrderService {
    getOrdersByFilter(filter: OrderFilter): Promise<OrderDto[] | ValidationError>;

    saveOrder(order: OrderDto): Promise<OrderDto | ValidationError>;
}
