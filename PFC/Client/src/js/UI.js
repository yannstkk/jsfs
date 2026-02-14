const { MOVES } = require('./constants.js');

const IMG = {
    [MOVES.PIERRE]: 'images/pierre.png',
    [MOVES.FEUILLE]: 'images/feuille.png',
    [MOVES.CISEAUX]: 'images/ciseaux.png',
};

const LABEL = {
    [MOVES.PIERRE]: 'Pierre',
    [MOVES.FEUILLE]: 'Feuille',
    [MOVES.CISEAUX]: 'Ciseaux',
};

class UI {
    constructor() {
        this.statusDiv = document.getElementById('status');
        this.movesDiv = document.getElementById('moves-buttons');
        this.resultDiv = document.getElementById('result');
        this.restartDiv = document.getElementById('restart-container');
        this.scoreboardDiv = document.getElementById('scoreboard');

        this.btnPierre = document.getElementById('btn-pierre');
        this.btnFeuille = document.getElementById('btn-feuille');
        this.btnCiseaux = document.getElementById('btn-ciseaux');
        this.btnRestart = document.getElementById('btn-restart');

        this.#initMoveButtons();
    }

    #initMoveButtons() {
        const set = (btn, move) => {
            btn.innerHTML = `<img src="${IMG[move]}" alt="${LABEL[move]}"><span>${LABEL[move]}</span>`;
        };
        set(this.btnPierre,  MOVES.PIERRE);
        set(this.btnFeuille, MOVES.FEUILLE);
        set(this.btnCiseaux, MOVES.CISEAUX);
    }

    showStatus(message) {
        this.statusDiv.textContent = message;
    }

    enableMoveButtons(callback) {
        this.movesDiv.style.display = 'flex';
        [this.btnPierre, this.btnFeuille, this.btnCiseaux].forEach(b => b.disabled = false);
        this.btnPierre.onclick  = () => callback(MOVES.PIERRE);
        this.btnFeuille.onclick = () => callback(MOVES.FEUILLE);
        this.btnCiseaux.onclick = () => callback(MOVES.CISEAUX);
    }

    disableMoveButtons() {
        [this.btnPierre, this.btnFeuille, this.btnCiseaux].forEach(b => b.disabled = true);
    }

    updateScoreboard(score1, score2, round) {
        if (!this.scoreboardDiv) return;
        this.scoreboardDiv.style.display = 'flex';
        document.getElementById('score-p1').textContent = score1;
        document.getElementById('score-p2').textContent = score2;
        document.getElementById('round-current').textContent = round;
    }

    showRoundResult(data, playerNumber) {
    let won = false;
    if (data.result === 'player1-wins' && playerNumber === 1) {
        won = true;
    }
    if (data.result === 'player2-wins' && playerNumber === 2) {
        won = true;
    }

    let draw = false;
    if (data.result === 'draw') {
        draw = true;
    }

    let label = 'Manche perdue';
    if (draw) {
        label = 'Egalite';
    } else if (won) {
        label = 'Manche gagnee';
    }

    let className = 'result-lose';
    if (draw) {
        className = 'result-draw';
    } else if (won) {
        className = 'result-win';
    }

    this.resultDiv.innerHTML = `
        <p>${label}</p>
        <div class="result-detail">
            <div>
                <img src="${IMG[data.playerMove]}" alt="${LABEL[data.playerMove]}">
                <span>Vous</span>
            </div>
            <span>vs</span>
            <div>
                <img src="${IMG[data.opponentMove]}" alt="${LABEL[data.opponentMove]}">
                <span>Adversaire</span>
            </div>
        </div>
    `;
    this.resultDiv.className = className;
    this.resultDiv.style.display = 'block';
    this.movesDiv.style.display = 'none';
}

showGameOver(data, playerNumber) {
    let won = false;
    if (data.winner === playerNumber) {
        won = true;
    }

    let message = 'Defaite';
    let className = 'result-lose';
    if (won) {
        message = 'Victoire';
        className = 'result-win';
    }

    this.resultDiv.innerHTML = ` <p>${message}</p>
        <p>Score final : ${data.score1} - ${data.score2}</p> `;


    this.resultDiv.className = className;
    this.resultDiv.style.display = 'block';
    this.movesDiv.style.display = 'none';
}

    showRestartButton(label, callback) {
        this.btnRestart.textContent = label;
        this.btnRestart.onclick = callback;
        this.restartDiv.style.display = 'block';
    }

    hideResult() {
        this.resultDiv.style.display = 'none';
        this.restartDiv.style.display = 'none';
    }
}

module.exports = { UI };