
## nginx Kesako ?

Nginx est un reverse proxy.

Un reverse proxy permet pas mal de choses entres autres :
- Servir de point d'entrée à l'enssemble de vos serveur
- Permet d'ajouter des headers
- Permet d'ajouter une basic auth
- Permet d'ajouter du HTTPS
- Permet de cacher les ports et chemin

### Exemple

Par exemple admettons que que votre nom de domaine "exemple.com" tape sur votre serveur Nginx.
Admettons égallement que vous avez deux serveur __web1__ et __web2__ dans votre reseau privé qui ecoutent tous les deux sur le port 80.

Vous souhaitez que web1 répond à __https://web1.exemple.com__ et web2 répond à __https://web2.exemple.com__. Bon ben deja vos serveur ecoute sur le port 80 et non 443 et en plus seulement sur le reseau local. Ben un reverse proxy permet de résoudre tous ca.

~~~
                            web1.exemple.com
                          -------------------->[web1:80]
*.exemple.com            /
-------------->[ngix:443]
internet                 \
                          -------------------->[web2:8080/truc]
                            web2.exemple.com
~~~

Ca semble pas mal non ?

## Mais, y a toujours un _mais_

Franchement Nginx c'est pas super agréable à configurer quand on est comme moi pas interressé par le reseau. Et puis faut gerer la signature des certificats SSL (c'est chiant).

C'est la qu'intervient __[Nginx proxy manager](https://nginxproxymanager.com/)__.
Qui est une solution tout en un avec l'installation de nginx et d'une interface web pour faire tout ca simplement avec en plus la gestion des certificats SSL via let's encrypt.
Et le seul défaut de cette solutiuon finalement c'est que ca marche sur docker.

## Installation

### Prérequis
Installer docker. [procedure disponible ici](2024/docker-sur-debian.html)

### Configuration docker

Il faut créer un fichier de configuration docker.

~~~yaml
version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
~~~

### Configuration reseau

Rediriger les port 80 et 443 vers votre serveur.

## Execution

### Lancer

~~~shell
docker-compose up -d
~~~

### Connexion

Ca se passe sur le port 81. les Users par defaut sont : admin@example.com / changeme

## Source
[nginx](https://nginxproxymanager.com/guide/#quick-setup)
[wolf](https://www.youtube.com/watch?v=qlcVx-k-02E&t=321s)