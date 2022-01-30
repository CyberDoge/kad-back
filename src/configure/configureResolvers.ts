import {Context} from 'src/context/impl/Context';
import {login, registration} from 'src/resolvers/mutations';
import {order} from 'src/resolvers/queries';
import {LoginServiceImpl} from 'src/services/impl/LoginServiceImpl';
import {OrderServiceImpl} from 'src/services/impl/OrderServiceImpl';
import {RegistrationServiceImpl} from 'src/services/impl/RegistrationServiceImpl';

export const configureResolvers = () => {
    const context = new Context();
    const loginService = new LoginServiceImpl(context);
    const registrationService = new RegistrationServiceImpl(context);
    const orderService = new OrderServiceImpl(context);

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
