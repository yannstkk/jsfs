const MAX_ROUNDS = 5;

export default class IOController {
    #io;
    #players  = [];
    #moves    = {};
    #scores   = { 1: 0, 2: 0 };
    #round    = 1;
    #gameOver = false;

    constructor(io) {
        this.#io = io;
    }

    registerSocket(socket) {
        console.log(`Connexion: ${socket.id}`);

        if (this.#players.length >= 2) {
            socket.emit('game-status', { status: 'rejected', message: 'Partie pleine.' });
            socket.disconnect();
            return;
        }

        this.#players.push(socket.id);
        const playerNumber = this.#players.length;

        if (this.#players.length === 1) {
            socket.emit('game-status', {
                status: 'waiting',
                message: "En attente d'un second joueur...",
                playerNumber,
                ...this.#scoreData()
            });
        } else {
            this.#emitReady("Les deux joueurs sont connectes. A vous de jouer !");
        }

        socket.on('player-move',  (move) => this.#handleMove(socket, move));
        socket.on('restart-game', ()     => this.#handleRestart(socket));
        socket.on('disconnect',   ()     => this.#leave(socket));
    }

    #handleMove(socket, move) {
        if (this.#gameOver) return;
        if (this.#players.length !== 2) { socket.emit('error', 'Pas assez de joueur'); return; }

        this.#moves[socket.id] = move;

        if (Object.keys(this.#moves).length === 1) {
            socket.emit('game-status', {
                status: 'waiting-opponent',
                message: "En attente de l'adversaire...",
                ...this.#scoreData()
            });
        } else {
            this.#computeResult();
        }
    }

    #computeResult() {
    const id1 = this.#players[0];
    const id2 = this.#players[1];
    const m1 = this.#moves[id1];
    const m2 = this.#moves[id2];
    this.#moves = {};

    const result = this.#getResult(m1, m2);
    if (result === 'player1-wins') {
        this.#scores[1]++;
    }
    if (result === 'player2-wins') {
        this.#scores[2]++;
    }

    const scoreData = this.#scoreData();

    this.#io.to(id1).emit('round-result', {
        result: result,
        playerMove: m1,
        opponentMove: m2,
        score1: scoreData.score1,
        score2: scoreData.score2,
        round: scoreData.round
    });

    this.#io.to(id2).emit('round-result', {
        result: result,
        playerMove: m2,
        opponentMove: m1,
        score1: scoreData.score1,
        score2: scoreData.score2,
        round: scoreData.round
    });

    if (this.#round >= MAX_ROUNDS && this.#scores[1] !== this.#scores[2]) {
        this.#gameOver = true;
        let winner = 1;
        if (this.#scores[2] > this.#scores[1]) {
            winner = 2;
        }
        this.#io.to(id1).emit('game-over', {
            winner: winner,
            score1: scoreData.score1,
            score2: scoreData.score2,
            round: scoreData.round
        });
        this.#io.to(id2).emit('game-over', {
            winner: winner,
            score1: scoreData.score1,
            score2: scoreData.score2,
            round: scoreData.round
        });
    } else {
        this.#round++;
    }
}

  
    #handleRestart(socket) {
    if (this.#gameOver) {
        this.#scores = { 1: 0, 2: 0 };
        this.#round = 1;
        this.#gameOver = false;
    }
    this.#moves = {};
    this.#emitReady("A vous de jouer !");
}

#leave(socket) {
    const newPlayers = [];
    for (let i = 0; i < this.#players.length; i++) {
        if (this.#players[i] !== socket.id) {
            newPlayers.push(this.#players[i]);
        }
    }
    this.#players = newPlayers;

    this.#moves = {};
    this.#scores = { 1: 0, 2: 0 };
    this.#round = 1;
    this.#gameOver = false;

    if (this.#players.length > 0) {
        const scoreData = this.#scoreData();
        this.#io.to(this.#players[0]).emit('game-status', {
            status: 'waiting',
            message: "L'autre joueur s'est deconnecte.",
            playerNumber: 1,
            score1: scoreData.score1,
            score2: scoreData.score2,
            round: scoreData.round
        });
    }
}

#emitReady(message) {
    const id1 = this.#players[0];
    const id2 = this.#players[1];
    const scoreData = this.#scoreData();

    if (id1) {
        this.#io.to(id1).emit('game-status', {
            status: 'ready',
            message: message,
            playerNumber: 1,
            score1: scoreData.score1,
            score2: scoreData.score2,
            round: scoreData.round
        });
    }
    if (id2) {
        this.#io.to(id2).emit('game-status', {
            status: 'ready',
            message: message,
            playerNumber: 2,
            score1: scoreData.score1,
            score2: scoreData.score2,
            round: scoreData.round
        });
    }
}

    #getResult(m1, m2) {
        if (m1 === m2) return 'draw';
        if ((m1 === 'pierre' && m2 === 'ciseaux') ||
            (m1 === 'feuille' && m2 === 'pierre')  ||
            (m1 === 'ciseaux' && m2 === 'feuille')) return 'player1-wins';
        return 'player2-wins';
    }

    #scoreData() {
        return { score1: this.#scores[1], score2: this.#scores[2], round: this.#round };
    }
}