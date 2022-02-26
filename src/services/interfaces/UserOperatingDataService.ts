import {OrderType, UserType} from 'src/models/interfaces';

export interface UserOperatingDataService {
    addFavoriteOrderByUserId(userId: UserType['id'], orderId: OrderType['id']);

    removeFavoriteOrderByUserId(userId: UserType['id'], orderId: OrderType['id']);

    createUserOperatingData(userId: UserType['id']);
}
