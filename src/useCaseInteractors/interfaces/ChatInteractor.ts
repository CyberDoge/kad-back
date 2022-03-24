import {MessageType, RoomType, UserType} from 'src/models/interfaces';

export type Message = {
    text: MessageType['text'],
    roomId: MessageType['id'],
    ownerId: UserType['id'],
}

export interface ChatInteractor {
    getTenMessagesInRoom(roomId: RoomType["id"], from: number): MessageType[]

    receiveMessageAndBroadcastToRoom(message: Message);

    markMessageAsRead(messageId: MessageType['id'], userId: UserType['id']);
}
