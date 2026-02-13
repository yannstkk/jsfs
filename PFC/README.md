# Pierre Feuille Ciseaux 

Jeu de Pierre Feuille Ciseaux en ligne pour **2 joueurs**, développé en Node.js avec Socket.IO. Un serveur HTTP maison sert les fichiers statiques et gère les connexions WebSocket en temps réel.

---

## Structure du projet

```
PFC/
├── Client/                  # Code source front-end
│   ├── src/
│   │   ├── index.js         # Point d'entrée Webpack (initialise le jeu)
│   │   ├── Game.js          # Logique client : connexion socket, événements
│   │   ├── UI.js            # Manipulation du DOM (boutons, résultats, statuts)
│   │   ├── constants.js     # Constantes partagées (événements, statuts, coups)
│   │   ├── index.html       # Page d'accueil
│   │   ├── pfc.html         # Page de jeu (injectée par Webpack)
│   │   ├── about.html       # Page "A propos"
│   │   └── style.css        # Feuille de style
│   ├── webpack.config.cjs   # Config Webpack : compile vers Server/public/
│   └── package.json
│
└── Server/                  # Code source back-end
    ├── index.js             # Serveur HTTP + initialisation Socket.IO
    ├── Controller/
    │   ├── RequestController.js  # Gestion des requêtes HTTP (routing des fichiers statiques)
    │   └── IOController.js       # Gestion des connexions WebSocket et logique de jeu
    └── package.json
```

---

## Prérequis

- **Node.js** v18 ou supérieur
- **npm** (inclus avec Node.js)

Vérifier les versions installées :

```bash
node --version
npm --version
```

---

## Installation

Le projet comporte deux parties indépendantes à installer séparément : le **Client** et le **Serveur**.

### 1. Installer les dépendances du Serveur

```bash
cd PFC/Server
npm install
```

### 2. Installer les dépendances du Client

```bash
cd PFC/Client
npm install
```

---

## Build du Client (compilation Webpack)

Le client doit être compilé avec Webpack **avant** de lancer le serveur. Le résultat est déposé directement dans `Server/public/`, qui est le dossier servi par le serveur HTTP.

### Build unique (production)

```bash
cd PFC/Client
npx webpack
```

### Mode développement avec rechargement automatique

```bash
cd PFC/Client
node index.js
```

> **Note :** En mode `dev`, Webpack surveille les fichiers sources et recompile automatiquement à chaque modification. Laisser ce processus tourner dans un terminal dédié pendant le développement.

Après le build, le dossier `PFC/Server/public/` doit contenir :

```
Server/public/
├── app.js          ← bundle JS compilé (socket.io-client inclus)
├── index.html      ← page d'accueil
├── pfc.html        ← page de jeu (avec <script> injecté par HtmlWebpackPlugin)
├── about.html      ← page "À propos"
└── style.css       ← feuille de style
```

---

## Lancement du Serveur

```bash
cd PFC/Server
npm start
```

Le serveur démarre sur le port **8080**. La console affiche :

```
(aucun message de démarrage explicite — le serveur écoute silencieusement)
```

> Le serveur tourne en `http://localhost:8080`.

---

## Comment jouer

### Étape 1 — Ouvrir le jeu dans deux navigateurs

Le jeu nécessite **exactement 2 joueurs** connectés simultanément.

- Ouvrir **deux fenêtres/onglets** (ou deux navigateurs différents) à l'adresse :

```
http://localhost:8080
```

> Pour tester en réseau local, remplacer `localhost` par l'adresse IP de la machine hôte (ex. `http://192.168.1.10:8080`). Les deux joueurs doivent être sur le même réseau.

### Étape 2 — Accéder à la page de jeu

Depuis la page d'accueil, cliquer sur **« Jouer »** pour accéder à :

```
http://localhost:8080/pfc
```

Faire de même dans la deuxième fenêtre.

### Étape 3 — Attendre le second joueur

Le **premier joueur** à se connecter voit le message :

```
En attente d'un second joueur...
```

Les boutons de jeu sont désactivés.

### Étape 4 — La partie commence

Dès que le **second joueur** rejoint la page `/pfc`, les deux joueurs voient :

```
Les deux joueurs sont connectés, vous pouvez jouer !
```

Les trois boutons s'activent : ** Pierre**, ** Feuille**, ** Ciseaux**.

### Étape 5 — Jouer un coup

Chaque joueur clique sur son coup. Le premier à jouer voit :

```
Vous avez joué. En attente de l'adversaire...
```

Les boutons sont désactivés jusqu'à ce que l'adversaire joue.

### Étape 6 — Résultat

Dès que les deux joueurs ont joué, le résultat s'affiche pour chacun :

| Situation | Message affiché |
|-----------|----------------|
| Victoire | `Vous avez gagne  Vous : ... vs Adversaire : ....` |
| Défaite  | `Vous avez perdu  Vous : ... vs Adversaire : ...` |
| Égalité  | `egalité  Vous deux : .... ` |

### Étape 7 — Rejouer

Cliquer sur **« Jouer une nouvelle partie »** pour réinitialiser et lancer un nouveau round.

---

## Comportement en cas de déconnexion

Si l'un des joueurs ferme son onglet ou se déconnecte, l'autre joueur voit :

```
L'autre joueur s'est déconnecté. En attente d'un nouveau joueur...
```

La partie est suspendue jusqu'à qu'un nouveau joueur rejoigne `/pfc`.

> **Limite :** Le serveur n'accepte que 2 joueurs simultanément. Toute connexion supplémentaire reçoit le message `La partie est pleine (2 joueurs max)` et est immédiatement déconnectée.

---

## Pages disponibles

| URL | Description |
|-----|-------------|
| `http://localhost:8080/` | Page d'accueil |
| `http://localhost:8080/pfc` | Page de jeu |
| `http://localhost:8080/about` | Page "À propos" |



## Événements Socket.IO

### Serveur → Client

| Événement | Données | Description |
|-----------|---------|-------------|
| `game-status` | `{ status, message, playerNumber }` | Mise à jour de l'état de la partie |
| `round-result` | `{ result, playerMove, opponentMove, playerNumber }` | Résultat du round |
| `error` | `string` | Message d'erreur |

### Client → Serveur

| Événement | Données | Description |
|-----------|---------|-------------|
| `player-move` | `'pierre'` \| `'feuille'` \| `'ciseaux'` | Coup joué par le joueur |
| `restart-game` | *(aucune)* | Demande de nouvelle partie |

---

