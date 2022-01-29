import {OrderFilter} from 'src/types/request/OrderFilter';
import {OrderService} from 'src/services/orderServices/OrderService';


export const order = (orderService: OrderService) =>
    () => async (_, {orderFilter}: { orderFilter: OrderFilter }) => {
        return await orderService.getOrdersByFilter(orderFilter);
    };
