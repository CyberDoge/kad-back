import {WebSocket} from 'ws';

export interface ConnectionStore {
    closeConnectionByKey(key: string);

    addConnection(key: string, socket: WebSocket);
}
