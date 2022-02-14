import {ValidationError} from 'apollo-server-errors';
import {inject, injectable} from 'inversify';
import {formatOrderFilterRequestToModel} from 'src/formatters';
import {TYPES} from 'src/iocTypes';
import {Order, OrderType} from 'src/models/interfaces';
import {CreateOrderRequest, OrderFilter} from 'src/types/request';
import {validateOrderFilter} from 'src/validators/orderValidator';
import {OrderService} from '../interfaces';


@injectable()
export class OrderServiceImpl implements OrderService {
    private order: Order;

    constructor(@inject(TYPES.Order) order: Order) {
        this.order = order;
    }

    async getOrderById(orderId: OrderType['id']): Promise<OrderType | undefined> {
        return this.order.find({id: orderId});
    }

    async getOrdersByFilter(filter?: OrderFilter): Promise<OrderType[]> {

        if (!validateOrderFilter(filter)) {
            throw new ValidationError('Invalid filter data');
        }

        return this.order.findByFilter(formatOrderFilterRequestToModel(filter));
    }

    async createOrder(order: CreateOrderRequest): Promise<OrderType> {

        return await this.order.save({...order, date: new Date()});
    }
}
