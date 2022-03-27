import {injectable} from 'inversify';
import {v4 as uuid} from 'uuid';
import {UserDetail, UserDetailType, UserType} from '../interfaces';
import {helper} from './dbHelper';

const DB_FILE_NAME = 'userDetailData.json';
const h = helper(DB_FILE_NAME);

@injectable()
export class InFileUserDetailData implements UserDetail {
    private userDetailData: UserDetailType[];

    constructor() {
        this.userDetailData = [];
        h.readFromFile().then(res => {
            this.userDetailData = res as UserDetailType[];
        }).catch(() => {
            this.userDetailData = [];
            h.writeToFile(this.userDetailData);
        });
    }

    async create(userDetail: Omit<UserDetailType, 'id'>): Promise<UserDetailType> {
        const newUserDetail = {...userDetail, id: uuid()};
        this.userDetailData.push(newUserDetail);
        h.writeToFile(this.userDetailData);

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
        h.writeToFile(this.userDetailData);

        return this.userDetailData[index];
    }


}
