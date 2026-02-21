
# Installation 

## Serveur http

Un serveur HTTP est nécessaire pour héberger le répertoire. 
Dans mon cas, j'ai opté pour une solution simple en installant un serveur lighttpd.

~~~bash
sudo apt install lighttpd
~~~

Ensuite il faut creer un répertoire "debian" dans le dossier `/var/www/html/`. 

## Apt-mirror 

C'est apt mirror qui permet de cloner le repo officiel

~~~bash
sudo
~~~

Puis on dois configurer les repo qu'on va mirroir. Et ou. Il faut editer le fichier /etc/apt/mirror.list. Dans mon cas j'ai besoin :
- des architecture i368 et amd64
- des branch main testing unstable


~~~bash
set base_path /var/www/html/debian
set defaultarch i386 amd64
~~~

TODO ajouter les sources.>

il faut copier les scripts de /var/spool/apt-mirror/var var /var/www/html/debian/var. oui les script sont vide par defaut. 

~~~bash
mkdir /var/www/html/debian/var
cp /var/spool/apt-mirror/var/clean.sh /var/www/html/debian/var
cp /var/spool/apt-mirror/var/postmirror.sh /var/www/html/debian/var
~~~

puis pour lancer le clone il faut faire un `apt-mirror`



## Mise à jour automatique 

Ajouter une crontab qui fait un apt-mirror.