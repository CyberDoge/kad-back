import {UserCompetenceType, UserDetailType, UserType} from 'src/models/interfaces';

export interface UserService {
    getAllUserDataById(userId: string): Promise<UserType & Partial<UserDetailType & UserCompetenceType> | null>;

    findUserById(userId: string): Promise<UserType | undefined>;

    updateUser(updatedUser: UserType): Promise<UserType>;
}
