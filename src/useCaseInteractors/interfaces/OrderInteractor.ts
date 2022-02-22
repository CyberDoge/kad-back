import {OrderType, UserType} from 'src/models/interfaces';
import {CreateOrderRequest} from 'src/types/request';

export interface OrderInteractor {
    createNewOrder(order: CreateOrderRequest, customerId: UserType['id']): Promise<OrderType>;

    enrollToOrder(orderId: OrderType['id'], executorId: UserType['id']);
}
