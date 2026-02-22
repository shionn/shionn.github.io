Voici ma petite liste de truc et astuce sur ProxMox.


# Changer le hostname d'un container

~~~shell
pct set <VMID> --hostname <newname>
~~~

# Changer le mapping des identifiants

C'est souvent utile pour le partage d'un dossier entre plusieurs conteneurs. 
Cela s'applique à un conteneur non privilégié.

Par défaut, le mapping des identifiants est le suivant : ` identifiant Proxmox = 100000 + identifiant utilisateur dans le conteneur`.
Cela signifie que si un utilisateur (par exemple, l’utilisateur 1000) dans le conteneur LXC écrit un fichier dans un répertoire partagé, l’identifiant de ce fichier sera 101000 sur le système hôte Proxmox.

Hors, admettons que vous souhaitiez qu'un dossier dans un répertoire en 1000:100 de Proxmox soit mapper par exemple sur l'identifiant 123:456 dans Proxmox. 
Il faut ajouter cette configuration dans le fichier `/etc/pve/lxc/<id du conteneur>.conf`.
La difficulté est qu'il faut mapper les 65 535 identifiants, car vous ne pouvez pas simplement surcharger un seul identifiant.
Chaque ligne s'écrit comme cela : `lxc.idmap: u/g <id de départ LXC> <id de départ Proxmox> <nombre d'id à mapper>`.

[table cols="Dans le conteneur,Dans l'hote,Ligne"]
0 à 999	100000 à 100999	lxc.idmap: u 0 100000 1000
1000	123	lxc.idmap: u 123 1000 1
1001 à 65535	1001001 à 165535	lxc.idmap: u 1001 101001 64534
Et pareil pour les groupes.
0 à 99	100000 à 100099	lxc.idmap: g 0 100000 100
100	456	lxc.idmap: g 456 100 1
101 à 65535	100101 à 165535	lxc.idmap: g 101 100101 65434
[/table]

Ce qui donne.

~~~shell
lxc.idmap: u 0 100000 1000
lxc.idmap: u 123 1000 1
lxc.idmap: u 1001 101001 64534
lxc.idmap: g 0 100000 998
lxc.idmap: g 456 100 1
lxc.idmap: g 101 100101 65434
~~~

# Changer les uid dans un rootfs

Et bien sûr, la difficulté, c'est que si vous faites un tel mapping après avoir créé votre conteneur, les anciens fichiers ont donc des identifiants qui n'existent plus. Pour cela, arrêtez votre conteneur, puis faites les commandes suivantes.

~~~shell
pct mount <ID>
cd /var/lib/lxc/<ID>/rootfs
find /var/lib/lxc/<ID>/rootfs/ -user <OLDUID> -exec chown -h <NEWUID> {} \;
find /var/lib/lxc/<ID>/rootfs/ -group <OLDGID> -exec chgrp -h <NEWGID> {} \; 
pct unmount <ID>
~~~

Dans l'exemple précedent :

~~~shell
pct mount <ID>
cd /var/lib/lxc/<ID>/rootfs
find /var/lib/lxc/<ID>/rootfs/ -user 101000 -exec chown -h 123 {} \;
find /var/lib/lxc/<ID>/rootfs/ -group 100100 -exec chgrp -h 456 {} \; 
pct unmount <ID>
~~~

# Supprimer un volume non utilisé

Il peu arriver parfois que vous retrouvier avec des volume qui ne sont plus utilisé suite a des migrations.

~~~bash
pvesm list <storage>
pvesm free <storage>:<volume>
~~~

