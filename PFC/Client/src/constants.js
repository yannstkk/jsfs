const GAME_MESSAGES = {
    PLAYER_MOVE: 'player-move',
    RESTART_GAME: 'restart-game',

    GAME_STATUS: 'game-status',
    ROUND_RESULT: 'round-result',
    ERROR: 'error'
};

const GAME_STATUSES = {
    WAITING: 'waiting',                 // en attente d un joueur
    READY: 'ready',                    
    WAITING_OPPONENT: 'waiting-opponent', // vient de jouer attend l'autre
    REJECTED: 'rejected'
};

const MOVES = {
    PIERRE: 'pierre',
    FEUILLE: 'feuille',
    CISEAUX: 'ciseaux'
};

const RESULTS = {
    PLAYER1_WINS: 'player1-wins',
    PLAYER2_WINS: 'player2-wins',
    DRAW: 'draw'
};

module.exports = {
    GAME_MESSAGES,
    GAME_STATUSES,
    MOVES,
    RESULTS
};