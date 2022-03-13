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
import {container, TYPES} from 'src/ioc';
import {
    EventService,
    LoginService,
    NewlyContractService,
    OrderService,
    UserCompetenceService,
    UserService
} from 'src/services/interfaces';
import {OrderInteractor, RegistrationInteractor, UserInteractor} from 'src/useCaseInteractors/interfaces';

export const configureResolvers = () => {
    const loginService = container.get<LoginService>(TYPES.LoginService);
    const orderService = container.get<OrderService>(TYPES.OrderService);
    const userService = container.get<UserService>(TYPES.UserService);
    const newlyContractService = container.get<NewlyContractService>(TYPES.NewlyContractService);
    const eventService = container.get<EventService>(TYPES.EventService);
    const userCompetenceService = container.get<UserCompetenceService>(TYPES.UserCompetenceService);

    const orderInteractor = container.get<OrderInteractor>(TYPES.OrderInteractor);
    const userInteractor = container.get<UserInteractor>(TYPES.UserInteractor);
    const registrationInteractor = container.get<RegistrationInteractor>(TYPES.RegistrationInteractor);

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
