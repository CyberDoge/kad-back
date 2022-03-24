import {ChatController} from 'src/chat/ChatController';
import {ConnectionStore} from 'src/chat/connectionStore';
import {container} from 'src/ioc/iocContainer';
import {TYPES} from 'src/ioc/iocTypes';
import {
    EventService,
    LoginService,
    NewlyContractService,
    OrderService, RoomService,
    UserCompetenceService,
    UserService
} from 'src/services/interfaces';
import {
    ChatInteractor,
    OrderInteractor,
    RegistrationInteractor,
    UserInteractor
} from 'src/useCaseInteractors/interfaces';

export const resolvedDependencies = () => {
    const loginService = container.get<LoginService>(TYPES.LoginService);
    const orderService = container.get<OrderService>(TYPES.OrderService);
    const userService = container.get<UserService>(TYPES.UserService);
    const newlyContractService = container.get<NewlyContractService>(TYPES.NewlyContractService);
    const eventService = container.get<EventService>(TYPES.EventService);
    const userCompetenceService = container.get<UserCompetenceService>(TYPES.UserCompetenceService);
    const roomService = container.get<RoomService>(TYPES.RoomService);

    const connectionStore = container.get<ConnectionStore>(TYPES.ConnectionStore);
    const chatController = container.get<ChatController>(TYPES.ChatController);

    const orderInteractor = container.get<OrderInteractor>(TYPES.OrderInteractor);
    const userInteractor = container.get<UserInteractor>(TYPES.UserInteractor);
    const registrationInteractor = container.get<RegistrationInteractor>(TYPES.RegistrationInteractor);
    const chatInteractor = container.get<ChatInteractor>(TYPES.ChatInteractor);

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
        chatInteractor,
        connectionStore,
        chatController,
        roomService,
    };

};
