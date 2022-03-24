import {
    event as eventMutation,
    login,
    order as orderMutations,
    registration,
    room as roomMutation,
    user as userMutation
} from 'src/graphql/resolvers/mutations';
import {
    event as eventQueries,
    order as orderQueries,
    orderAndUser,
    user as userQueries,
    room as roomQueries,
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
    roomService,
}: ReturnType<typeof resolvedDependencies>
) => {
    return {
        Mutation: {
            login: login(loginService),
            registration: registration(registrationInteractor),
            ...orderMutations(orderInteractor),
            ...userMutation(userInteractor),
            ...eventMutation(eventService),
            ...roomMutation(roomService, userCompetenceService),
        },
        Query: {
            ...orderQueries(orderService, newlyContractService),
            ...userQueries(userService),
            ...eventQueries(eventService),
            ...orderAndUser(newlyContractService, userCompetenceService),
            ...roomQueries(roomService)
        }
    };
};
