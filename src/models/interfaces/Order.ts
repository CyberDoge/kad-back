import {OrderFilter} from 'src/types/request/OrderFilter';

export type OrderType = {
    title: string,
    description: string,
    price: number,
    date: Date,
}
export type OrderFilterType = Omit<OrderFilter, 'dateFrom' | 'dateTo'>
    & Required<Pick<OrderFilter, 'count' | 'start' | 'priceFrom' | 'priceTo'>>

    & {
    dateFrom: Date,
    dateTo: Date
}


export interface Order {
    find(filter: OrderFilterType): Promise<OrderType[]>;
}

