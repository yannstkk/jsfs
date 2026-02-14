# Pierre Feuille Ciseaux

Jeu en temps reel entre deux joueurs connectes depuis deux navigateurs differents.
La partie se joue en 5 manches. Le joueur avec le plus de manches gagnees remporte la partie
En cas d'egalite apres 5 manches, une manche decisive est jouee.

Deux modes sont disponibles :
- Joueur contre Joueur : deux personnes jouent depuis deux onglets ou navigateur different
- Joueur contre IA : une seule personne joue contre un adversaire virtuel

---

## Architecture du projet

```
pfc/
├── Server/
│   ├── index.js
│   ├── package.json
│   ├── public/               <- fichiers servis au navigateur (generes par Webpack)
│   └── Controller/
│       ├── RequestController.js
│       ├── IOController.js
│       └── IAMode.js
│
└── Client/
    ├── package.json
    ├── webpack.config.cjs
    └── src/
        ├── index.html
        ├── pfc.html
        ├── pfcia.html
        ├── about.html
        ├── style.css
        ├── constants.js
        ├── Game.js
        ├── UI.js
        ├── index.js
        ├── AiIndex.js
        └── images/
            ├── pierre.png
            ├── feuille.png
            └── ciseaux.png
```

---

## Prerequis

- Node.js version 18 ou superieure
- npm

---

## Installation

L'installation se fait en deux etapes :

### 1. Installer les dependances du serveur

```
cd Server
npm install
```

### 2. Installer les dependances du client

```
cd Client
npm install
```



## Compiler le code client avec Webpack

Webpack prend les fichiers sources du dossier `Client/src/` et les compile dans `Server/public/`.
Cette etape est obligatoire avant de lancer le serveur.

Depuis le dossier `Client/` :

```
npx webpack
```


Apres cette etape, le dossier `Server/public/` doit contenir les fichiers suivants :

```
Server/public/
├── index.html
├── pfc.html
├── pfcia.html
├── about.html
├── style.css
├── app.js
├── app-ai.js
└── images/
    ├── pierre.png
    ├── feuille.png
    └── ciseaux.png
```

---

## Lancer le serveur

Depuis le dossier `Server/` :

```
npm run start 

ou

node index.js
```

Le serveur demarre sur le port 8080. Il n'affiche pas de message au demarrage.

---

## Jouer

Ouvrez un navigateur et allez a l'adresse :

```
http://localhost:8080
```

La page d'accueil propose deux modes de jeu.

### Mode Joueur contre Joueur

1. Cliquez sur "Joueur vs Joueur" depuis la page d'accueil, ou allez directement a `http://localhost:8080/pfc`
2. Ouvrez un deuxieme onglet ou une deuxieme fenetre et allez a la meme adresse
3. Le premier joueur voit le message "En attente d'un second joueur"
4. Des que le deuxieme joueur se connecte, les deux voient "Les deux joueurs sont connectes"
5. Chaque joueur clique sur Pierre, Feuille ou Ciseaux pour jouer son coup
6. Le premier a jouer voit "En attente de l'adversaire"
7. Quand les deux ont joue, le resultat de la manche s'affiche avec les deux coups et le score mis a jour
8. L'un des deux joueurs clique sur "Manche suivante" pour lancer la manche suivante pour les deux
9. Apres 5 manches, le vainqueur est annonce. En cas d'egalite, une manche decisive est jouee
10. Cliquez sur "Nouvelle partie" pour recommencer depuis zero

Si un joueur se deconnecte en cours de partie, l'autre joueur est informe et les scores sont reinitialises.
Un troisieme joueur qui tenterait de se connecter serait refuse.

### Mode Joueur contre IA

1. Cliquez sur "Joueur vs IA" depuis la page d'accueil, ou allez directement a `http://localhost:8080/pfcia`
2. La partie commence immediatement, sans attendre un second joueur
3. Jouez votre coup en cliquant sur Pierre, Feuille ou Ciseaux
4. L'IA joue apres un court delai
5. Le resultat s'affiche, puis cliquez sur "Manche suivante" pour continuer
6. Les regles des 5 manches s'appliquent de la meme facon

---

## Pages disponibles

| Adresse                      | Description              |
|------------------------------|--------------------------|
| http://localhost:8080        | Page d'accueil           |
| http://localhost:8080/pfc    | Jeu Joueur contre Joueur |
| http://localhost:8080/pfcia  | Jeu Joueur contre IA     |
| http://localhost:8080/about  | A propos                 |

---
