import {injectable} from 'inversify';
import {Optional} from 'src/utils/typeUtils';
import {Order, OrderFilterType, OrderType} from '../interfaces';

@injectable()
export class InMemoryOrder implements Order {
    private orders: OrderType[];

    constructor() {
        this.orders = [];

        for (let i = 0; i < 30; i++) {
            this.orders.push({
                id: `id${i}`,
                title: `title${i}`,
                description: `description${i}`,
                date: new Date(),
                price: (i + 10) * 100
            });
        }
    }

    async save(order: Optional<OrderType, 'id'>): Promise<OrderType> {
        const dbOrder = {...order, id: `${this.orders.length}`};
        this.orders.push(dbOrder);

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
