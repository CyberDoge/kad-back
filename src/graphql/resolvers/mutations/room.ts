import {RoomService, UserCompetenceService} from 'src/services/interfaces';
import {Context} from 'src/types/Context';


export const room = (roomService: RoomService, userCompetenceService: UserCompetenceService) =>
    ({
        createRoomByCompetenceId: async (_, {competenceId}: { competenceId: string }, {user}: Context) => {
            const competence = await userCompetenceService.getCompetenceById(competenceId);
            if (!competence) {
                return null;
            }

            return await roomService.createRoom(user.id, [competence.userId]);
        },
    });
