const { io } = require('socket.io-client');
const { GAME_MESSAGES, GAME_STATUSES } = require('./constants.js');
const { UI }  = require('./UI.js');

class Game {
    constructor(namespace = '/') {
        this.socket = io(namespace);
        this.ui  = new UI();
        this.playerNumber = null;

        this.#setupListeners();
    }

    #setupListeners() {
        this.socket.on(GAME_MESSAGES.GAME_STATUS, (data) => {
            if (data.playerNumber) this.playerNumber = data.playerNumber;

            if (data.score1 !== undefined) {
                this.ui.updateScoreboard(data.score1, data.score2, data.round);
            }

            if (data.status === GAME_STATUSES.WAITING) {
                this.ui.showStatus(data.message);
                this.ui.disableMoveButtons();
            } else if (data.status === GAME_STATUSES.READY) {
                this.ui.hideResult();
                this.ui.showStatus(data.message);
                this.ui.enableMoveButtons((move) => this.socket.emit(GAME_MESSAGES.PLAYER_MOVE, move));
            } else if (data.status === GAME_STATUSES.WAITING_OPPONENT) {
                this.ui.showStatus(data.message);
                this.ui.disableMoveButtons();
            } else if (data.status === GAME_STATUSES.REJECTED) {
                this.ui.showStatus(data.message);
            }
        });

        this.socket.on('round-result', (data) => {
            this.ui.updateScoreboard(data.score1, data.score2, data.round);
            this.ui.showRoundResult(data, this.playerNumber);
            this.ui.showRestartButton('Manche suivante', () => {
                this.socket.emit(GAME_MESSAGES.RESTART_GAME);
            });
        });

        this.socket.on('game-over', (data) => {
            this.ui.showGameOver(data, this.playerNumber);
            this.ui.showRestartButton('Nouvelle partie', () => {
                this.socket.emit(GAME_MESSAGES.RESTART_GAME);
            });
        });

        this.socket.on(GAME_MESSAGES.ERROR, (msg) => this.ui.showStatus(msg));
    }
}

module.exports = { Game };