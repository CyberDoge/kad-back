import {allow, rule, shield} from 'graphql-shield';
import {Context} from 'src/types/Context';

export const isAdmin = rule()(async (_1, _2, ctx: Context) => {
    return !!ctx.user?.roles.includes('ADMIN');
});

export const isAuthenticated = rule()(async (_1, _2, ctx: Context) => {
    return !!ctx.user;
});


export const permissions = shield({
    Query: {
        '*': allow,
        currentUser: isAuthenticated,
    },
    Mutation: {
        login: allow,
        registration: allow,
        createOrder: isAdmin,
        updateCurrentUser: isAuthenticated
    },
});
