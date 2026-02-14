const http = require('http');
const { Server } = require('socket.io');
const RequestController = require('./controllers/requestController');
const IOController = require('./controllers/IOController');

const server = http.createServer(function(request, response) {
    var controller = new RequestController(request, response);
    controller.handle();
});

const io = new Server(server);
const ioController = new IOController(io);

server.listen(3000, function() {
    console.log('Serveur demarre sur http://localhost:3000');
});
