import {OrderService} from './OrderService';
import {OrderContext} from 'src/context/OrderContext';
import {Order, OrderType} from 'src/models/interfaces/Order';
import {OrderFilter} from 'src/types/request/OrderFilter';
import {isValid, parse} from 'date-fns';
import {ValidationError} from 'apollo-server-errors';

const COMMON_ORDERS_ARRAY_LENGTH = 20;
const MAX_ORDERS_ARRAY_LENGTH = 100;
const DATE_FORMAT = 'DD-MM-YYYY';

export class OrderServiceImpl implements OrderService {
    private order: Order;

    constructor(context: OrderContext) {
        this.order = context.order;
    }

    async getOrdersByFilter(filter: OrderFilter): Promise<OrderType[] | ValidationError> {
        if (filter.count && filter.count > MAX_ORDERS_ARRAY_LENGTH) {
            return [];
        }

        if (filter.dateTo && !isValid(filter.dateTo) || filter.dateFrom && !isValid(filter.dateFrom)) {
            return new ValidationError('dates are not in valid format');
        }

        const filledFilter = {
            start: filter.start || 0,
            count: filter.count || COMMON_ORDERS_ARRAY_LENGTH,
            title: filter.title,
            description: filter.description,
            priceFrom: filter.priceFrom || 0,
            priceTo: filter.priceTo || Number.MAX_SAFE_INTEGER,
            dateFrom: parse(filter.dateFrom || '', DATE_FORMAT, new Date(0)),
            dateTo: parse(filter.dateTo || '', DATE_FORMAT, new Date(Number.MAX_SAFE_INTEGER)),

        };
        return await this.order.find(filledFilter);
    }
}
