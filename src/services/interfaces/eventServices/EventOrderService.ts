import {NewlyContractType} from 'src/models/interfaces';

export interface EventOrderService {
    userEnrolledToNewlyContract(newlyContract: NewlyContractType): Promise<string>;

    userUnEnrolledToNewlyContract(newlyContract: NewlyContractType): Promise<string>;
}
