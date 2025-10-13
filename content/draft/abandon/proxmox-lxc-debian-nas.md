



## Installation

### Création du Container

Apres avoir installer un container debian avec ces options : 

- privilégié (nécéssaire pour le partage NFS)
- 8go de Disk
- 2 cpu
- 1024Mo de ram
- features nesting=1

### Montage des pool ZFS

~~~shell
mp0: /P34A60/data,mp=/mnt/data
mp1: /ST8000/data,mp=/mnt/data2
~~~

### 

Installation des composants :

~~~shell
apt install samba nfs-kernel-server curl psmisc
~~~

Sur votre serveur proxmox il faut également installer nfs-kernel-server

Installation de webmin : 

~~~shell
curl -o webmin-setup-repo.sh https://raw.githubusercontent.com/webmin/webmin/master/webmin-setup-repo.sh
sh webmin-setup-repo.sh
apt update
apt-get install webmin --install-recommends
~~~

## Configuration webmin

Acceder ici : https://<ip de votre container>:10000/ connecté vous avec votre user root. 

### Creation d'un user

Il est necessaire de creer un user linux pour chaque user samba, mais en revanche il est important qu les mot de passe soit différent entre les deux (samba est une passoire).

Dans `System > Users and Groups > Create a new User`.
Entrer un username et ne touché à rien d'autre. Recommencer pour chaque utilisateur désiré. 
Vous pouvez définir un mot de pass, mais si vous le faites, assurer vous de ne pas utiliser le même mot de pass pour samba.

Puis dans `Servers > Samba Windows File Sharing > Convert User` cliquer sur `Only listed users or UID ranges` et séléctionner l'utilisateur creer précédement et entrer un mot de pass dans `Use this password`. Recommencer pour chaque utilisateur désiré. 
Si vous avez renseigné un mot de pass linux il est important de choisir un mot de passe différent. 


### Configuration d'un partage Samba

Dans `Servers > Samba Windows File Sharing` cliquer sur `Create a new file share`. 
Entrer un nom de partage dans `Share Name`. J'aime mettre `users` dans `Create with group` et changer le `create with owner` avec l'utisateur si c'est un partage dedier à une seul personne.

Puis aller dans le partage que vous avez creer et dans `Security and Access Control` puis ajouter les uilisateur qui y ont acces dans `valid users` et séléctionner `Revalidate users > yes`. 

### Configuration d'un partage NFS

TODO


## Ressource 

- https://webmin.com/download/
