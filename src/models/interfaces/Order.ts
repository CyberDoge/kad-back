import {OrderFilter} from 'src/types/request/OrderFilter';
import {Optional} from 'src/utils/typeUtils';

export type OrderType = {
    id: string,
    title: string,
    description: string,
    price: number,
    date: Date
}
export type OrderFilterType = Required<Pick<OrderFilter, 'count' | 'start'>>
    & Omit<OrderFilter, 'dateFrom' | 'dateTo'>
    & {
    dateFrom?: Date,
    dateTo?: Date
}


export interface Order {
    findByFilter(filter: OrderFilterType): Promise<OrderType[]>;

    find(order: Partial<OrderType>): Promise<OrderType | undefined>;

    save(order: Optional<OrderType, 'id'>): Promise<OrderType>;

}

