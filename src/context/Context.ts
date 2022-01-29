import {Auth, Role, User} from 'src/models/interfaces';
import {InMemoryAuth, InMemoryRole, InMemoryUser} from 'src/models/impl';
import {RoleType} from 'src/models/interfaces/RoleType';
import {AuthContext} from './AuthContext';
import {ModelContext} from './ModelContext';
import {OrderContext} from './OrderContext';
import {Order} from 'src/models/interfaces/Order';
import {InMemoryOrder} from 'src/models/impl/InMemoryOrder';

export class Context implements AuthContext, ModelContext, OrderContext {
    private _auth: Auth;
    private _user: User;
    private _role: Role;
    private _order: Order;

    constructor() {
        this._auth = new InMemoryAuth();
        this._user = new InMemoryUser();
        this._role = new InMemoryRole();
        this._order = new InMemoryOrder();
    }

    get order(): Order {
        return this._order;
    }

    get auth(): Auth {
        return this._auth;
    }

    get user(): User {
        return this._user;
    }

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
