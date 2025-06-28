import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import routes from './rest/index'; // Adjust the import path as needed
import { routeSocketConnection } from './ws/router';

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to the API');
});

// Create HTTP + WebSocket servers
const server = createServer(app);
const wss = new WebSocketServer({ noServer: true });

// Handle WS upgrade
server.on('upgrade', (req, socket, head) => {
    const { url } = req;

    wss.handleUpgrade(req, socket, head, (ws) => {
        const handled = routeSocketConnection(ws, url || '');

        if (!handled) {
            ws.close();
            socket.destroy();
        }
    });
});

// Start server
server.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
});
