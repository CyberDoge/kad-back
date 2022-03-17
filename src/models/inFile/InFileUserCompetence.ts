import {injectable} from 'inversify';
import {remove} from 'lodash';
import {v4 as uuid} from 'uuid';
import {UserCompetence, UserCompetenceType, UserType} from '../interfaces';
import {helper} from './dbHelper';

const DB_FILE_NAME = 'userCompetence.json';
const h = helper(DB_FILE_NAME);

@injectable()
export class InFileUserCompetence implements UserCompetence {
    private userCompetences: UserCompetenceType[];

    constructor() {
        this.userCompetences = [];
        h.readFromFile().then(res => {
            this.userCompetences = res as UserCompetenceType[];
        }).catch(() => {
            this.userCompetences = [];
            h.writeToFile(this.userCompetences);
        });
    }

    async create(userCompetence: Omit<UserCompetenceType, 'id'>): Promise<UserCompetenceType> {
        const newUserCompetence = {
            id: uuid(),
            ...userCompetence
        };
        this.userCompetences.push(newUserCompetence);
        h.writeToFile(this.userCompetences);

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
        h.writeToFile(this.userCompetences);

        return updated;
    }


}
