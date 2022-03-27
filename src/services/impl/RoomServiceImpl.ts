import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {Room, RoomType, UserType} from 'src/models/interfaces';
import {RoomService} from '../interfaces';

@injectable()
export class RoomServiceImpl implements RoomService {
    constructor(@inject(TYPES.Room) private room: Room) {
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

    async isUserInRoom(userId: UserType['id'], roomId: RoomType['id']) {
        const room = await this.room.findRoomById(roomId);
        if (!room) {
            return false;
        }
        
        return room.members.includes(userId);
    }

}
