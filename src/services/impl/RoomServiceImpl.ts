import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {Room, UserType} from 'src/models/interfaces';
import {RoomService} from '../interfaces';

@injectable()
export class RoomServiceImpl implements RoomService {
    private room: Room;

    constructor(@inject(TYPES.Room) room: Room) {
        this.room = room;
    }

    async createRoom(ownerId: UserType['id'], members: UserType['id'][]) {
        return this.room.create({
            messageIds: [],
            ownerId,
            members,
        });
    }

    getTenRoomsByUserId(userId: UserType['id'], from: number) {
        return this.room.getNRoomsByUserId(userId, from, 10);
    }

}
