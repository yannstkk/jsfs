

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

    //V1 : diffusion d'un nombre different pour chaque client 

    greatings(socket, userName){
        socket.emit('ping');
        console.log(`pong received from ${userName} (id : ${socket.id})`);
        this.#clients.set(socket.id, userName);
        const timer = setInterval(() => {
            const number = Math.floor(Math.random()*(8-2+1))+2;
            socket.emit('nouveau', number);
            console.log(`envoie du nombre ${number} au socket dont l'id est ${socket.id}`);
        }, 2000);
        this.#timers.set(socket.id, timer);
    }



    
    //V2 : diffusion du meme nombre pour tous les clients
   
    greatings(socket, userName){
        socket.emit('ping');
        console.log(`pong received from ${userName} (id : ${socket.id})`);
        this.#clients.set(socket.id, userName);
        if(!this.#timers.has('global')){
            const timer = setInterval(() => {
                const number = Math.floor(Math.random()*(15))+1;
                this.#io.emit('nouveau', number);
                console.log(`envoie du nombre ${number} a tous les clients connectés !!!`);
            }, 2000);
            this.#timers.set('global', timer);
        }
    }



    leave(socket) {
        const userName = this.#clients.get(socket.id)|| 'unknown';
        console.log(`deconnetion du socket ${socket.id} (user : ${userName})`);
        this.#clients.delete(socket.id);

        clearInterval(this.#timers.get(socket.id));
        this.#timers.delete(socket.id);
    }
}