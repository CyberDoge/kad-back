import queryString from 'query-string';
import {decodeUser} from 'src/helpers/jwtHelper';
import {internalization} from 'src/internalization';
import {resolvedDependencies} from 'src/ioc/resolvedDependencies';
import {ChatRequest} from 'src/types/request';
import {isChatRequest} from 'src/utils/typeChecker';
import {WebSocketServer} from 'ws';
import chatController from './chatController';

export const startChat = ({
    connectionStore,
    connectionStoreController,
    chatInteractor,
    chatEventEmitter
}: ReturnType<typeof resolvedDependencies>) => {
    const wss = new WebSocketServer({port: 8080});
    const controller = chatController(
        connectionStoreController, chatInteractor, chatEventEmitter
    );
    wss.on('connection', (socket, req) => {
        const params = queryString.parse(req.url?.split('/')[1] || '');
        const user = typeof params.token === 'string' ? decodeUser(params.token) : null;

        if (!user) {
            socket.send(internalization.translate('Not authorized'));
            socket.close();

            return;
        }
        connectionStore.addConnection(user.id, socket);

        socket.on('message', (data) => {
            try {
                if (!Buffer.isBuffer(data)) {
                    return;
                }

                const request = JSON.parse(data.toString('utf-8')) as ChatRequest;
                if (!isChatRequest(request)) {
                    return;
                }
                // todo normal schema validator
                controller[request.route.path](request.route, request.data as any, user);
            } catch (e) {
                connectionStore.closeConnectionByKey(user.id);
                console.log(e);
            }
        });
    });
};
