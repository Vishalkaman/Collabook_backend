import { WebSocket } from 'ws';
import { handleCodeSocket } from './codeSocket';
import { handleChatSocket } from './chatSocket';

// Type for your route handler
type WebSocketHandler = (ws: WebSocket) => void;

// WebSocket route map
const wsRoutes = new Map < string, WebSocketHandler> ([
    ['/ws/code', handleCodeSocket],
    ['/ws/chat', handleChatSocket],
]);

/**
 * Routes a WebSocket connection based on the request path.
 */
export function routeSocketConnection(ws: WebSocket, path: string): boolean {
    const handler = wsRoutes.get(path);
    if (handler) {
        handler(ws);
        return true;
    }
    return false;
}

// Optional event handler types
interface SocketHandlers {
    onMessage?: (ws: WebSocket, data: any) => void | Promise<void>;
    onClose?: (ws: WebSocket) => void;
    onError?: (ws: WebSocket, err: Error) => void;
}

/**
 * Binds common WebSocket events (message, close, error).
 */
export function bindSocketEvents(ws: WebSocket, handlers: SocketHandlers): void {
    const { onMessage, onClose, onError } = handlers;

    ws.on('message', async (msg: string | Buffer) => {
        try {
            const parsed = JSON.parse(msg.toString());
            await onMessage?.(ws, parsed);
        } catch (e) {
            ws.send(JSON.stringify({ type: 'error', data: 'Invalid message format' }));
        }
    });

    ws.on('close', () => {
        onClose?.(ws);
    });

    ws.on('error', (err) => {
        onError?.(ws, err);
    });
}
