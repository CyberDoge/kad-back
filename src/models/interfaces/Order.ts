import {OrderFilter} from 'src/types/request/OrderFilter';

export type OrderType = {
    title: string,
    description: string,
    price: number,
    date: Date,
}
export type OrderFilterType = Required<Pick<OrderFilter, 'count' | 'start'>>
    & Omit<OrderFilter, 'dateFrom' | 'dateTo'>
    & {
    dateFrom?: Date,
    dateTo?: Date
}


export interface Order {
    find(filter: OrderFilterType): Promise<OrderType[]>;
}

