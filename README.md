# project-morty-verse
Application mobile to list rick and morty universe

## Prérequis

Avant de commencer, assure-toi d'avoir les outils suivants installés :

- **[Node.js](https://nodejs.org/)** : Assure-toi d'avoir une version de Node.js installée (version LTS recommandée).


## Installation

Il faut clone le projet sur son pc puis changer de branche pour se mettre sur la branche "develop".
Ensuite, il suffit de faire la commande suivante pour installer les dépendences du projet :
  ```bash
  yarn install
  ```

## Lancer le projet

Pour lancer le projet il y a deux options :
* Lancer en wifi : la commande suivante permet de lancer l'application via expo go sur ton téléphone en scannant le qr code qui apparaît. Attention, il faut impérativement être sur le même wifi !
  ```bash
  npx expo start
  ```
* Lancer en usb : Pour lancer via l'usb, sur windows seul les android peuvent se lancer de cette manière. Il faut d'abord passer son téléphone en mode développeur et activé le "transfert de fichiers". Ensuite, une fois la commande lancée, se mettre dans la console cmd et appuyer sur la touche "a" pour lancer l'application sur le téléphone.
  ```bash
  npx expo start --localhost
  ```


## Lancer les tests

Pour le lancement des tests, il suffit d'exécuter la commande suivante :
  ```bash
  yarn jest
  ```