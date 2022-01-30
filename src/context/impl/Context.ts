import {InMemoryAuth, InMemoryOrder, InMemoryRole, InMemoryUser} from 'src/models/impl';
import {Auth, Order, Role, User} from 'src/models/interfaces';
import {AuthContext, ModelContext, OrderContext} from '../interfaces';

export class Context implements AuthContext, ModelContext, OrderContext {
    private _auth: Auth;
    private _user: User;
    private _role: Role;
    private _order: Order;

    constructor() {
        this._auth = new InMemoryAuth(this);
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

}
