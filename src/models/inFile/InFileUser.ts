import {injectable} from 'inversify';
import {remove} from 'lodash';
import {v4 as uuid} from 'uuid';
import {User, UserType} from '../interfaces';
import {readFromFile, writeToFile} from './dbHelpers';

const DB_FILE_NAME = 'user.json';

@injectable()
export class InFileUser implements User {
    private users: UserType[];


    constructor() {
        this.users = [];
        readFromFile(DB_FILE_NAME).then(res => {
            this.users = res as UserType[];
        }).catch(() => {
            this.users = [];
            writeToFile(DB_FILE_NAME, JSON.stringify(this.users));
        });
    }

    async save(user: UserType) {
        user.id = uuid();
        this.users.push(user);
        writeToFile(DB_FILE_NAME, JSON.stringify(this.users));

        return user;

    }

    async findById(id: string): Promise<UserType | undefined> {
        return this.users.find(user => user.id === id);
    }

    async findByEmail(email: string): Promise<UserType | undefined> {
        return this.users.find(user => user.email === email);
    }

    async update(user: UserType): Promise<UserType> {
        remove(this.users, (u) => u.id === user.id);
        this.users.push(user);
        writeToFile(DB_FILE_NAME, JSON.stringify(this.users));

        return user;
    }
}
