import {Room} from 'src/graphql/typeDefs/Room';
import {Event} from './Event';
import {Login} from './Login';
import {Order} from './Order';
import {OrderAndUser} from './OrderAndUser';
import {Registration} from './Registration';
import {Role} from './Role';
import {User} from './User';


export const typeDefs = [
    Role,
    Login,
    Registration,
    Order,
    User,
    OrderAndUser,
    Event,
    Room,
];
