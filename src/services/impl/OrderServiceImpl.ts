import {ValidationError} from 'apollo-server-errors';
import {isMatch, parse} from 'date-fns';
import {MAX_SAFE_DATE} from 'src/consts';
import {OrderContext} from 'src/context/OrderContext';
import {Order, OrderType} from 'src/models/interfaces/Order';
import {OrderFilter} from 'src/types/request/OrderFilter';
import {OrderService} from '../interfaces';

const MAX_ORDERS_ARRAY_LENGTH = 100;
const DATE_FORMAT = 'dd-MM-yyyy';

export class OrderServiceImpl implements OrderService {
    private order: Order;

    constructor(context: OrderContext) {
        this.order = context.order;
    }

    async getOrdersByFilter(filter: OrderFilter): Promise<OrderType[] | ValidationError> {
        if (filter.count && filter.count > MAX_ORDERS_ARRAY_LENGTH) {
            return [];
        }

        if (
            filter.dateTo && !isMatch(filter.dateTo, DATE_FORMAT)
            || filter.dateFrom && !isMatch(filter.dateFrom, DATE_FORMAT)
        ) {
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
}
