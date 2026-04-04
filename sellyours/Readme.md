# Sell Yours

Projet 2 JSFS : Application web de vente entre particuliers.

## Presentation

Sell Yours permet a des utilisateurs de vendre et d'acheter des objets entre eux.

Cote serveur : Express, Mongoose, MongoDB, bcrypt, jsonwebtoken.
Cote client : React compile par Webpack, servi directement par Express depuis le dossier public/.

## Prerequis

- Node.js 18 ou superieur
- MongoDB installe en local
- MongoDB Database Tools (pour mongoimport)

## Installation

Dependances serveur :

```bash
cd server
npm install
```

Dependances client et build :

```bash
cd client
npm install
npm run build
cd ..
```

## Lancer MongoDB

```bash
mkdir dbData
mongod --dbpath dbData
```

Laisser ce terminal ouvert MongoDB tourne dessus

## Importer les donnees de test

Des comptes et des objets de test sont disponibles dans le dossier misc/ :

```bash
cd misc
mongoimport --db sellyours --collection utilisateur --file ./users.json --jsonArray
mongoimport --db sellyours --collection items --file ./items.json --jsonArray
cd ..
```

Comptes disponibles :

| Nom   | Login | Mot de passe | Solde |
|-------|-------|--------------|-------|
| Alice | alic  | pass         | 500   |
| Bob   | bob1  | pass         | 300   |

Si vous voulez pas importer les donnees, vous pouvez creer vos propres comptes via l'interface d'inscription

## Lancer le serveur

```bash
cd server
npm start
```

L'application est accessible sur http://localhost:3000

## Fonctionnalites

- Inscription et connexion avec mot de passe hache
- Authentification par jeton JWT dans un cookie HttpOnly
- Mise en vente d'un objet avec description et prix
- Modification du prix d'un objet en vente
- Retrait d'un objet de la vente
- Achat d'un objet : l'acheteur est debite, le vendeur credite, l'objet est supprimee
- Affichage du dernier objet achete pendant la session
- Modification de la somme disponible

## Routes de l'API

```
POST   /access/register       : inscription
POST   /access/login          : connexion
POST   /access/logout         : deconnexion
GET    /user/me               : infos utilisateur connecte
PUT    /user/me               : modifier la somme
GET    /item/mine             : mes objets en vente
GET    /item/others           : objets des autres utilisateurs
POST   /item                  : creer un objet
PUT    /item/:id              : modifier le prix
PUT    /item/buy/:id          : acheter un objet
DELETE /item/:id              : supprimer un objet
```

## Structure du projet

```
sellyours/
├── client/           : code source React
│   ├── src/
│   │   ├── api/      : fonctions fetch centralisees
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── webpack.config.cjs
├── misc/             : donnees de test JSON
│   ├── users.json
│   └── items.json
└── server/           : code serveur Express
    ├── bin/
    ├── config/       : configuration DB et JWT
    ├── controllers/  : logique metier
    ├── middlewares/  : JWT et gestion erreurs
    ├── models/       : schemas Mongoose
    ├── public/       : bundle genere par Webpack
    ├── routes/       : routes Express
    └── app.js
```
