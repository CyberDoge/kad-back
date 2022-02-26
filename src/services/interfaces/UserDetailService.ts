import {UserDetailType, UserType} from 'src/models/interfaces';

export interface UserDetailService {
    updateUserDetails(userId: UserType['id'], userDetail: Omit<UserDetailType, 'id' | 'userId'>);

    createUserDetails(userId: UserType['id']);

}
