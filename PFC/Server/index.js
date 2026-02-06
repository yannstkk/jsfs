import http from 'http';
import RequestController from './Controller/RequestController.js';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

server.listen(8080);
console.log('Server is listening on port 8080');