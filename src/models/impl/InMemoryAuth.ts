import {Auth} from '../interfaces';

export class InMemoryAuth implements Auth {
    private authMap: Map<string, string>;

    constructor() {
        this.authMap = new Map();
    }

    async setUserIdByAuthorization(authorization: string, userId: string) {
        this.authMap.set(authorization, userId);
    }

    async getUserIdByAuthorization(authorization: string) {
        return this.authMap.get(authorization);
    }

}
