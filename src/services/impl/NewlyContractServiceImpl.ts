import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {NewlyContract, NewlyContractType, OrderType, UserType} from 'src/models/interfaces';
import {NewlyContractService} from '../interfaces';

@injectable()
export class NewlyContractServiceImpl implements NewlyContractService {

    private newlyContract: NewlyContract;

    constructor(@inject(TYPES.NewlyContract) newlyContract: NewlyContract) {
        this.newlyContract = newlyContract;
    }

    async addPotentialExecutorToOrderId(orderId: OrderType['id'], executorId: UserType['id']) {
        const contract = await this.newlyContract.findNewlyContractByOrderId(orderId);
        if (!contract) {
            throw new Error(`No such contract with order with id ${orderId}`);
        }
        contract.potentialExecutorIds.push(executorId);
        this.newlyContract.updateNewlyContact(contract);
    }


    async createNewlyContract(order: OrderType, customerId: UserType['id']) {
        this.newlyContract.createNewlyContract({
            order,
            customerId,
            potentialExecutorIds: []
        });
    }

    findNewlyContractByOrderId(orderId: OrderType['id']): Promise<NewlyContractType | undefined> {
        return this.newlyContract.findNewlyContractByOrderId(orderId);
    }
}
