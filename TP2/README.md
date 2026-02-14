# TP2 - Graphique dynamique avec Socket.io et Chart.js

## Installation

1. Faire `npm install`
2. Copier le fichier `node_modules/chart.js/dist/chart.umd.min.js` dans `public/scripts/`
3. Lancer le serveur avec `npm start` ou `node main.js`
4. Ouvrir http://localhost:3000 dans le navigateur

## Question 7 - Deux versions du timer

**Version 1 (commentee dans IOController.js)** : un timer par client via `socket.emit`. Chaque client recoit un nombre different au meme moment.

**Version 2 (active dans IOController.js)** : un timer global via `io.emit`. Tous les clients connectes recoivent le meme nombre au meme moment. Le timer est arrete quand le dernier client se deconnecte.
