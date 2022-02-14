import {Container} from 'inversify';
import 'reflect-metadata';
import {TYPES} from 'src/iocTypes';
import {InMemoryNewlyContract, InMemoryOrder, InMemoryRole, InMemoryUser} from 'src/models/impl';
import {NewlyContract, Order, Role, User} from 'src/models/interfaces';
import {LoginServiceImpl, NewlyContractServiceImpl, OrderServiceImpl, RegistrationServiceImpl} from 'src/services/impl';
import {LoginService, NewlyContractService, OrderService, RegistrationService} from 'src/services/interfaces';
import {OrderInteractorImpl} from 'src/useCaseInteractors/impl';
import {OrderInteractor} from 'src/useCaseInteractors/interfaces';

const container = new Container();

container.bind<User>(TYPES.User).to(InMemoryUser);
container.bind<Role>(TYPES.Role).to(InMemoryRole);
container.bind<Order>(TYPES.Order).to(InMemoryOrder).inSingletonScope();
container.bind<NewlyContract>(TYPES.NewlyContract).to(InMemoryNewlyContract);

container.bind<RegistrationService>(TYPES.RegistrationService).to(RegistrationServiceImpl);
container.bind<LoginService>(TYPES.LoginService).to(LoginServiceImpl);
container.bind<OrderService>(TYPES.OrderService).to(OrderServiceImpl).inRequestScope();
container.bind<NewlyContractService>(TYPES.NewlyContractService).to(NewlyContractServiceImpl);

container.bind<OrderInteractor>(TYPES.OrderInteractor).to(OrderInteractorImpl);


export {container};
