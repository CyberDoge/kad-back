import {injectable} from 'inversify';
import {Auth, UserType} from '../interfaces';

@injectable()
export class InMemoryAuth implements Auth {
    private authMap: Map<string, UserType['id']>;

    constructor() {
        this.authMap = new Map();
    }

    async setUserIdByAuthorization(authorization: string, userId: UserType['id']) {
        this.authMap.set(authorization, userId);
    }

    async getUserIdByAuthorization(authorization: string) {
        return this.authMap.get(authorization);
    }

}
