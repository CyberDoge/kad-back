import {UserType} from 'src/models/interfaces';
import {UserDetailType} from 'src/models/interfaces/UserDetailData';
import {UpdateUserInfo} from 'src/types/request/UpdateUserInfo';

export interface UserService {
    getAllUserDataById(userId: string): Promise<UserType & Partial<UserDetailType>>;

    findUserById(userId: string): Promise<UserType | undefined>;

    updateUserById(userId: string, updateUserInfo: UpdateUserInfo);
}
