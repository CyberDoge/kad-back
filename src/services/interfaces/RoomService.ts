import {RoomType, UserType} from 'src/models/interfaces';

export interface RoomService {
    getLastTenRoomsByUserId(userId: UserType['id'], count: number): Promise<RoomType[]>;

    createRoom(ownerId: UserType['id'], members: UserType['id'][]): Promise<RoomType>;

}
