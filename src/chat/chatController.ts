import {ContextUser} from 'src/types/ContextUser';
import {MessageRequest} from 'src/types/request';
import {MessageResponse} from 'src/types/response';
import {ChatInteractor} from 'src/useCaseInteractors/interfaces';
import {mapMessageTypeToMessageResponse} from 'src/utils/typeMappers';
import {ConnectionStoreController} from './connectionStore';
import {ChatEventEmitter} from './eventEmitter';
import {PATHS, Route} from './route';


const chatController = (
    connectionStoreController: ConnectionStoreController,
    chatInteractor: ChatInteractor,
    chatEventEmitter: ChatEventEmitter,
) => {
    chatEventEmitter.setEventListener('sendNewMessageToUsers',
        (userIds: string[], message: MessageResponse) => {
            for (const userId of userIds) {
                sendDataToUser({path: 'messageFromUser'}, userId, message);
            }
        });
    chatEventEmitter.setEventListener('sendOldMessagesToUser', sendDataToUser);

    function sendDataToUser(route: Route, userId: string, data: unknown) {
        const connectionByKey = connectionStoreController.getConnectionByKey(userId);
        if (!connectionByKey) {
            return;
        }
        connectionByKey.send(JSON.stringify({route, data}));
    }

    async function getTenMessagesFromRoom(
        route: Route, {roomId, from}: { roomId: string, from: number }, user: ContextUser
    ) {
        const messages = await chatInteractor.getTenMessagesInRoom(user.id, roomId, from);
        chatEventEmitter.emmit('sendOldMessagesToUser', route, user.id, messages.map(mapMessageTypeToMessageResponse));
    }

    async function receiveMessageInRoom(route: Route, message: MessageRequest, user: ContextUser) {
        const receivedMessage = await chatInteractor.receiveMessage({...message, ownerId: user.id});
        chatEventEmitter.emmit('sendNewMessageToUsers', ['put user id'], receivedMessage);
    }

    return {
        [PATHS.SEND_MESSAGE_TO_ROOM]: receiveMessageInRoom,
        [PATHS.GET_TEN_MESSAGES]: getTenMessagesFromRoom
    };
};

export default chatController;
