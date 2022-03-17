import {RoomType} from 'src/models/interfaces/Room';
import {UserType} from 'src/models/interfaces/User';

export type MessageType = {
    id: string,
    dateOfCreating: Date,
    hidden: boolean,
    text: string,
    readBy: UserType['id'][],
    ownerId: UserType['id'],
    roomId: RoomType['id'],
}

export interface Message {
    create(message: Omit<MessageType, 'id'>): Promise<MessageType>;

    getMessagesByIds(messageIds: MessageType['id'][]): Promise<MessageType[]>;
}
