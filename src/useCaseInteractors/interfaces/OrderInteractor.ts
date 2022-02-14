import {OrderType, UserType} from 'src/models/interfaces';
import {CreateOrderRequest} from 'src/types/request';
import {OrderResponse} from 'src/types/response';

export interface OrderInteractor {
    createNewOrder(order: CreateOrderRequest, customerId: UserType['id']): Promise<OrderResponse>;

    enrollToOrder(orderId: OrderType['id'], executorId: UserType['id']);
}
