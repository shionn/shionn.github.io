
Je vous propose aujourd'hui un tuto sur la mise en place d'un serveur nas avec des disques en ZFS. Je ne vous présente pas ZFS, je pense que vous connaissez les avantages de ce systeme. 
La solution que je vous propose ici c'est que la grappe de disque ZFS soit traiter par proxmox et qu'on crais un container **Turnkey** hyper leger dessus qui se charge de traiter vos partages sur votre reseau. 
Cette solution présente plusieurs avantage : 
- grape ZFS partageable entre plusieurs container
- utilisation des ressources plus leger
- container non priviligié
Mais en désavantage :
- La gestion des patrtage n'est pas des plus simple avec turnkey

## Container
### Création du pool et dataset ZFS

Ici ce pool est composé de 6 disque acheté d'occasion qui ont servi pour du minage de CHIA. **EVITER** de faire comme moi et ne prenez pas des disques douteux. J'ai acheté sur un coup de tête et mes disque sont des "Machin bidule" et c'est pas bon pour un nas. Dans mon cas mon pool s'appel `ST8000`.

Inserer screen creation ZFS. 

Je souhaite faire un dataset `data` qui prenne toute ma grappe pour cela j'entre la commande : `zfs create ST800/data`

### Création du container

Inserer screan :
- telechargement de turnkey
- création du container

### Partage du dataset

Je souhaite que le dataset **/ST8000/data** de mon hote soit monté dans mon container turnkey dans le dossier **/mnt/data**.
Dans mon cas, mon containeur a l'identifiant 121.  Donc j'édite le fichier `/etc/pve/lxc/121.conf` et j'ajoute cette ligne :

~~~bash
mp0: /ST800/data,mp=/mnt/data
~~~

### Mapping des Users (Optionnel)

Par defaut quand un disque est monté dans un container les id utilisateurs et groups ne sont pas les mêmes. Il faut ajouter 100000 à l'id de l'utisateur du guest pour avoir l'id de l'host. En gros pour simplifier `id guest=id host + 100 000`. 
Dans beaucoup de cas cela ne nous convient pas. Mais c'est possible de twikker cela. Ainsi admettons que j'ai un conteneur qui se charge du telechargement des _distribution linux_ puisse les mettres à disposition d'un autre conteneur je peu m'assurer que les droit utilisateur soit toujours les bons. 

Pour ce conteneur (le nas), je souhaite que les id utilisateurs soit les mêmes sur sur mon hôte. C'est à dire que les id de l'utilisateur 1000+ soit les meme sur proxmox que sur le nas. La subtilité c'est qu'il faut faire un mapping complet sur les 65535 identifiant user et groupe. Dans cette exemple je vais mapper les id 1000 à 1100. et laisser les autre comme tel. Je dois donc :
- en partant de 0 je dois mapper 1000 identifiants vers 100000 à 101000
- en partant de 1000 je dois mapper 100 identifiants vers 1000 à 1100
- en partant de 1100 je dois mapper 64435 identifiants vers 101100 à 165535

Mais pour les group je soihaite également mapper le groupe 100 (users) vers 100 donc je le prendre en compte dans le mapping. 

[table cols="containeur,hôte"]
0..999	100000..100999
1000..1099	1000..1099
1100..65535	101100..165535
[/table]

Pour ce faire j'édite de nouveau  `/etc/pve/lxc/121.conf` et j'ajoute : 
~~~bash
lxc.idmap: u 0 100000 1000
lxc.idmap: u 1000 1000 100
lxc.idmap: u 1100 101100 64435
lxc.idmap: g 0 100000 100
lxc.idmap: g 100 100 1
lxc.idmap: g 101 100101 899
lxc.idmap: g 1000 1000 100
lxc.idmap: g 1100 101100 64435
~~~

Il faut comprendre cette ligne **u 0 100000 1000** comme :
- u : utilisateur
- 0 : à partir de 0 sur le containeur
- 100000 : mapper vers 100000 sur l'hôte
- 1000 : mapper 1000 identifiant

Ainci on peu comprendre la premiere ligne comme : 
> mapper les 1000 idenitifants de 0 à 999 du container vers 100000 à 100999 de l'hôte. 

Puis la seconde ligne comme :
> mapper les 100 identifiants de 1000 à 1099 du container vers 1000 à 1099 de l'hôte.

Mais ca ne suffit pas il faut permttre un tel mapping cela se fait dans `/etc/subuid` et `/etc/subg en ajoutant : 
~~~bash
root:1000:100
~~~
Ce qui en gros signifit : 
> permettre le mapping de 100 idifiant à partir de 1000

## Source

* https://www.youtube.com/watch?si=uNb3HVNwdK8xJMQQ&v=I7nfSCNKeck&feature=youtu.be
* https://itsembedded.com/sysadmin/proxmox_bind_unprivileged_lxc/
