import { WebSocket } from 'ws';
import { bindSocketEvents } from './router';

interface CodeMessage {
    code: string;
}

interface SocketEventHandlers {
    onMessage: (ws: WebSocket, data: CodeMessage) => void;
    onClose: () => void;
}

export function handleCodeSocket(ws: WebSocket): void {

    const handlers: SocketEventHandlers = {
        onMessage: (_ws, { code }) => {
            try {
                // ⚠️ Warning: eval is unsafe in real apps. Use a sandbox like vm2
                const result = eval(code);
                ws.send(JSON.stringify({
                    type: 'result',
                    data: result,
                }));
            } catch (err: any) {
                ws.send(JSON.stringify({
                    type: 'error',
                    data: err.message,
                }));
            }
        },
        onClose: () => {
            console.log('❌ Code client disconnected');
        },
    };
    
    bindSocketEvents(ws, handlers);
}
