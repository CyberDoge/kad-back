import {UserType} from 'src/models/interfaces/User';

export type UserDetailType = {
    id: string;
    userId: UserType['id'],
    firstName: string,
    secondName: string,
    thirdName?: string,
    emails: string[],
    phones: string[],
    avatarUrl?: string,
}

export interface UserDetail {
    findByUserId(userId: UserType['id']): Promise<UserDetailType | undefined>;

    create(userDetail: Omit<UserDetailType, 'id'>): Promise<UserDetailType>;

    update(userDetail: UserDetailType): Promise<UserDetailType>;

}
