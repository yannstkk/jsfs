export default class IOController {
    #io;
    #players;
    #moves;

    constructor(io) {
        this.#io = io;
        this.#players = [];
        this.#moves = {};
    }

    registerSocket(socket) {
        console.log(`Connexion: ${socket.id}`);

        if (this.#players.length < 2) {
            this.#players.push(socket.id);
            
            // Assigner le numéro de joueur
            const playerNumber = this.#players.length;
            socket.playerNumber = playerNumber;

            if (this.#players.length === 1) {
                socket.emit('game-status', { 
                    status: 'waiting', 
                    message: 'En attente d\'un second joueur...',
                    playerNumber: playerNumber
                });
            } else {
                // Envoyer à chaque joueur son numéro
                this.#io.to(this.#players[0]).emit('game-status', { 
                    status: 'ready', 
                    message: 'Les deux joueurs sont connectés, vous pouvez jouer !',
                    playerNumber: 1
                });
                this.#io.to(this.#players[1]).emit('game-status', { 
                    status: 'ready', 
                    message: 'Les deux joueurs sont connectés, vous pouvez jouer !',
                    playerNumber: 2
                });
            }
        } else {
            socket.emit('game-status', { 
                status: 'rejected', 
                message: 'La partie est pleine (2 joueurs max)' 
            });
            socket.disconnect();
            return;
        }

        socket.on('disconnect', () => this.leave(socket));
        socket.on('player-move', (move) => this.handleMove(socket, move));
        socket.on('restart-game', () => this.restartGame(socket));
    }

    leave(socket) {
        console.log(`Déconnexion: ${socket.id}`);
        
        this.#players = this.#players.filter(id => id !== socket.id);
        this.#moves = {};

        if (this.#players.length > 0) {
            this.#io.emit('game-status', { 
                status: 'waiting', 
                message: 'L\'autre joueur s\'est déconnecté. En attente d\'un nouveau joueur...' 
            });
        }
    }

    handleMove(socket, move) {
        if (this.#players.length !== 2) {
            socket.emit('error', 'Pas assez de joueurs');
            return;
        }

        // Empêcher un joueur de jouer 2 fois dans la même manche
        if (this.#moves[socket.id]) {
            socket.emit('game-status', {
                status: 'waiting-opponent',
                message: 'Vous avez déjà joué. En attente de l\'adversaire...'
            });
            return;
        }

        this.#moves[socket.id] = move;

        const nbJoueursAyantJoue = Object.keys(this.#moves).length;

        if (nbJoueursAyantJoue === 1) {
            socket.emit('game-status', {
                status: 'waiting-opponent',
                message: 'Vous avez joué. En attente de l adversaire...'
            });
        } else if (nbJoueursAyantJoue === 2) {
            this.computeResult();
        }
    }

    computeResult() {
        const joueur1 = this.#players[0];
        const joueur2 = this.#players[1];

        const move1 = this.#moves[joueur1];
        const move2 = this.#moves[joueur2];

        let result;

        if (move1 === move2) {
            result = 'draw';
        } else if (
            (move1 === 'pierre' && move2 === 'ciseaux') ||
            (move1 === 'feuille' && move2 === 'pierre') ||
            (move1 === 'ciseaux' && move2 === 'feuille')
        ) {
            result = 'player1-wins';
        } else {
            result = 'player2-wins';
        }

        this.#io.to(joueur1).emit('round-result', {
            result: result,
            playerMove: move1,
            opponentMove: move2,
            playerNumber: 1
        });

        this.#io.to(joueur2).emit('round-result', {
            result: result,
            playerMove: move2,
            opponentMove: move1,
            playerNumber: 2
        });

        this.#moves = {};
    }

    restartGame(socket) {
        console.log(`relancer la partie demandé par ${socket.id}`);
        this.#moves = {};
        
        this.#io.to(this.#players[0]).emit('game-status', { 
            status: 'ready', 
            message: 'Cest a toi de jouer',
            playerNumber: 1
        });
        this.#io.to(this.#players[1]).emit('game-status', { 
            status: 'ready', 
            message: 'Cest a toi de jouer',
            playerNumber: 2
        });
    }
}