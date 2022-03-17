import {Container} from 'inversify';
import 'reflect-metadata';
import {
    InFileNewlyContract,
    InFileOrder,
    InFileRoom,
    InFileUser,
    InFileUserCompetence,
    InFileUserDetailData,
    InFileUserOperatingData,
    InMemoryPlatformEvent,
    InMemoryRole
} from 'src/models/inFile';
import {
    NewlyContract,
    Order,
    PlatformEvent,
    Role,
    Room,
    User,
    UserCompetence,
    UserDetail,
    UserOperatingData
} from 'src/models/interfaces';
import {
    EventServiceImpl,
    LoginServiceImpl,
    NewlyContractServiceImpl,
    OrderServiceImpl,
    RegistrationServiceImpl,
    RoomServiceImpl,
    UserCompetenceServiceImpl,
    UserDetailServiceImpl,
    UserOperatingDataServiceImpl,
    UserServiceImpl
} from 'src/services/impl';
import {
    EventOrderService,
    EventService,
    LoginService,
    NewlyContractService,
    OrderService,
    RegistrationService,
    RoomService,
    UserCompetenceService,
    UserDetailService,
    UserOperatingDataService,
    UserService
} from 'src/services/interfaces';
import {OrderInteractorImpl, RegistrationInteractorImpl, UserInteractorImpl} from 'src/useCaseInteractors/impl';
import {OrderInteractor, RegistrationInteractor, UserInteractor} from 'src/useCaseInteractors/interfaces';
import {TYPES} from './iocTypes';

const container = new Container();

container.bind<User>(TYPES.User).to(InFileUser).inSingletonScope();
container.bind<UserDetail>(TYPES.UserDetail).to(InFileUserDetailData).inSingletonScope();
container.bind<Role>(TYPES.Role).to(InMemoryRole).inSingletonScope();
container.bind<Order>(TYPES.Order).to(InFileOrder).inSingletonScope();
container.bind<NewlyContract>(TYPES.NewlyContract).to(InFileNewlyContract).inSingletonScope();
container.bind<PlatformEvent>(TYPES.PlatformEvent).to(InMemoryPlatformEvent).inSingletonScope();
container.bind<UserOperatingData>(TYPES.UserOperatingData).to(InFileUserOperatingData).inSingletonScope();
container.bind<UserCompetence>(TYPES.UserCompetence).to(InFileUserCompetence).inSingletonScope();
container.bind<Room>(TYPES.Room).to(InFileRoom).inSingletonScope();

container.bind<RegistrationService>(TYPES.RegistrationService).to(RegistrationServiceImpl);
container.bind<LoginService>(TYPES.LoginService).to(LoginServiceImpl);
container.bind<OrderService>(TYPES.OrderService).to(OrderServiceImpl).inRequestScope();
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl).inRequestScope();
container.bind<NewlyContractService>(TYPES.NewlyContractService).to(NewlyContractServiceImpl);
container.bind<EventOrderService>(TYPES.EventOrderService).to(EventServiceImpl);
container.bind<EventService>(TYPES.EventService).to(EventServiceImpl);
container.bind<UserOperatingDataService>(TYPES.UserOperatingDataService).to(UserOperatingDataServiceImpl);
container.bind<UserDetailService>(TYPES.UserDetailService).to(UserDetailServiceImpl);
container.bind<UserCompetenceService>(TYPES.UserCompetenceService).to(UserCompetenceServiceImpl);
container.bind<RoomService>(TYPES.RoomService).to(RoomServiceImpl);

container.bind<OrderInteractor>(TYPES.OrderInteractor).to(OrderInteractorImpl);
container.bind<UserInteractor>(TYPES.UserInteractor).to(UserInteractorImpl);
container.bind<RegistrationInteractor>(TYPES.RegistrationInteractor).to(RegistrationInteractorImpl);


export {container};
