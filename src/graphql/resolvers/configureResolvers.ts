import {
    event as eventMutation,
    login,
    order as orderMutations,
    registration,
    user as userMutation
} from 'src/graphql/resolvers/mutations';
import {
    event as eventQueries,
    order as orderQueries,
    orderAndUser,
    user as userQueries
} from 'src/graphql/resolvers/queries';
import {resolvedDependencies} from 'src/ioc/resolvedDependencies';

export const configureResolvers = ({
    loginService,
    orderService,
    userService,
    newlyContractService,
    eventService,
    userCompetenceService,
    orderInteractor,
    userInteractor,
    registrationInteractor,
}: ReturnType<typeof resolvedDependencies>
) => {
    return {
        Mutation: {
            login: login(loginService),
            registration: registration(registrationInteractor),
            ...orderMutations(orderInteractor),
            ...userMutation(userInteractor),
            ...eventMutation(eventService)
        },
        Query: {
            ...orderQueries(orderService, newlyContractService),
            ...userQueries(userService),
            ...eventQueries(eventService),
            ...orderAndUser(newlyContractService, userCompetenceService)
        }
    };
};
