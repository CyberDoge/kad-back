export interface OrderFilter {
    start: number;
    count: number,
    title?: string,
    description?: string,
    priceFrom?: number,
    priceTo?: number,
    dateFrom?: number,
    dateTo?: number,
}
