export default class IOController {


    #io;
    #clients;
    #timers;

    constructor(io){

        this.#io = io;
        this.#clients = new Map();
        this.#timers = new Map();
    }


    registerSocket(socket) {
        console.log(`nouvelle connexion avec l'id ${socket.id}`);
        this.setupListeners(socket);

        socket.emit('ping');
    }

    setupListeners(socket){
        socket.on('pong', user => this.greetings(socket, user.name));
        socket.on('disconnect', () => this.leave(socket));
    }

    greetings(socket, userName) {
        console.log(`Greetings from user: ${userName} (socket: ${socket.id})`);
        this.#clients.set(socket.id, userName);
        
        socket.emit('welcome', { message: `Bienvenue ${userName}!` });
        
        socket.broadcast.emit('user-connected', { userName });
        
        const connectedUsers = Array.from(this.#clients.values());
        this.#io.emit('users-list', { users: connectedUsers });
    }

    leave(socket) {
        const userName = this.#clients.get(socket.id) || 'unknown';
        console.log(`deconnexion du socket ${socket.id} (user : ${userName})`);
        
        // Informer les autres utilisateurs
        socket.broadcast.emit('user-disconnected', { userName });
        
        this.#clients.delete(socket.id);

        clearInterval(this.#timers.get(socket.id));
        this.#timers.delete(socket.id);
    }
}