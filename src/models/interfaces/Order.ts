import {OrderFilter} from 'src/types/request/OrderFilter';
import {Optional} from 'src/utils/typeUtils';
import {UserType} from './User';

export type OrderType = {
    id: string,
    title: string,
    description: string,
    price: number,
    date: Date,
    customer: UserType['id']
    executor?: UserType['id']
}
export type OrderFilterType = Required<Pick<OrderFilter, 'count' | 'start'>>
    & Omit<OrderFilter, 'dateFrom' | 'dateTo'>
    & {
    dateFrom?: Date,
    dateTo?: Date
}


export interface Order {
    find(filter: OrderFilterType): Promise<OrderType[]>;

    save(order: Optional<OrderType, 'id'>): Promise<OrderType>;

}

