import {allow, rule, shield} from 'graphql-shield';
import {Context} from 'src/types/Context';

const isAdmin = rule()(async (_1, _2, ctx: Context) => {
    return !!ctx.user?.roles.includes('ADMIN');
});

const isAuthenticated = rule()(async (_1, _2, ctx: Context) => {
    return !!ctx.user;
});

const isCustomer = rule()(async (_1, _2, ctx: Context) => {
    return !!ctx.user?.roles.includes('CUSTOMER');
});

const isExecutor = rule()(async (_1, _2, ctx: Context) => {
    return !!ctx.user?.roles.includes('EXECUTOR');
});


export const permissions = shield({
    Query: {
        '*': allow,
        currentUser: isAuthenticated,
        myCreatedOrders: isCustomer,
    },
    Mutation: {
        login: allow,
        registration: allow,
        createOrder: isCustomer,
        updateCurrentUser: isAuthenticated
    },
});
