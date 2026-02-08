const { io } = require('socket.io-client');
const { GAME_MESSAGES, GAME_STATUSES } = require('./constants.js');
const { UI } = require('./UI.js');

class Game {
    constructor() {
        this.socket = io();
        this.ui = new UI();
        this.gameStatus = null;
        this.playerNumber = null; 

        this.setupSocketListeners();
    }

    setupSocketListeners() {
        this.socket.on('connect', () => {
            console.log('connecté au serveur');
        });

        this.socket.on(GAME_MESSAGES.GAME_STATUS, (data) => {
            this.gameStatus = data.status;
            
            if (data.playerNumber) {
                this.playerNumber = data.playerNumber;
                console.log(`vous etes le joueur ${this.playerNumber}`);
            }

            if (data.status === GAME_STATUSES.WAITING) {
                this.ui.showStatus(data.message);
                this.ui.disableMoveButtons();
            } else if (data.status === GAME_STATUSES.READY) {
                this.ui.showStatus(data.message);
                this.ui.enableMoveButtons((move) => this.playerMove(move));
            } else if (data.status === GAME_STATUSES.WAITING_OPPONENT) {
                this.ui.showStatus(data.message);
                this.ui.disableMoveButtons();
            } else if (data.status === GAME_STATUSES.REJECTED) {
                this.ui.showStatus(data.message);
                this.ui.disableMoveButtons();
            }
        });

        this.socket.on(GAME_MESSAGES.ROUND_RESULT, (data) => {
            this.ui.showResult(
                data.result,
                data.playerMove,
                data.opponentMove,
                data.playerNumber // Passer le numéro de joueur a l ui
            );
            this.ui.showRestartButton(() => this.restartGame());
        });

        this.socket.on(GAME_MESSAGES.ERROR, (message) => {
            this.ui.showStatus(`Erreur: ${message}`);
        });

        this.socket.on('disconnect', () => {
            this.ui.showStatus('Déconnecté du serveur');
            this.ui.disableMoveButtons();
        });
    }

    playerMove(move) {
        this.socket.emit(GAME_MESSAGES.PLAYER_MOVE, move);
    }

    restartGame() {
        this.ui.reset();
        this.socket.emit(GAME_MESSAGES.RESTART_GAME);
    }
}

module.exports = { Game };