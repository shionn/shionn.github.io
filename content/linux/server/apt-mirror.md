Apt-Mirror est un projet permettant de cloner un dépôt Debian et de l'heberger localement.
Ça peut paraître bête, mais j'ai une connexion très mauvaise et parfois j'ai des coupures réseau de plusieurs semaines.

# Installation 

C'est apt-mirror qui permet de cloner le dépôt officiel.

~~~shell
sudo apt install apt-mirror
~~~

## Configuration

Le fichier de configuration est `/etc/apt/mirror.list`. 
Il contient généralement la ligne : `set defaultarch  amd64`. Vous pouvez ignorer cette ligne.
J'ai choisi de ne pas la prendre en compte et de preciser plus loins les architectures. 

Admettons que vous souhaitiez faire un miroir de ce dépôt : 

~~~shell
Types: deb
URIs: http://deb.debian.org/debian
Suites: stable stable-updates
Components: main contrib
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
~~~

Alors vous devez ajouter les lignes suivantes au fichier de configuration :

~~~shell
# La ligne all est necessaire meme si vos client n'ont que l'architecture amd64
deb-all http://deb.debian.org/debian/ stable main contrib
deb-amd64 http://deb.debian.org/debian/ stable main contrib
deb-i386 http://deb.debian.org/debian/ stable main contrib

deb-all http://deb.debian.org/debian/ stable-updates main contrib
deb-amd64 http://deb.debian.org/debian/ stable-updates main contrib
deb-i386 http://deb.debian.org/debian/ stable-updates main contrib

clean http://deb.debian.org/debian
~~~

## Lancement 

Pour lancer un backup, utilisez la commande : `/usr/bin/apt-mirror`. 
Attention même si vous avez une bonne connexion, le premier backup va prendre du temps, car les serveurs Debian limitent le taux de transfert.

Mais attention, si comme moi vous gardez la configuration par défaut, il vous faudra lancer régulierement faire un `/var/spool/apt-mirror/var/clean.sh` sinon votre espace disque va exploser.

Et bien évidemment vous pouvez utiliser une crontab pour automatiser la chose :)

# Distribution

Un serveur HTTP est nécessaire pour héberger le dépôt. 
Dans mon cas, j'ai opté pour une solution simple en installant un serveur Lighttpd.

## Installation Lighttpd

~~~shell
sudo apt install lighttpd
~~~

## Configuration Lighttpd

Il vous faut activer le module dir-listing de Lighttpd si vous voulez pouvoir le parcourir manuellement.
Éditer le fichier `/etc/lighttpd/lighttpd.conf`. 

~~~shell
server.modules = (
        "mod_indexfile",
        "mod_access",
        "mod_alias",
        "mod_redirect",
        "mod_dirlisting", # Ajouter ce module
)
#...
server.username             = "www-data"
server.groupname            = "www-data"
server.port                 = 80
server.dir-listing          = "enable" # Ajouter cette ligne
~~~

Ensuite dans votre dossier `/var/www/html`, ajoutez un lien symbolique vers le dossier contenant votre clone par défaut `/var/spool/apt-mirror/mirror/deb.debian.org/`. 

~~~shell
cd /var/ww/html
ln -s /var/spool/apt-mirror/mirror/deb.debian.org/
~~~

# Utilisation cliente.

Modifier votre fichier source comme suit : 

~~~shell
Types: deb
URIs: http://<ip de serveur>/deb.debian.org/debian
Suites: stable stable-updates
Components: main contrib
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
~~~

# Limite et avantange

- J'ai utilisé ce projet sur pas mal de dépôts. Et je n'ai pas réussi à faire des backups sur certain externes comme celui de Mozilla.
- Il est relativement performant grâce à son exécution multitâche.
- Niveau espace disque, si on prend le dépôt Debian, en i386 et amd64, si on prend les composants `main`, `contrib`, `non-free`, `non-free-firmware` pour les suites `stable` et `testing` comptez au moment où j'écris ces lignes environ 300 Go. Donc je vous conseille de prévoir au moins 500 Go d'espace disque surtout si comme moi vous ajoutez des dépôts externe comme NVIDIA, XanMod, Steam, Docker...

J'ai également testé une autre solution, DebMirror, je vous en parlerai bientôt. 

