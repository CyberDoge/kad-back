import {MessageType, RoomType, UserType} from 'src/models/interfaces';

export type Message = {
    text: MessageType['text'],
    roomId: MessageType['id'],
    ownerId: UserType['id'],
}

export interface ChatInteractor {
    getTenMessagesInRoom(userId: UserType['id'], roomId: RoomType['id'], from: number): Promise<MessageType[]>;

    receiveMessage(message: Message): Promise<MessageType>;

    markMessageAsRead(messageId: MessageType['id'], userId: UserType['id']);
}
