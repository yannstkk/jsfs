const mongoose = require('mongoose');

const dbURI = require('../config/db.config').DB_URI;

const dbConnection = mongoose.createConnection(dbURI);

dbConnection.on('connected', () =>
  console.log(`[DB] Connectee a ${dbURI}`)
);
dbConnection.on('disconnected', () =>
  console.log(`[DB] Deconnectee de ${dbURI}`)
);
dbConnection.on('error', err =>
  console.log(`[DB] Erreur de connexion : ${err}`)
);

const shutdown = async msg => {
  await dbConnection.close();
  console.log(`[DB] Connexion fermee : ${msg}`);
  process.exit(0);
};

const readline = require('readline');
if (process.platform === 'win32') {
  readline
    .createInterface({ input: process.stdin, output: process.stdout })
    .on('SIGINT', () => process.emit('SIGINT'));
}

process.on('SIGINT', () => shutdown('SIGINT recu'));
process.on('SIGTERM', () => shutdown('SIGTERM recu'));

module.exports = dbConnection;