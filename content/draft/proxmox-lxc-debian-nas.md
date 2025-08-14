



## Installation

### Création du Container

Apres avoir installer un container debian avec ces options : 

- privilégié (nécéssaire pour le partage NFS)
- 8go de Disk
- 2 cpu
- 1024Mo de ram

### Montage des pool ZFS

~~~bash
mp0: /P34A60/data,mp=/mnt/data
mp1: /ST8000/data,mp=/mnt/data2
~~~

### 

Installation des composants :

~~~bash
apt install samba nfs-kernel-server curl
~~~

Installation de webmin : 

~~~bash
curl -o webmin-setup-repo.sh https://raw.githubusercontent.com/webmin/webmin/master/webmin-setup-repo.sh
sh webmin-setup-repo.sh
apt update
apt-get install webmin --install-recommends
~~~

## Configuration webmin

acceder ici : https://maxinas:10000/

### Samba

supprimer les partage reseau existant. 



## Ressource 

- https://webmin.com/download/