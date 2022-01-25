import {User, UserType} from '../interfaces/User';

export class InMemoryUser implements User {
    private userMap: Map<string, UserType>;


    constructor() {
        this.userMap = new Map<string, UserType>();
    }

    async create(user: UserType) {
        this.userMap.set(user._id, user);

    }

    async findById(id: string): Promise<UserType> {
        return this.userMap.get(id);
    }

    async findByEmail(email: string): Promise<UserType | undefined> {
        return [...this.userMap.entries()].find(([_, u]) => u.email === email)[1];
    }
}
