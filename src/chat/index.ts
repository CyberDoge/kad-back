import queryString from 'query-string';
import {decodeUser} from 'src/helpers/jwtHelper';
import {internalization} from 'src/internalization';
import {resolvedDependencies} from 'src/ioc/resolvedDependencies';
import {isChatMessageRequest} from 'src/utils/typeChecker';
import {WebSocketServer} from 'ws';

export const startChat = ({connectionStore, chatController}: ReturnType<typeof resolvedDependencies>) => {
    const wss = new WebSocketServer({port: 8080});

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

                const request = JSON.parse(data.toString('utf-8'));
                if (!request?.route || !isChatMessageRequest(request?.message)) {
                    return;
                }
                chatController.receiveMessage(request.route, request.message, user);
            }catch (e) {
                console.log(e);
            }
        });
    });
};
