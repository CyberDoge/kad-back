import {RoomService} from 'src/services/interfaces';
import {Context} from 'src/types/Context';
import {RoomResponse} from 'src/types/response/RoomResponse';


export const room = (roomService: RoomService) =>
    ({
        rooms: async (_, {from}: { from: number }, {user}: Context): Promise<RoomResponse[]> => {
            return await roomService.getTenRoomsByUserId(user.id, from);
        },
    });
