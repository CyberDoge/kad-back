import {Auth} from 'src/models/interfaces/Auth';
import {RoleType} from 'src/models/interfaces/Role';
import {InMemoryAuth} from 'src/models/impl/InMemoryAuth';
import {AuthContext} from './AuthContext';
import {User} from 'src/models/interfaces/User';
import {InMemoryUser} from 'src/models/impl/InMemoryUser';

export class Context implements AuthContext {
    private auth: Auth;
    private user: User;

    constructor() {
        this.auth = new InMemoryAuth();
        this.user = new InMemoryUser();
    }

    async getAuthScope(authorization: string): Promise<RoleType['roleName'][]> {
        const userId = await this.auth.getUserIdByAuthorization(authorization);
        return (await this.user.findById(userId)).roles.map(r=>r.roleName);
    }

}
