import {WebSocket} from 'ws';

export interface ConnectionStoreController {
    closeConnectionByKey(key: string);

    getConnectionByKey(key: string): WebSocket | undefined;
}