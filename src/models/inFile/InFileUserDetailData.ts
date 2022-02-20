import {injectable} from 'inversify';
import {v4 as uuid} from 'uuid';
import {UserDetail, UserDetailType, UserType} from '../interfaces';
import {readFromFile, writeToFile} from './dbHelpers';

const DB_FILE_NAME = 'userDetailData';

@injectable()
export class InFileUserDetailData implements UserDetail {
    private userDetailData: UserDetailType[];

    constructor() {
        this.userDetailData = [];
        readFromFile(DB_FILE_NAME).then(data => this.userDetailData = JSON.parse(data) as UserDetailType[]);
    }

    async create(userDetail: Omit<UserDetailType, 'id'>): Promise<UserDetailType> {
        const newUserDetail = {...userDetail, id: uuid()};
        this.userDetailData.push(newUserDetail);
        writeToFile(DB_FILE_NAME, JSON.stringify(this.userDetailData));

        return newUserDetail;
    }

    async findByUserId(userId: UserType['id']): Promise<UserDetailType | undefined> {
        return this.userDetailData.find((detail) => detail.userId === userId);
    }

    async update(userDetail: UserDetailType): Promise<UserDetailType> {
        const index = this.userDetailData.findIndex(detail => detail.id === userDetail.id);
        if (index === -1) {
            throw new Error(`cannot update userDetail with id = ${userDetail.id}`);
        }
        this.userDetailData[index] = {
            ...userDetail
        };
        writeToFile(DB_FILE_NAME, JSON.stringify(this.userDetailData));

        return this.userDetailData[index];
    }


}
