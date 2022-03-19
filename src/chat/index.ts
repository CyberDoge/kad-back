import {decodeUser} from 'src/helpers/jwtHelper';
import {internalization} from 'src/internalization';
import {MessageRequest} from 'src/types/request';
import {ChatInteractor} from 'src/useCaseInteractors/interfaces';
import {WebSocketServer} from 'ws';
import {EVENT_TYPES} from './eventTypes';

export const startChat = () => {
    const wss = new WebSocketServer({port: 8080});
    const chatInteractor!: ChatInteractor;
    wss.on('connection', (socket, req) => {
        const user = decodeUser(req.headers.authorization);
        if (!user) {
            socket.send(internalization.translate('Not authorized'));
            socket.close(401);

            return;
        }
        socket.on(EVENT_TYPES.newMessage, (message: MessageRequest) => {
            chatInteractor.receiveMessage({...message, ownerId: user.id});
        });
    });
};
