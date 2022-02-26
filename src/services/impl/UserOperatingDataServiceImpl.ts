import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {OrderType, UserOperatingData, UserType} from 'src/models/interfaces';
import {UserOperatingDataService} from '../interfaces';

@injectable()
export class UserOperatingDataServiceImpl implements UserOperatingDataService {
    private userOperatingData: UserOperatingData;

    constructor(@inject(TYPES.UserOperatingData) userOperatingData: UserOperatingData) {
        this.userOperatingData = userOperatingData;
    }

    addFavoriteOrderByUserId(userId: UserType['id'], orderId: OrderType['id']) {
        this.userOperatingData.addFavoriteOrderByUserId(userId, orderId);
    }

    removeFavoriteOrderByUserId(userId: UserType['id'], orderId: OrderType['id']) {
        this.userOperatingData.removeFavoriteOrderByUserId(userId, orderId);
    }

    createUserOperatingData(userId: UserType['id']) {
        this.userOperatingData.create({
            userId,
            favoriteOrderIds: []
        });
    }

}
