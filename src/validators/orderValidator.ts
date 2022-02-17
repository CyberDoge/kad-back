import {isValid} from 'date-fns';
import {OrderFilter} from 'src/types/request';
import {MAX_ORDERS_ARRAY_LENGTH} from '../consts';

export const validateOrderFilter = (filter?: OrderFilter): boolean => {
    if (!filter) {
        return true;
    }

    return (
        (!filter.count || filter.count < MAX_ORDERS_ARRAY_LENGTH)
        && (
            !filter.dateTo || isValid(filter.dateTo)
            && !filter.dateFrom || isValid(filter.dateFrom)
        )
    );
};
