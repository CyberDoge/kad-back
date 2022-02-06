import {injectable} from 'inversify';
import {User, UserType} from '../interfaces';

@injectable()
export class InMemoryUser implements User {
    private users: UserType[];


    constructor() {
        this.users = [{
            id: '1',
            email: 'test@mail.com',
            roles: [{roleName: 'ADMIN', id: '1'}],
            password: '123123'
        }];
    }

    async save(user: UserType) {
        user.id = `${this.users.length}`;
        this.users.push(user);

        return user;

    }

    async findById(id: string): Promise<UserType | undefined> {
        return this.users.find(user => user.id === id);
    }

    async findByEmail(email: string): Promise<UserType | undefined> {
        return this.users.find(user => user.email === email);
    }
}
