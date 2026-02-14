class IOController {

    #clients;
    #timers;
    #io;

    constructor(io) {
        this.#clients = new Map();
        this.#timers  = new Map();
        this.#io      = io;

        var self = this;

        io.on('connection', function(socket) {
            self.ping(socket);

            socket.on('pong', function(data) {
                self.join(socket, data.name);
            });

            socket.on('disconnect', function() {
                self.leave(socket);
            });
        });
    }

    ping(socket) {
        socket.emit('ping');
    }

    join(socket, userName) {
        console.log('connexion du socket ' + socket.id + ' (user : ' + userName + ')');
        this.#clients.set(socket.id, userName);
        this.greatings(socket, userName);
    }



    // VERSION 1 : un timer par client chaque client recoit un nombre different
    // greatings(socket, userName) {
    //     var self = this;
    //     var timer = setInterval(function() {
    //         var nombre = Math.floor(Math.random() * 7) + 2;
    //         console.log('envoi de ' + nombre + ' au socket ' + socket.id);
    //         socket.emit('nouveau', nombre);
    //     }, 2000);
    //     this.#timers.set(socket.id, timer);
    // }



    // VERSION 2 : un timer global, tous les client recoivent le meme nombre

    greatings(socket, userName) {
        if (this.#timers.has('global')) {
            return;
        }
        var self = this;
        var timer = setInterval(function() {
            var nombre = Math.floor(Math.random() * 7) + 2;
            console.log('Envoi de ' + nombre + ' a tous les clients');
            self.#io.emit('nouveau', nombre);
        }, 2000);
        this.#timers.set('global', timer);
    }

    leave(socket) {
        var userName = this.#clients.get(socket.id);
        if (userName === undefined) {
            userName = 'inconnu';
        }
        console.log('deconnexion du socket ' + socket.id + ' (user : ' + userName + ')');
        this.#clients.delete(socket.id);

        



        // VERSION 1 : arreter le timer du socket deconnecte
        // var timer = this.#timers.get(socket.id);
        // clearInterval(timer);
        // this.#timers.delete(socket.id);

        // VERSION 2 : arreter le timer global si plus aucun client
        if (this.#clients.size === 0) {
            var timer = this.#timers.get('global');
            clearInterval(timer);
            this.#timers.delete('global');
        }
    }
}

module.exports = IOController;
