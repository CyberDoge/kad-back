import {allow, rule, shield} from 'graphql-shield';
import {internalization} from 'src/internalization';
import {Context} from 'src/types/Context';

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
        orders: allow,
        order: allow,
        '*': isAuthenticated,
        myCreatedOrders: isCustomer,
        orderExecutorsWorkExperience: isCustomer,
        isOrderEnrolledByMe: isExecutor,
    },
    Mutation: {
        login: allow,
        registration: allow,
        '*': isAuthenticated,
        createOrder: isCustomer,
        enrollToOrder: isExecutor,
        unEnrollToOrder: isExecutor
    },
}, {
    allowExternalErrors: true,
    fallbackError: Error(internalization.translate('Not authorized'))
});
