import {container} from 'src/iocContainer';
import {TYPES} from 'src/iocTypes';
import {login, registration} from 'src/resolvers/mutations';
import {order} from 'src/resolvers/queries';
import {LoginService, OrderService, RegistrationService} from 'src/services/interfaces';

export const configureResolvers = () => {
    const loginService = container.get<LoginService>(TYPES.LoginService);
    const registrationService = container.get<RegistrationService>(TYPES.RegistrationService);
    const orderService = container.get<OrderService>(TYPES.OrderService);

    return {
        Mutation: {
            login: login(loginService),
            registration: registration(registrationService)
        },
        Query: {
            ...order(orderService)
        }
    };
};
