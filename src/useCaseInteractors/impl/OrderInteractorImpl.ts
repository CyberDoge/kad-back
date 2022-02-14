import {ValidationError} from 'apollo-server-errors';
import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {OrderType, UserType} from 'src/models/interfaces';
import {EventOrderService, NewlyContractService, OrderService} from 'src/services/interfaces';
import {CreateOrderRequest} from 'src/types/request';
import {OrderResponse} from 'src/types/response';
import {OrderInteractor} from 'src/useCaseInteractors/interfaces';

@injectable()
export class OrderInteractorImpl implements OrderInteractor {
    private orderService: OrderService;
    private newlyContractService: NewlyContractService;
    private eventOrderService: EventOrderService;

    constructor(
        @inject(TYPES.OrderService) orderService: OrderService,
        @inject(TYPES.NewlyContractService) newlyContractService: NewlyContractService,
        @inject(TYPES.EventOrderService) eventOrderService: EventOrderService
    ) {
        this.orderService = orderService;
        this.newlyContractService = newlyContractService;
        this.eventOrderService = eventOrderService;
    }

    async createNewOrder(order: CreateOrderRequest, customerId: UserType['id']): Promise<OrderResponse> {
        const newOrder = await this.orderService.createOrder(order);
        this.newlyContractService.createNewlyContract(newOrder, customerId);

        return newOrder;
    }

    async enrollToOrder(orderId: OrderType['id'], executorId: UserType['id']) {
        const contract = await this.newlyContractService.findNewlyContractByOrderId(orderId);
        if (!contract) {
            throw new ValidationError(`No such order with orderId=${orderId} from user ${executorId}`);
        }
        await this.newlyContractService.addPotentialExecutorToOrderId(orderId, executorId);

        this.eventOrderService.userEnrolledToNewlyContract(contract);

    }

}
