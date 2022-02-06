import {RoleNameEmum} from 'src/consts/RoleNameEmum';

export type ContextUser = {
    id: string,
    roles: (keyof typeof RoleNameEmum)[]
}
