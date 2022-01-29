import {User, UserType} from '../interfaces/User';

export class InMemoryUser implements User {
    private userMap: UserType[];


    constructor() {
        this.userMap = [];
    }

    async create(user: UserType) {
        this.userMap.push(user);

    }

    async findById(id: string): Promise<UserType | undefined> {
        return this.userMap.find(user => user._id === id);
    }

    async findByEmail(email: string): Promise<UserType | undefined> {
        return this.userMap.find(user => user.email === email);
    }
}
