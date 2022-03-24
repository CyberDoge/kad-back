import {RoomType, UserType} from 'src/models/interfaces';

export interface RoomService {
    getTenRoomsByUserId(userId: UserType['id'], from: number): Promise<RoomType[]>;

    createRoom(ownerId: UserType['id'], members: UserType['id'][]): Promise<RoomType>;

}
