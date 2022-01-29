import {Auth, Role, User} from 'src/models/interfaces';
import {InMemoryAuth, InMemoryRole, InMemoryUser} from 'src/models/impl';
import {RoleType} from 'src/models/interfaces/RoleType';
import {AuthContext} from './AuthContext';
import {ModelContext} from './ModelContext';

export class Context implements AuthContext, ModelContext {
    constructor() {
        this._auth = new InMemoryAuth();
        this._user = new InMemoryUser();
        this._role = new InMemoryRole();
    }

    private _auth: Auth;

    get auth(): Auth {
        return this._auth;
    }

    private _user: User;

    get user(): User {
        return this._user;
    }

    private _role: Role;

    get role(): Role {
        return this._role;
    }

    async getAuthScope(authorization: string): Promise<RoleType['roleName'][]> {
        const userId = await this._auth.getUserIdByAuthorization(authorization);
        if (!userId) {
            return [];
        }
        return (await this._user.findById(userId))?.roles.map(r => r.roleName) || [];
    }

}
