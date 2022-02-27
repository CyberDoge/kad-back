import {NewlyContractType, OrderType, UserType} from 'src/models/interfaces';

export interface NewlyContractService {
    addPotentialExecutorToOrderId(orderId: OrderType['id'], executorId: UserType['id']): void;

    removePotentialExecutorToOrderId(orderId: OrderType['id'], executorId: UserType['id']): void;

    createNewlyContract(order: OrderType, customerId: UserType['id']): void;

    findNewlyContractByOrderId(orderId: OrderType['id']): Promise<NewlyContractType | undefined>;

    getOrdersByCustomerId(customerId: UserType['id']): Promise<OrderType[]>;

    isExecutorEnrolledToOrder(orderId: OrderType['id'], executorId?: UserType['id'],): Promise<boolean>;
}
