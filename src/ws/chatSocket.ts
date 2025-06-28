import { WebSocket } from 'ws';
import { bindSocketEvents } from './router';

interface ChatMessage {
    message: string;
    to: string;
}

interface SocketEventHandlers {
    onMessage: (ws: WebSocket, data: ChatMessage) => void;
    onClose: () => void;
}

const clients = new Map < string, WebSocket> ();

function generateId(): string {
    return Math.floor(10 + Math.random() * 90).toString(); // 10 to 99
}

export function handleChatSocket(ws: WebSocket): void {
    const clientId = generateId();
    clients.set(clientId, ws);

    ws.send(JSON.stringify({ type: 'init', clientId }));

    const handlers: SocketEventHandlers = {
        onMessage: (_ws, { message, to }) => {
            const target = clients.get(to);
            if (target && target.readyState === WebSocket.OPEN) {
                target.send(JSON.stringify({
                    type: 'chat',
                    from: clientId,
                    data: message,
                }));
            }
        },
        onClose: () => {
            clients.delete(clientId);
            console.log(`❌ Chat client ${clientId} disconnected`);
        },
    };

    bindSocketEvents(ws, handlers);
}
