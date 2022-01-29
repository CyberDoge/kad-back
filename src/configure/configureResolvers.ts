import {login, registration} from 'src/resolvers/mutations';
import {test} from 'src/resolvers/queries';
import {LoginServiceImpl} from 'src/services/loginServices/LoginServiceImpl';
import {RegistrationServiceImpl} from 'src/services/registrationServices/RegistrationServiceImpl';
import {Context} from 'src/context/Context';

export const configureResolvers = () => {
    const context = new Context();
    const loginService = new LoginServiceImpl(context);
    const registrationService = new RegistrationServiceImpl(context);
    return {
        Mutation: {
            login: login(loginService),
            registration: registration(registrationService)
        },
        Query: {
            test
        }
    };
};
