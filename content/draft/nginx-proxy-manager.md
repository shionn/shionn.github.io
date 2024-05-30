
## installation
### Prérequis
Installer docker. [procedure disponible ici](2024/docker-sur-debian.html)

### Configuration docker

Il faut créer un fichier de configuration docker

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

### configuration reseau

Rediriger les port 80 et 443 vers votre serveur.

## Execution

### Lancer

~~~shell
docker-compose up -d
~~~

### connexion

Ca se passe sur le port 81. les Users par defaut sont : admin@example.com / changeme



## source
[nginx](https://nginxproxymanager.com/guide/#quick-setup)
[wolf](https://www.youtube.com/watch?v=qlcVx-k-02E&t=321s)