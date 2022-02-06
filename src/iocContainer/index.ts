import {Container} from 'inversify';
import 'reflect-metadata';
import {TYPES} from 'src/iocTypes';
import {InMemoryOrder, InMemoryRole, InMemoryUser} from 'src/models/impl';
import {Order, Role, User} from 'src/models/interfaces';
import {OrderServiceImpl, RegistrationServiceImpl} from 'src/services/impl';
import {LoginServiceImpl} from 'src/services/impl/LoginServiceImpl';
import {LoginService, OrderService, RegistrationService} from 'src/services/interfaces';

const container = new Container();

container.bind<User>(TYPES.User).to(InMemoryUser);
container.bind<Role>(TYPES.Role).to(InMemoryRole);
container.bind<Order>(TYPES.Order).to(InMemoryOrder);
container.bind<RegistrationService>(TYPES.RegistrationService).to(RegistrationServiceImpl);
container.bind<LoginService>(TYPES.LoginService).to(LoginServiceImpl);
container.bind<OrderService>(TYPES.OrderService).to(OrderServiceImpl);


export {container};
