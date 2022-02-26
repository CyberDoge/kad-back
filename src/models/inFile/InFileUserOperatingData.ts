import {injectable} from 'inversify';
import {remove, sortedUniq} from 'lodash';
import {v4 as uuid} from 'uuid';
import {OrderType, UserOperatingData, UserOperatingDataType, UserType} from '../interfaces';
import {readFromFile, writeToFile} from './dbHelpers';

const DB_FILE_NAME = 'UserOperatingData.json';

@injectable()
export class InFileUserOperatingData implements UserOperatingData {
    private operatingData: UserOperatingDataType[];

    constructor() {
        this.operatingData = [];
        readFromFile(DB_FILE_NAME).then(res => {
            this.operatingData = res as UserOperatingDataType[];
        }).catch(() => {
            this.operatingData = [];
            writeToFile(DB_FILE_NAME, JSON.stringify(this.operatingData));
        });
    }

    addFavoriteOrderByUserId(userId: UserType['id'], orderId: OrderType['id']) {
        const data = this.operatingData.find(data => data.userId === userId);
        if (!data) {
            throw new Error(`No such UserOperatingData with userId = ${userId}`);
        }
        data.favoriteOrderIds.push(orderId);
        sortedUniq(data.favoriteOrderIds);
        writeToFile(DB_FILE_NAME, JSON.stringify(this.operatingData));
    }

    removeFavoriteOrderByUserId(userId: UserType['id'], orderId: OrderType['id']) {
        const data = this.operatingData.find(data => data.userId === userId);
        if (!data) {
            throw new Error(`No such UserOperatingData with userId = ${userId}`);
        }
        remove(data.favoriteOrderIds, orderId);
        writeToFile(DB_FILE_NAME, JSON.stringify(this.operatingData));
    }

    async create(userOperatingData: Omit<UserOperatingDataType, 'id'>): Promise<UserOperatingDataType> {
        const newOperationData = {
            ...userOperatingData,
            id: uuid()
        };
        this.operatingData.push(newOperationData);
        writeToFile(DB_FILE_NAME, JSON.stringify(this.operatingData));

        return newOperationData;
    }
}
