
# Installation 


## Apt-mirror 

C'est apt mirror qui permet de cloner le repo officiel

~~~shell
sudo apt install apt-mirror
~~~

J'ai choisi de garder le dossier de destination par defaut de apt-mirror : `/var/spool/apt-mirror`. Il est possible de le changer mais je ne traiterai pas cela dans cet article.

Puis on dois configurer les repo qu'on va mirroir. Et ou. Il faut editer le fichier `/etc/apt/mirror.list`. Dans mon cas j'ai besoin :
- des architecture i368 et amd64
- des branch main testing unstable

~~~shell
set defaultarch i386 amd64

deb http://deb.debian.org/debian/ stable main contrib non-free non-free-firmware
~~~

TODO ajouter les sources.>

Puis pour lancer le clone il faut faire un `apt-mirror`.

## Mise à jour automatique 

Ajouter une crontab qui fait un apt-mirror. 
Dans mon cas j'ai decaler les crontab daily à 1h du mat et j'ai ajouté ce script dans /etc/crontab.daily. 
Il ne faut pas oublier de rendre executable.

~~~shell
/usr/bin/apt-mirror >> /var/log/apt-mirror-report.log
~~~


## Serveur http

Un serveur HTTP est nécessaire pour héberger le répertoire. 
Dans mon cas, j'ai opté pour une solution simple en installant un serveur lighttpd.

~~~shell
sudo apt install lighttpd
~~~

Ensuite il faut creer un répertoire "debian" dans le dossier `/var/www/html/`. 

Puis j'active le mode `mod_dirlisting` en editant le fichier `/etc/lighttpd/lighttpd.conf` 
en ajoutant le module dans la conf `server.modules` : 

~~~shell
server.modules = (
        "mod_indexfile",
        "mod_access",
        "mod_alias",
        "mod_redirect",
        "mod_dirlisting",
)
~~~

Et j'ajoute une ligne de configuration `server.dir-listing = "enable"`. 


# Utilisation
