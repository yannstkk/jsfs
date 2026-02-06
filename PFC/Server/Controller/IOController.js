

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
        socket.on('pong', user => this.greatings(socket, user.name));
        socket.on('disconnect', () => this.leave(socket));
    }

   

    leave(socket) {
        const userName = this.#clients.get(socket.id)|| 'unknown';
        console.log(`deconnetion du socket ${socket.id} (user : ${userName})`);
        this.#clients.delete(socket.id);

        clearInterval(this.#timers.get(socket.id));
        this.#timers.delete(socket.id);
    }
}