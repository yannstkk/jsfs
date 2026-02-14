import http from 'http';
import { Server as IOServer } from 'socket.io';
import RequestController from './Controller/RequestController.js';
import IOController from './Controller/IOController.js';
import IAMode from './Controller/IAMode.js';

const PORT = 8080;

const server = http.createServer((request, response) => {
    new RequestController(request, response).handleRequest();
});

const io = new IOServer(server);

const ioController = new IOController(io.of('/'));
io.of('/').on('connection', (socket) => ioController.registerSocket(socket));

const ioControllerAI = new IAMode(io.of('/pfcia'));
io.of('/pfcia').on('connection', (socket) => ioControllerAI.registerSocket(socket));

server.listen(PORT);