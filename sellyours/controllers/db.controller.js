const mongoose = require('mongoose');

const dbURI = require('../config/db.config').DB_URI;

const dbConnection = mongoose.createConnection(dbURI);

dbConnection.on('connected', () =>
  console.log(`[DB] Connecté à ${dbURI}`)
);
dbConnection.on('disconnected', () =>
  console.log(`[DB] Déconnecté de ${dbURI}`)
);
dbConnection.on('error', err =>
  console.log(`[DB] Erreur de connexion : ${err}`)
);

const shutdown = async msg => {
  await dbConnection.close();
  console.log(`[DB] Connexion fermée : ${msg}`);
  process.exit(0);
};

const readline = require('readline');
if (process.platform === 'win32') {
  readline
    .createInterface({ input: process.stdin, output: process.stdout })
    .on('SIGINT', () => process.emit('SIGINT'));
}

process.on('SIGINT', () => shutdown('SIGINT reçu'));
process.on('SIGTERM', () => shutdown('SIGTERM reçu'));

module.exports = dbConnection;