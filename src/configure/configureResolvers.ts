import {container, TYPES} from 'src/ioc';
import {login, order as orderMutations, registration} from 'src/resolvers/mutations';
import {order as orderQueries} from 'src/resolvers/queries';
import {LoginService, OrderService, RegistrationService} from 'src/services/interfaces';
import {OrderInteractor} from 'src/useCaseInteractors/interfaces';

export const configureResolvers = () => {
    const loginService = container.get<LoginService>(TYPES.LoginService);
    const registrationService = container.get<RegistrationService>(TYPES.RegistrationService);
    const orderService = container.get<OrderService>(TYPES.OrderService);
    const orderInteractor = container.get<OrderInteractor>(TYPES.OrderInteractor);

    return {
        Mutation: {
            login: login(loginService),
            registration: registration(registrationService),
            ...orderMutations(orderInteractor)
        },
        Query: {
            ...orderQueries(orderService)
        }
    };
};
