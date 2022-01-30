import {isMatch} from 'date-fns';
import {OrderFilter} from 'src/types/request';
import {DATE_FORMAT, MAX_ORDERS_ARRAY_LENGTH} from '../consts';

export const validateOrderFilter = (filter: OrderFilter): boolean => {
    return !!(
        (filter.count && filter.count > MAX_ORDERS_ARRAY_LENGTH)
        || (
            filter.dateTo && !isMatch(filter.dateTo, DATE_FORMAT)
            || filter.dateFrom && !isMatch(filter.dateFrom, DATE_FORMAT)
        )
    );
};
