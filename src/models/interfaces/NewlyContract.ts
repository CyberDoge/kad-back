import {OrderType} from 'src/models/interfaces/Order';
import {UserType} from 'src/models/interfaces/User';
import {Optional} from 'src/utils/typeUtils';

export type NewlyContractType = {
    id: string
    order: OrderType,
    customerId: UserType['id'],
    potentialExecutorIds: UserType['id'][],
}

export interface NewlyContract {
    createNewlyContract(contract: Optional<NewlyContractType, 'id'>): Promise<NewlyContractType>;

    findNewlyContractByOrderId(orderId: OrderType['id']): Promise<NewlyContractType | undefined>;

    updateNewlyContact(contract: NewlyContractType);
}
