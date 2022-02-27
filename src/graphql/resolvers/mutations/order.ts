import {AuthenticationError} from 'apollo-server-express';
import {Context} from 'src/types/Context';
import {CreateOrderRequest} from 'src/types/request';
import {OrderInteractor} from 'src/useCaseInteractors/interfaces';


export const order = (orderInteractor: OrderInteractor) =>
    ({
        createOrder: async (_, {order}: { order: CreateOrderRequest }, {user}: Context) => {
            if (!user) {
                throw new AuthenticationError('not authenticated');
            }

            return await orderInteractor.createNewOrder(order, user.id);

        },
        enrollToOrder: async (_, {orderId}: { orderId: string }, {user}: Context) => {
            if (!user) {
                throw new AuthenticationError('not authenticated');
            }

            return await orderInteractor.enrollToOrder(orderId, user.id);
        },
        unEnrollToOrder: async (_, {orderId}: { orderId: string }, {user}: Context) => {
            if (!user) {
                throw new AuthenticationError('not authenticated');
            }

            return await orderInteractor.unEnrollToOrder(orderId, user.id);

        },
    });
