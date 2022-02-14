import {injectable} from 'inversify';
import {Optional} from 'src/utils/typeUtils';
import {NewlyContract, NewlyContractType, OrderType} from '../interfaces';

@injectable()
export class InMemoryNewlyContract implements NewlyContract {
    private contracts: NewlyContractType[];

    constructor() {
        this.contracts = [];
    }

    async createNewlyContract(contract: Optional<NewlyContractType, 'id'>): Promise<NewlyContractType> {
        const newlyContract = {
            ...contract,
            id: `${this.contracts.length}`
        };
        this.contracts.push(newlyContract);

        return newlyContract;
    }

    async findNewlyContractByOrderId(orderId: OrderType['id']): Promise<NewlyContractType | undefined> {
        return this.contracts.find((c) => c.order.id === orderId);
    }

    updateNewlyContact(contract: NewlyContractType) {
        const index = this.contracts.findIndex(contract => contract.id === contract.id);
        this.contracts[index] = contract;
    }

}
