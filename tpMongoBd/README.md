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
  Lancer le serveur avec `nodemon` puis consulter `http://localhost:3000`  
* `v0.5` : ajout du module `mongoose`  
    (voir dans `package.json`)  




Retour à la version "complète" par `git checkout main`

On peut envisager de commencer par exécuter
```bash
npm install
```
pour avoir tous les modules *Node* utilisés installés une fois pour toutes.
