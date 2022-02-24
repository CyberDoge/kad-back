import {Container} from 'inversify';
import 'reflect-metadata';
import {
    InFileNewlyContract,
    InFileOrder,
    InFileUser,
    InFileUserDetailData,
    InMemoryPlatformEvent,
    InMemoryRole
} from 'src/models/inFile';
import {NewlyContract, Order, PlatformEvent, Role, User} from 'src/models/interfaces';
import {UserDetail} from 'src/models/interfaces/UserDetailData';
import {
    EventServiceImpl,
    LoginServiceImpl,
    NewlyContractServiceImpl,
    OrderServiceImpl,
    RegistrationServiceImpl
} from 'src/services/impl';
import {UserServiceImpl} from 'src/services/impl/UserServiceImpl';
import {
    EventOrderService,
    EventService,
    LoginService,
    NewlyContractService,
    OrderService,
    RegistrationService,
    UserService
} from 'src/services/interfaces';
import {OrderInteractorImpl} from 'src/useCaseInteractors/impl';
import {OrderInteractor} from 'src/useCaseInteractors/interfaces';
import {TYPES} from './iocTypes';

const container = new Container();

container.bind<User>(TYPES.User).to(InFileUser).inSingletonScope();
container.bind<UserDetail>(TYPES.UserDetail).to(InFileUserDetailData).inSingletonScope();
container.bind<Role>(TYPES.Role).to(InMemoryRole).inSingletonScope();
container.bind<Order>(TYPES.Order).to(InFileOrder).inSingletonScope();
container.bind<NewlyContract>(TYPES.NewlyContract).to(InFileNewlyContract).inSingletonScope();
container.bind<PlatformEvent>(TYPES.PlatformEvent).to(InMemoryPlatformEvent).inSingletonScope();

container.bind<RegistrationService>(TYPES.RegistrationService).to(RegistrationServiceImpl);
container.bind<LoginService>(TYPES.LoginService).to(LoginServiceImpl);
container.bind<OrderService>(TYPES.OrderService).to(OrderServiceImpl).inRequestScope();
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl).inRequestScope();
container.bind<NewlyContractService>(TYPES.NewlyContractService).to(NewlyContractServiceImpl);
container.bind<EventOrderService>(TYPES.EventOrderService).to(EventServiceImpl);
container.bind<EventService>(TYPES.EventService).to(EventServiceImpl);

container.bind<OrderInteractor>(TYPES.OrderInteractor).to(OrderInteractorImpl);


export {container};
