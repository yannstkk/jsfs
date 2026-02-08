const { GAME_STATUSES, MOVES } = require('./constants.js');

class UI {
    constructor() {
        this.statusDiv = document.getElementById('status');
        this.movesButtonsDiv = document.getElementById('moves-buttons');
        this.resultDiv = document.getElementById('result');
        this.restartContainer = document.getElementById('restart-container');

        this.btnPierre = document.getElementById('btn-pierre');
        this.btnFeuille = document.getElementById('btn-feuille');
        this.btnCiseaux = document.getElementById('btn-ciseaux');
        this.btnRestart = document.getElementById('btn-restart');
    }

    showStatus(message) {
        this.statusDiv.textContent = message;
        this.statusDiv.style.display = 'block';
    }

    enableMoveButtons(callback) {
        this.movesButtonsDiv.style.display = 'block';

        this.btnPierre.disabled = false;
        this.btnFeuille.disabled = false;
        this.btnCiseaux.disabled = false;

        this.btnPierre.onclick = () => callback(MOVES.PIERRE);
        this.btnFeuille.onclick = () => callback(MOVES.FEUILLE);
        this.btnCiseaux.onclick = () => callback(MOVES.CISEAUX);
    }

    disableMoveButtons() {
        this.btnPierre.disabled = true;
        this.btnFeuille.disabled = true;
        this.btnCiseaux.disabled = true;
    }

    showResult(result, player1Move, player2Move) {
        this.movesButtonsDiv.style.display = 'none';
        this.resultDiv.style.display = 'block';
        this.restartContainer.style.display = 'block';

        let message = '';
        let className = '';

        if (result === 'player1-wins') {
            message = `Vous avez GAGNÉ !<br>Vous: ${this.getMoveEmoji(player1Move)} vs Adversaire: ${this.getMoveEmoji(player2Move)}`;
            className = 'result-win';
        } else if (result === 'player2-wins') {
            message = `Vous avez PERDU<br>Vous: ${this.getMoveEmoji(player1Move)} vs Adversaire: ${this.getMoveEmoji(player2Move)}`;
            className = 'result-lose';
        } else if (result === 'draw') {
            message = `ÉGALITÉ !<br>Vous deux: ${this.getMoveEmoji(player1Move)}`;
            className = 'result-draw';
        }

        this.resultDiv.innerHTML = message;
        this.resultDiv.className = className;
    }

    getMoveEmoji(move) {
        const emojis = {
            pierre: '🪨',
            feuille: '📄',
            ciseaux: '✂️'
        };
        return emojis[move] || move;
    }

    showRestartButton(callback) {
        this.btnRestart.onclick = callback;
    }

    reset() {
        this.movesButtonsDiv.style.display = 'none';
        this.resultDiv.style.display = 'none';
        this.restartContainer.style.display = 'none';
        this.statusDiv.textContent = '';
    }
}

module.exports = { UI };