import {WebSocket} from 'ws';

export interface ConnectionStore {
    addConnection(key: string, socket: WebSocket);
}