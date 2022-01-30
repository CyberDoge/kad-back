import {ModelContext} from 'src/context/interfaces';
import {Auth, RoleType, User, UserType} from '../interfaces';

export class InMemoryAuth implements Auth {
    private authMap: Map<string, UserType['id']>;
    private user: User;

    constructor(context: ModelContext) {
        this.authMap = new Map();
        this.user = context.user;
    }

    async setUserIdByAuthorization(authorization: string, userId: UserType['id']) {
        this.authMap.set(authorization, userId);
    }

    async getUserIdByAuthorization(authorization: string) {
        return this.authMap.get(authorization);
    }

    async getAuthScope(authorization: string): Promise<RoleType['roleName'][]> {
        const userId = await this.getUserIdByAuthorization(authorization);
        if (!userId) {
            return [];
        }

        return (await this.user.findById(userId))?.roles.map(r => r.roleName) || [];
    }

}
