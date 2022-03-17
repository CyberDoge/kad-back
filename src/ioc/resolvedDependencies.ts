import {container} from 'src/ioc/iocContainer';
import {TYPES} from 'src/ioc/iocTypes';
import {
    EventService,
    LoginService,
    NewlyContractService,
    OrderService,
    UserCompetenceService,
    UserService
} from 'src/services/interfaces';
import {OrderInteractor, RegistrationInteractor, UserInteractor} from 'src/useCaseInteractors/interfaces';

export const resolvedDependencies = () => {
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
        loginService,
        orderService,
        userService,
        newlyContractService,
        eventService,
        userCompetenceService,
        orderInteractor,
        userInteractor,
        registrationInteractor,
        
    };

};
