import {injectable} from 'inversify';
import {readFromFile, writeToFile} from 'src/models/inFile/dbHelpers';
import {Optional} from 'src/utils/typeUtils';
import {NewlyContract, NewlyContractType, OrderType, UserType} from '../interfaces';

const DB_FILE_NAME = 'NewlyContract.json';

@injectable()
export class InFileNewlyContract implements NewlyContract {
    private contracts: NewlyContractType[];

    constructor() {
        this.contracts = [];
        readFromFile(DB_FILE_NAME).then(res => {
            this.contracts = res as NewlyContractType[];
        }).catch(() => {
            this.contracts = [];
            writeToFile(DB_FILE_NAME, JSON.stringify(this.contracts));
        });
    }

    async createNewlyContract(contract: Optional<NewlyContractType, 'id'>): Promise<NewlyContractType> {
        const newlyContract = {
            ...contract,
            id: `${this.contracts.length}`
        };
        this.contracts.push(newlyContract);
        writeToFile(DB_FILE_NAME, JSON.stringify(this.contracts));

        return newlyContract;
    }

    async findNewlyContractByOrderId(orderId: OrderType['id']): Promise<NewlyContractType | undefined> {
        return this.contracts.find((c) => c.order.id === orderId);
    }

    updateNewlyContact(contract: NewlyContractType) {
        const index = this.contracts.findIndex(contract => contract.id === contract.id);
        this.contracts[index] = contract;
        writeToFile(DB_FILE_NAME, JSON.stringify(this.contracts));
    }

    async findAllNewlyContractsByCustomerId(customerId: UserType['id']): Promise<NewlyContractType[]> {
        return this.contracts.filter((c) => c.customerId === customerId);
    }

}
