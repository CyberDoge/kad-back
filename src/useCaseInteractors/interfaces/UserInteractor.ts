import {OrderType, UserCompetenceType, UserDetailType, UserType} from 'src/models/interfaces';

export interface UserInteractor {
    updateUserDetail(userId: UserType['id'], userDetail: Omit<UserDetailType, 'id' | 'userId'>);

    updateUserCompetence(userId: UserType['id'], userCompetence: Omit<UserCompetenceType, 'id' | 'userId'>);

    addOrderToFavourite(userId: UserType['id'], orderId: OrderType['id']);
}
