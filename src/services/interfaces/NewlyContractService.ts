import {NewlyContractType, OrderType, UserType} from 'src/models/interfaces';

export interface NewlyContractService {
    addPotentialExecutorToOrderId(order: OrderType['id'], executorId: UserType['id']): void;

    createNewlyContract(order: OrderType, customerId: UserType['id']): void;

    findNewlyContractByOrderId(orderId: OrderType['id']): Promise<NewlyContractType | undefined>;
}
