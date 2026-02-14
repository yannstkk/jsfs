const MAX_ROUNDS = 5;
const MOVES = ['pierre', 'feuille', 'ciseaux'];

export default class IOControllerAI {
    #io;
    #rooms = new Map();

    constructor(io) {
        this.#io = io;
    }

    registerSocket(socket) {
        console.log(`Connexion de l IA: ${socket.id}`);
        this.#rooms.set(socket.id, {
            scores: { h: 0, ai: 0 }, round: 1, humanMove: null, gameOver: false
        });

        socket.emit('game-status', {
            status: 'ready', message: "Vous jouez contre l'IA. A vous !",
            playerNumber: 1, score1: 0, score2: 0, round: 1
        });

        socket.on('player-move',  (move) => this.#handleMove(socket, move));
        socket.on('restart-game', ()     => this.#restart(socket));
        socket.on('disconnect',   ()     => this.#rooms.delete(socket.id));
    }

    #handleMove(socket, move) {
    const r = this.#rooms.get(socket.id);

    if (r === undefined) {
        return;
    }
    if (r.gameOver) {
        return;
    }
    if (r.humanMove) {
        return;
    }

    r.humanMove = move;
    socket.emit('game-status', {
        status: 'waiting-opponent',
        message: "L'IA reflechit...",
        score1: r.scores.h,
        score2: r.scores.ai,
        round: r.round
    });

    setTimeout(() => {
        if (!this.#rooms.has(socket.id)) {
            return;
        }
        const randomIndex = Math.floor(Math.random() * MOVES.length);
        const aiMove = MOVES[randomIndex];
        this.#resolve(socket, r, move, aiMove);
    }, 700);
}

#resolve(socket, r, hMove, aiMove) {
    const result = this.#getResult(hMove, aiMove);

    if (result === 'player1-wins') {
        r.scores.h++;
    }
    if (result === 'player2-wins') {
        r.scores.ai++;
    }
    r.humanMove = null;

    socket.emit('round-result', {
        result: result,
        playerMove: hMove,
        opponentMove: aiMove,
        score1: r.scores.h,
        score2: r.scores.ai,
        round: r.round
    });

    if (r.round >= MAX_ROUNDS && r.scores.h !== r.scores.ai) {
        r.gameOver = true;
        let winner = 1;
        if (r.scores.ai > r.scores.h) {
            winner = 2;
        }
        socket.emit('game-over', {
            winner: winner,
            score1: r.scores.h,
            score2: r.scores.ai
        });
    } else {
        r.round++;
    }
}

#restart(socket) {
    const r = this.#rooms.get(socket.id);

    if (r === undefined) {
        return;
    }

    if (r.gameOver) {
        r.scores = { h: 0, ai: 0 };
        r.round = 1;
        r.gameOver = false;
    }

    r.humanMove = null;
    socket.emit('game-status', {
        status: 'ready',
        message: "A vous de jouer !",
        playerNumber: 1,
        score1: r.scores.h,
        score2: r.scores.ai,
        round: r.round
    });
}

    #getResult(m1, m2) {
        if (m1 === m2) return 'draw';
        if ((m1 === 'pierre' && m2 === 'ciseaux') ||
            (m1 === 'feuille' && m2 === 'pierre')  ||
            (m1 === 'ciseaux' && m2 === 'feuille')) return 'player1-wins';
        return 'player2-wins';
    }
}