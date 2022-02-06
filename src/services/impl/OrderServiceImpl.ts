import {ValidationError} from 'apollo-server-errors';
import {inject, injectable} from 'inversify';
import {formatOrderFilterRequestToModel, formatOrderModelToResponse} from 'src/formatters';
import {TYPES} from 'src/iocTypes';
import {Order} from 'src/models/interfaces';
import {ContextUser} from 'src/types/ContextUser';
import {CreateOrderRequest, OrderFilter} from 'src/types/request';
import {OrderResponse} from 'src/types/response';
import {validateOrderFilter} from 'src/validators/orderValidator';
import {OrderService} from '../interfaces';


@injectable()
export class OrderServiceImpl implements OrderService {
    private order: Order;

    constructor(@inject(TYPES.Order) order: Order) {
        this.order = order;
    }

    async getOrdersByFilter(filter?: OrderFilter): Promise<OrderResponse[] | ValidationError> {

        if (!validateOrderFilter(filter)) {
            return new ValidationError('Invalid filter data');
        }

        return this.order.find(formatOrderFilterRequestToModel(filter));
    }

    async createOrder(order: Required<CreateOrderRequest>, user: ContextUser):
        Promise<OrderResponse | ValidationError> {

        return formatOrderModelToResponse(await this.order.save({...order, date: new Date(), customer: user.id}));
    }
}
