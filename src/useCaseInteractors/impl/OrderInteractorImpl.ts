import {inject, injectable} from 'inversify';
import {TYPES} from 'src/iocTypes';
import {OrderType, UserType} from 'src/models/interfaces';
import {NewlyContractService, OrderService} from 'src/services/interfaces';
import {CreateOrderRequest} from 'src/types/request';
import {OrderResponse} from 'src/types/response';
import {OrderInteractor} from 'src/useCaseInteractors/interfaces';

@injectable()
export class OrderInteractorImpl implements OrderInteractor {
    private orderService: OrderService;
    private newlyContractService: NewlyContractService;

    constructor(
        @inject(TYPES.OrderService) orderService: OrderService,
        @inject(TYPES.NewlyContractService) newlyContractService: NewlyContractService
    ) {
        this.orderService = orderService;
        this.newlyContractService = newlyContractService;
    }

    async createNewOrder(order: CreateOrderRequest, customerId: UserType['id']): Promise<OrderResponse> {
        const newOrder = await this.orderService.createOrder(order);
        this.newlyContractService.createNewlyContract(newOrder, customerId);

        return newOrder;
    }

    async enrollToOrder(orderId: OrderType['id'], executorId: UserType['id']) {
        this.newlyContractService.addPotentialExecutorToOrderId(orderId, executorId);
    }

}
