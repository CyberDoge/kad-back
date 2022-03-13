import {inject, injectable} from 'inversify';
import {pull} from 'lodash';
import {TYPES} from 'src/ioc';
import {NewlyContract, NewlyContractType, Order, OrderType, UserType} from 'src/models/interfaces';
import {NewlyContractService} from '../interfaces';

@injectable()
export class NewlyContractServiceImpl implements NewlyContractService {

    private newlyContract: NewlyContract;
    private order: Order;

    constructor(
        @inject(TYPES.NewlyContract) newlyContract: NewlyContract, @inject(TYPES.Order) order: Order
    ) {
        this.newlyContract = newlyContract;
        this.order = order;
    }

    async isExecutorEnrolledToOrder(orderId: string, executorId?: string): Promise<boolean> {
        if (!executorId) {
            return false;
        }
        const contract = await this.newlyContract.findNewlyContractByOrderId(orderId);
        if (!contract) {
            return false;
        }

        return contract.potentialExecutorIds.includes(executorId);
    }

    async addPotentialExecutorToOrderId(orderId: OrderType['id'], executorId: UserType['id']) {
        const contract = await this.newlyContract.findNewlyContractByOrderId(orderId);
        if (!contract) {
            throw new Error(`No such contract with order with id ${orderId}`);
        }
        if (contract.potentialExecutorIds.includes(executorId)) {
            return;
        }
        contract.potentialExecutorIds.push(executorId);
        this.newlyContract.updateNewlyContact(contract);
    }


    async createNewlyContract(order: OrderType, customerId: UserType['id']) {
        this.newlyContract.createNewlyContract({
            orderId: order.id,
            customerId,
            potentialExecutorIds: []
        });
    }

    findNewlyContractByOrderId(orderId: OrderType['id']): Promise<NewlyContractType | undefined> {
        return this.newlyContract.findNewlyContractByOrderId(orderId);
    }

    async getOrdersByCustomerId(customerId: UserType['id']): Promise<OrderType[]> {
        return Promise.all((await this.newlyContract.findAllNewlyContractsByCustomerId(customerId)).map(async c => {
            const order = await this.order.find({id: c.orderId});
            if (!order) {
                throw new Error(`No such order with id = ${c.orderId}`);
            }

            return order;
        }
        ));

    }

    async removePotentialExecutorToOrderId(orderId: OrderType['id'], executorId: UserType['id']) {
        const contract = await this.newlyContract.findNewlyContractByOrderId(orderId);
        if (!contract) {
            throw new Error(`No such contract with order with id ${orderId}`);
        }
        pull(contract.potentialExecutorIds, executorId);
        this.newlyContract.updateNewlyContact(contract);
    }
}
