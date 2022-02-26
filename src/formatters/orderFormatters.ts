import {COMMON_ORDERS_ARRAY_LENGTH} from 'src/consts';
import {OrderFilterType, OrderType} from 'src/models/interfaces';
import {OrderFilter} from 'src/types/request';
import {OrderResponse} from 'src/types/response';

export const formatOrderModelToResponse = (order: OrderType): OrderResponse => {
    return {
        id: order.id,
        date: order.date,
        title: order.title,
        description: order.description,
        price: order.price,
    };
};

// todo заменить
export const formatOrderFilterRequestToModel = (filter?: OrderFilter): OrderFilterType => {
    if (!filter) {
        return {
            start: 0,
            count: COMMON_ORDERS_ARRAY_LENGTH,
            title: undefined,
            description: undefined,
            priceFrom: undefined,
            priceTo: undefined,
            dateFrom: undefined,
            dateTo: undefined,
        };
    }

    return {
        start: filter.start,
        count: filter.count,
        title: filter.title,
        description: filter.description,
        priceFrom: filter.priceFrom,
        priceTo: filter.priceTo,
        dateFrom: filter.dateFrom ? new Date(filter.dateFrom) : undefined,
        dateTo: filter.dateTo ? new Date(filter.dateTo) : undefined,
    };


};
