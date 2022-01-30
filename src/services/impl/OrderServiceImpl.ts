import {ValidationError} from 'apollo-server-errors';
import {parse} from 'date-fns';
import {inject, injectable} from 'inversify';
import {DATE_FORMAT, MAX_SAFE_DATE} from 'src/consts';
import {TYPES} from 'src/iocTypes';
import {Auth, Order, OrderType} from 'src/models/interfaces';
import {Order as OrderRequest, OrderFilter} from 'src/types/request';
import {validateOrderFilter} from 'src/validators/orderValidator';
import {OrderService} from '../interfaces';

@injectable()
export class OrderServiceImpl implements OrderService {
    private order: Order;
    private auth: Auth;

    constructor(@inject(TYPES.Order) order: Order, @inject(TYPES.Auth) auth: Auth) {
        this.order = order;
        this.auth = auth;
    }

    async getOrdersByFilter(filter: OrderFilter): Promise<OrderType[] | ValidationError> {

        if (validateOrderFilter(filter)) {
            return new ValidationError('dates are not in valid format');
        }

        const filledFilter = {
            start: filter.start,
            count: filter.count,
            title: filter.title,
            description: filter.description,
            priceFrom: filter.priceFrom,
            priceTo: filter.priceTo,
            dateFrom: filter.dateFrom ? parse(filter.dateFrom, DATE_FORMAT, 0) : undefined,
            dateTo: filter.dateTo ? parse(filter.dateTo, DATE_FORMAT, MAX_SAFE_DATE) : undefined,
        };

        return this.order.find(filledFilter);
    }

    async saveOrder(order: Required<OrderRequest>): Promise<OrderType | ValidationError> {

        const dbOrder = {
            title: order.title,
            description: order.description,
            price: order.price,
            date: order.date,
            customer: 'asd',
        };

        return this.order.save(dbOrder);
    }
}
