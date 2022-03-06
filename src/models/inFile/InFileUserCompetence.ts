import {injectable} from 'inversify';
import {remove} from 'lodash';
import {v4 as uuid} from 'uuid';
import {UserCompetence, UserCompetenceType, UserType} from '../interfaces';
import {readFromFile, writeToFile} from './dbHelpers';

const DB_FILE_NAME = 'userCompetence.json';

@injectable()
export class InFileUserCompetence implements UserCompetence {
    private userCompetences: UserCompetenceType[];

    constructor() {
        this.userCompetences = [];
        readFromFile(DB_FILE_NAME).then(res => {
            this.userCompetences = res as UserCompetenceType[];
        }).catch(() => {
            this.userCompetences = [];
            writeToFile(DB_FILE_NAME, JSON.stringify(this.userCompetences));
        });
    }

    async create(userCompetence: Omit<UserCompetenceType, 'id'>): Promise<UserCompetenceType> {
        const newUserCompetence = {
            id: uuid(),
            ...userCompetence
        };
        this.userCompetences.push(newUserCompetence);
        writeToFile(DB_FILE_NAME, JSON.stringify(this.userCompetences));

        return newUserCompetence;
    }

    async getUserCompetenceByUserId(userId: UserType['id']): Promise<UserCompetenceType | undefined> {
        return this.userCompetences.find(c => c.userId === userId);
    }

    async updateByUserId(userId: UserType['id'], userCompetence: Partial<UserCompetenceType>):
        Promise<UserCompetenceType> {
        const removed = remove(this.userCompetences, (c) => c.userId === userId);
        if (!removed[0]) {
            throw new Error(`No such UserCompetence with userId = ${userId}`);
        }
        const updated = {
            ...removed[0],
            ...userCompetence,
        };
        this.userCompetences.push(updated);
        writeToFile(DB_FILE_NAME, JSON.stringify(this.userCompetences));

        return updated;
    }


}
