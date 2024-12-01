Je n'aime  pas particulièrement docker, je préfère passer par LXC en temps normal.
Mais bon pour un autre projet j'en ai eu besoin.

## Installation

### Ajout du repo
Ajout des packages pour docker. 
Il ne faut pas installer ceux présent dans Debian qui ne sont pas les package officiel de docker. 
Il s'agit potentiellement de vieux build.

Ajouter la clef de chiffrage :

~~~shell
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
~~~

Ces dépendances peuvent être nécessaire :

~~~shell
apt install ca-certificates curl
~~~

Puis ajouter un fichier de source à apt : `/etc/apt/sources.list.d/docker.list`

~~~shell
deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian bookworm stable
~~~

### Installation

Peut être que pas toute les dépendances sont nécessaires.

~~~shell
apt install docker-ce docker-ce-cli containerd.io docker-compose
~~~

test :

~~~shell
docker run hello-world
~~~

