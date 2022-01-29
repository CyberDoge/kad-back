import {Auth, Role, User} from '../models/interfaces';

export interface ModelContext {
    readonly auth: Auth;
    readonly user: User;
    readonly role: Role;
}
