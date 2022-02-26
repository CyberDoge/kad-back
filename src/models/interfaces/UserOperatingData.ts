import {OrderType} from 'src/models/interfaces/Order';
import {UserType} from './User';

export type UserOperatingDataType = {
    id: string,
    userId: UserType['id'],
    favoriteOrderIds: OrderType['id'][]
}

export interface UserOperatingData {
    addFavoriteOrderByUserId(userId: UserType['id'], orderId: OrderType['id']);

    removeFavoriteOrderByUserId(userId: UserType['id'], orderId: OrderType['id']);

    create(userOperatingData: Omit<UserOperatingDataType, 'id'>): Promise<UserOperatingDataType>;
}
