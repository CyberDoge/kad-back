import {ApolloError} from 'apollo-server-express';
import {NewlyContractService} from 'src/services/interfaces';
import {OrderService} from 'src/services/interfaces/OrderService';
import {Context} from 'src/types/Context';
import {OrderFilter} from 'src/types/request/OrderFilter';


export const order = (orderService: OrderService, newlyContractService: NewlyContractService) =>
    ({
        orders: async (_, {filter}: { filter?: OrderFilter }) => {
            return await orderService.getOrdersByFilter(filter);
        },
        order: async (_, {orderId}: { orderId: string }) => {
            return await orderService.getOrderById(orderId);
        },
        myCreatedOrders: async (_, _1, {user}: Context) => {
            if (!user?.roles.includes('CUSTOMER')) {
                throw new ApolloError('Forbidden');
            }

            return await newlyContractService.getOrdersByCustomerId(user.id);
        }
    });
