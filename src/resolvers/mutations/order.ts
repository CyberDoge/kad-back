import {AuthenticationError} from 'apollo-server-express';
import {OrderService} from 'src/services/interfaces/OrderService';
import {Context} from 'src/types/Context';
import {CreateOrderRequest} from 'src/types/request';


export const order = (orderService: OrderService) =>
    ({
        createOrder: async (_, {order}: { order: CreateOrderRequest }, {user}: Context) => {
            if (!user) {
                throw new AuthenticationError('not authenticated');
            }

            return await orderService.createOrder(order, user);
        }
    });
