export default class IOController {
    #io;
    #players;
    #moves;
    #nbmoves;

    constructor(io) {
        this.#io = io;
        this.#players = [];
        this.#moves = {};
        this.#nbmoves = 0;
    }

    registerSocket(socket) {
        console.log(`Connexion: ${socket.id}`);

        if (this.#players.length < 2) {
            this.#players.push(socket.id);

            if (this.#players.length === 1) {
                socket.emit('game-status', { status: 'waiting', message: 'En attente d un second joueur...' });
            } else {
                this.#io.emit('game-status', { status: 'ready', message: ' deux joueurs sont connectés, vous pouvez jouer !' });
            }
        } else {
            socket.emit('game-status', { status: 'rejected', message: ' la partie est pleine (2 joueurs max)' });
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
        this.#nbmoves = 0;

        if (this.#players.length > 0) {
            this.#io.emit('game-status', { status: 'waiting', message: 'L autre joueur s est déconnecté. En attente d un nouveau joueur...' });
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
            message: 'Vous avez déjà joué. En attente de l adversaire...'
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

        this.#io.emit('round-result', {
            result: result,
            player1Move: move1,
            player2Move: move2
        });

        this.#moves = {};
        this.#nbmoves = 0;
    }

    restartGame(socket) {
        console.log(` Relancer la partie demandé par ${socket.id}`);
        this.#moves = {};
        this.#nbmoves = 0;
        this.#io.emit('game-status', { status: 'ready', message: ' goo jouer' });
    }
}