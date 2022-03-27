import {injectable} from 'inversify';
import {remove, sortedUniq} from 'lodash';
import {helper} from 'src/models/inFile/dbHelper';
import {v4 as uuid} from 'uuid';
import {OrderType, UserOperatingData, UserOperatingDataType, UserType} from '../interfaces';

const DB_FILE_NAME = 'UserOperatingData.json';
const h = helper(DB_FILE_NAME);

@injectable()
export class InFileUserOperatingData implements UserOperatingData {
    private operatingData: UserOperatingDataType[];

    constructor() {
        this.operatingData = [];
        h.readFromFile().then(res => {
            this.operatingData = res as UserOperatingDataType[];
        }).catch(() => {
            this.operatingData = [];
            h.writeToFile(this.operatingData);
        });
    }

    addFavoriteOrderByUserId(userId: UserType['id'], orderId: OrderType['id']) {
        const data = this.operatingData.find(data => data.userId === userId);
        if (!data) {
            throw new Error(`No such UserOperatingData with userId = ${userId}`);
        }
        data.favoriteOrderIds.push(orderId);
        sortedUniq(data.favoriteOrderIds);
        h.writeToFile(this.operatingData);
    }

    removeFavoriteOrderByUserId(userId: UserType['id'], orderId: OrderType['id']) {
        const data = this.operatingData.find(data => data.userId === userId);
        if (!data) {
            throw new Error(`No such UserOperatingData with userId = ${userId}`);
        }
        remove(data.favoriteOrderIds, orderId);
        h.writeToFile(this.operatingData);
    }

    async create(userOperatingData: Omit<UserOperatingDataType, 'id'>): Promise<UserOperatingDataType> {
        const newOperationData = {
            ...userOperatingData,
            id: uuid()
        };
        this.operatingData.push(newOperationData);
        h.writeToFile(this.operatingData);

        return newOperationData;
    }
}
