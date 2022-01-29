import {Order, OrderFilterType, OrderType} from '../interfaces/Order';

export class InMemoryOrder implements Order {
    private orders: OrderType[];

    constructor() {
        this.orders = [];
        for (let i = 1; i <= 500; i++) {
            this.orders.push({
                date: new Date(i * 60000000000),
                description: `description of #${i}`,
                price: i * 100000,
                title: `title of #${i}`
            });
        }
    }

    async find(filter: OrderFilterType)
        : Promise<OrderType[]> {
        const {start, count, ...restFilter} = filter;
        return this.orders.splice(start, start + count).filter((order) =>
            (restFilter.title ? order.title.includes(restFilter.title) : true)
            && order.price > (restFilter.priceFrom)
            && order.price < (restFilter.priceTo)
            && order.date > restFilter.dateFrom
            && order.date < restFilter.dateTo
        );

    }

}
