import {AuthenticationError} from 'apollo-server-express';
import {NewlyContractService, UserCompetenceService} from 'src/services/interfaces';
import {Context} from 'src/types/Context';
import {OrderExecutorsWorkExperienceResponse} from 'src/types/response';

export const orderAndUser =
    (newlyContractService: NewlyContractService, userCompetenceService: UserCompetenceService) =>
        ({
            orderExecutorsWorkExperience: async (_, {orderId}: { orderId: string }, {user}: Context)
                : Promise<OrderExecutorsWorkExperienceResponse> => {
                if (!user) {
                    throw new AuthenticationError('not authenticated');
                }
                const contract = await newlyContractService.findNewlyContractByOrderId(orderId);
                if (contract?.customerId !== user.id) {
                    return [];
                }

                const competences = await Promise.all(contract.potentialExecutorIds.map(id =>
                    userCompetenceService.getUserCompetenceByUserId(id)
                ));

                return competences.flatMap((c) => (c ? [{
                    id: c.id, workExperienceArray: c.workExperienceArray
                }] : []));

            },
        });
