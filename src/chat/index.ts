import {WebSocketServer} from 'ws';
import {EVENT_TYPES} from './eventTypes';

export const startChat = () => {
    const wss = new WebSocketServer({port: 8080});

    wss.on('connection', (socket) => {
        socket.on(EVENT_TYPES.newMessage, () => {
            return false;
        });
    });
};
