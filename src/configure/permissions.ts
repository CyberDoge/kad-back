import {allow, rule, shield} from 'graphql-shield';
import {Context} from 'src/types/Context';

export const isAdmin = rule()(async (_1, _2, ctx: Context) => {
    return !!ctx.user?.roles.includes('ADMIN');
});

export const isAuthenticated = rule()(async (_1, _2, ctx: Context) => {
    return !!ctx.user?.roles.length;
});


export const permissions = shield({
    Query: {
        '*': allow
    },
    Mutation: {
        login: allow,
        registration: allow,
        createOrder: isAdmin
    },
});
