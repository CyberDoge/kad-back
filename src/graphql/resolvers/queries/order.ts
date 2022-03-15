import {ForbiddenError} from 'apollo-server-express';
import {internalization} from 'src/internalization';
import {NewlyContractService, OrderService} from 'src/services/interfaces';
import {Context} from 'src/types/Context';
import {OrderFilter} from 'src/types/request';


export const order = (orderService: OrderService, newlyContractService: NewlyContractService) =>
    ({
        orders: async (_, {filter}: { filter: OrderFilter }) => {
            return await orderService.getOrdersByFilter(filter);
        },
        order: async (_, {orderId}: { orderId: string }) => {
            return await orderService.getOrderById(orderId);
        },
        myCreatedOrders: async (_, _1, {user}: Context) => {
            if (!user?.roles.includes('CUSTOMER')) {
                throw new ForbiddenError(internalization.translate('Forbidden role'));
            }

            return await newlyContractService.getOrdersByCustomerId(user.id);
        },
        isOrderEnrolledByMe: async (_, {orderId}: { orderId: string }, {user}: Context) => {
            return newlyContractService.isExecutorEnrolledToOrder(orderId, user?.id);
        }
    });
