import {injectable} from 'inversify';
import {Optional} from 'src/utils/typeUtils';
import {v4 as uuid} from 'uuid';
import {Order, OrderFilterType, OrderType} from '../interfaces';
import {helper} from './dbHelper';

const DB_FILE_NAME = 'Order.json';
const h = helper(DB_FILE_NAME);

@injectable()
export class InFileOrder implements Order {
    private orders: OrderType[];

    constructor() {
        this.orders = [];

        h.readFromFile().then(res => {
            this.orders = res as OrderType[];
        }).catch(() => {
            this.orders = [];
            h.writeToFile(this.orders);
        });
    }

    async save(order: Optional<OrderType, 'id'>): Promise<OrderType> {
        const dbOrder = {...order, id: uuid()};
        this.orders.push(dbOrder);
        h.writeToFile(this.orders);

        return dbOrder;
    }

    async findByFilter(filter: OrderFilterType)
        : Promise<OrderType[]> {
        const {start, count, ...restFilter} = filter;

        return this.orders.filter((order) =>
            (!restFilter.title || order.title.toLocaleLowerCase().includes(restFilter.title.toLocaleLowerCase()))
            && (!restFilter.description ||
                order.description.toLocaleLowerCase().includes(restFilter.description.toLocaleLowerCase()))
            && (!restFilter.priceFrom || order.price > (restFilter.priceFrom))
            && (!restFilter.priceTo || order.price < (restFilter.priceTo))
            && (!restFilter.dateFrom || order.date > restFilter.dateFrom)
            && (!restFilter.dateTo || order.date < restFilter.dateTo)
        ).slice(start, start + count);

    }

    async find(order: Partial<OrderType>): Promise<OrderType | undefined> {
        return this.orders.find(o => (!order.id || order.id === o.id)
            && (!order.title || order.title === o.title)
            && (!order.description || order.description === o.description)
            && (!order.price || order.price === o.price));
    }

}
