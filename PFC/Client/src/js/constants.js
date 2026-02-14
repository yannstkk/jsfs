const GAME_MESSAGES = {
    PLAYER_MOVE:  'player-move',
    RESTART_GAME: 'restart-game',
    GAME_STATUS:  'game-status',
    ERROR:        'error'
};

const GAME_STATUSES = {
    WAITING:          'waiting',
    READY:            'ready',
    WAITING_OPPONENT: 'waiting-opponent',
    REJECTED:         'rejected'
};

const MOVES = {
    PIERRE:  'pierre',
    FEUILLE: 'feuille',
    CISEAUX: 'ciseaux'
};

module.exports = { GAME_MESSAGES, GAME_STATUSES, MOVES };