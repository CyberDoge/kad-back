import {OrderFilter} from 'src/types/request/OrderFilter';
import {OrderService} from 'src/services/interfaces/OrderService';


export const order = (orderService: OrderService) =>
    ({
        orders: async (_, {filter}: { filter: OrderFilter }) => {

            return await orderService.getOrdersByFilter(filter);
        }
    });
