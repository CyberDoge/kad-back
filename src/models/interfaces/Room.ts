import {MessageType} from './Message';
import {UserType} from './User';

export type RoomType = {
    id: string;
    ownerId: UserType['id'];
    members: UserType['id'][];
    messageIds: MessageType['id'][];
}

export interface Room {
    create(room: Omit<RoomType, 'id'>): Promise<RoomType>;

    getNRoomsByUserId(userId: UserType['id'], from: number, count: number): Promise<RoomType[]>;
}
