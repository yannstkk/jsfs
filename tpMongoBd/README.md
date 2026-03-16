Introduction à mongoDb
====================================


Ce dépôt contient le code utilisé en exemple dans le cours [https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/html/mongodb.html](https://www.fil.univ-lille.fr/~routier/enseignement/licence/jsfs/html/mongodb.html).


Plusieurs versions progressives.

 > **À propos du code client**
 > Le code source du client se trouve dans le dossier `/client`. *React* est utilisé (avec des *hooks*) pour définir ce code. *Webpack* est utilisé pour générer le code et alimenter le dossier `/public` du serveur.
 > Le dossier `/public` est déjà alimenté, mais pour générer à nouveau ce code, il faut installer le projet *Node* (`npm install`), puis produire le bundle (`npm run build` ou `npm run watch`).

Charger une version avec  
```bash
  git checkout *tag*
```
où `*tag*` peut prendre comme valeur :

* `v0` : version de départ  
  Mise en place d'un serveur Express. La réponse à la route `/` est le fichier `/public/index.html` délivré par le middleware *static*. 
  Lancer le serveur avec `nodemon` puis consulter `http://127.0.0.1:3000`  
* `v0.5` : ajout du module `mongoose`  
    (voir dans `package.json`)  
* `v1` : création d'un contrôleur pour gérer la connexion à la base de données  
* `v1.5` : utilisation d'un fichier de configuration pour les paramètres de connexion à la BD   
   voir `./config/db.config.js`
* `v2` : définitions des **schémas** et **modéles** pour les documents.  
  voir dans le dossier `./models`
* `v3` : première interaction avec la base de données à l'aide du modèle
  * ajout d'une route et d'un contrôleur : `./routes/books.route.js`, `./controllers/books.controller.js`et intégration dans `./app.js`  
  * voir la requête `Books.find()` dans `./controllers/books.js`  
  * le résultat est observable à `http://217.0.0.1:3000/books`   (et `http://127.0.0.1:3000/books/then` pour la version `then`)
* `v3.5` : autres requêtes de sélection :  
    avec filtres (`where()`) et  avec `findOne()`  
    le fichier `book.route.js` permet d'identifier les routes pour y accéder
* `v3.6` : exploitation par le client de la réponse JSON avec `fetch`  
   version code client en *pur javascript* voir dans `./public/javascripts/book.client.js`
* `v3.7` : exploitation par le client de la réponse JSON avec `fetch`  
   version code client avec *React* (et les hooks), voir dans `./client/component/bookapp.component.jsx`
* `v3.8` : sélection par l'id : `findById`  
   voir `http://217.0.0.1:3000/books` et survoler puis cliquer sur un titre  
* `v4_ok` : création d'un nouveau document dans la collection *books* avec `create()`   
    définition de la route `/books/` utilisée avec une méthode POST  


Retour à la version "complète" par `git checkout main`

On peut envisager de commencer par exécuter
```bash
npm install
```
pour avoir tous les modules *Node* utilisés installés une fois pour toutes.
