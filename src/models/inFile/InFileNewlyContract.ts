import {injectable} from 'inversify';
import {helper} from 'src/models/inFile/dbHelper';
import {Optional} from 'src/utils/typeUtils';
import {v4 as uuid} from 'uuid';
import {NewlyContract, NewlyContractType, OrderType, UserType} from '../interfaces';

const DB_FILE_NAME = 'NewlyContract.json';
const h = helper(DB_FILE_NAME);

@injectable()
export class InFileNewlyContract implements NewlyContract {
    private contracts: NewlyContractType[];

    constructor() {
        this.contracts = [];
        h.readFromFile().then(res => {
            this.contracts = res as NewlyContractType[];
        }).catch(() => {
            this.contracts = [];
            h.writeToFile(this.contracts);
        });
    }

    async createNewlyContract(contract: Optional<NewlyContractType, 'id'>): Promise<NewlyContractType> {
        const newlyContract = {
            ...contract,
            id: uuid()
        };
        this.contracts.push(newlyContract);
        h.writeToFile(this.contracts);

        return newlyContract;
    }

    async findNewlyContractByOrderId(orderId: OrderType['id']): Promise<NewlyContractType | undefined> {
        return this.contracts.find((c) => c.orderId === orderId);
    }

    updateNewlyContact(contract: NewlyContractType) {
        const index = this.contracts.findIndex(contract => contract.id === contract.id);
        this.contracts[index] = contract;
        h.writeToFile(this.contracts);
    }

    async findAllNewlyContractsByCustomerId(customerId: UserType['id']): Promise<NewlyContractType[]> {
        return this.contracts.filter((c) => c.customerId === customerId);
    }

}
