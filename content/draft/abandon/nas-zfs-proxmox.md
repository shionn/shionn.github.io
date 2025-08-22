
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

Ici ce pool est composé de 6 disque acheté d'occasion qui ont servi pour du minage de CHIA. **EVITER** de faire comme moi et ne prenez pas des disques douteux. 
J'ai acheté sur un coup de tête et mes disque sont des "SMR" et c'est pas bon pour un nas. Pour cet exemple il s'appel `MonPool`.

Je ne suis pas un grand spécialiste de ZFS Mais voici quelques information : 
- ashift : c'est la taille des blocks, parait que c'est super important j'ai lus pas mal de litterature et finalement 12 c'est bien. 
- compression : c'est gratuit on active


[gallery]
pictures/linux/proxmox-zfs-fileserver/01-create-pool.png
[/gallery]

Je souhaite faire un dataset `data` qui prenne toute ma grappe pour cela, dans la console de mon serveur proxmox, j'entre la commande : `zfs create MonPool/data`

### Création du container

Ensuite il faut creer le containeur, ici j'utilise tunrkey file server. Ce n'est pas une distrib funky du genre de CasaOS, mais ca fait ce que j'ai besoin partager des dossiers sur mon reseau en Samba ou NFS. Commencons par télécharger la distrib depuis l'interface de proxmox. Dans votre disque proxomox (par défaut local) > CT Tamplates > Templates, faites une rechers `turnkey-fileserver`.

[gallery]
pictures/linux/proxmox-zfs-fileserver/02-dl-turnkey-fileserver.png
[/gallery]

Puis on peu passer à la creation du container. il n'y a rien de particulier ici :
- 2 coeur et 512M de ram et 8Go sont plus qu'assez.
- containeur non priviligier (par defaut).
- par habitude je désactive la SWAP mais vous pouvez la concerver, c'est peut être une bétise de ma part.
- ipv4 en DHCP et ipV6 en SLAAC, c'est ce qui marche le mieux avec mon router.
- ne pas lancer le container tous de suite, il y a d'autre configuration à faire.

[gallery w=250 h=188]
pictures/linux/proxmox-zfs-fileserver/03-create-container.png
pictures/linux/proxmox-zfs-fileserver/04-create-container.png
pictures/linux/proxmox-zfs-fileserver/05-create-container.png
pictures/linux/proxmox-zfs-fileserver/06-create-container.png
pictures/linux/proxmox-zfs-fileserver/07-create-container.png
pictures/linux/proxmox-zfs-fileserver/08-create-container.png
pictures/linux/proxmox-zfs-fileserver/09-create-container.png
pictures/linux/proxmox-zfs-fileserver/10-create-container.png
[/gallery]

### Partage du dataset

Je souhaite que le dataset **/MonPool/data** de mon hote soit monté dans mon container turnkey dans le dossier **/mnt/data**.
Dans mon cas, mon containeur a l'identifiant 121. Donc j'édite le fichier `/etc/pve/lxc/121.conf` et j'ajoute cette ligne :

~~~bash
mp0: /MonPool/data,mp=/mnt/data
~~~

### Mapping des Users (Optionnel)

Par defaut quand un disque est monté dans un container les id utilisateurs et groups ne sont pas les mêmes. Il faut ajouter 100000 à l'id de l'utisateur du guest pour avoir l'id de l'host. En gros pour simplifier `id guest=id host + 100 000`. 

Dans certain cas, notement quand plusieurs containeur accede au meme pool zfs, cela ne nous convient pas. Immaginons un cas hypotethique ou un containeur telechargerai des fichier bitorrent pour les mettre à disposition d'un autre container dans un dossier, ici on sera content d'avoir le même identifiants utilisateur. 

Pour ce conteneur (le nas), je souhaite que les id utilisateurs soit les mêmes sur sur mon hôte et l'invité. C'est à dire que les id de l'utilisateur 1000+ soit les meme sur proxmox que sur le nas. ~La subtilité c'est qu'il faut faire un mapping complet sur les 65535 identifiant user et groupe.~ Dans cette exemple je vais mapper les id 1000 à 3000 qui corresponde au identifiant utilisateur. et laisser les autre comme tel.

La syntaxe n'est pas évidente à comprendre. Je dois donc :
- en partant de 0 je dois mapper 1000 identifiants vers 100000 à 101000
- en partant de 1000 je dois mapper 2000 identifiants vers 1000 à 3000
- *en partant de 3000 je dois mapper 62535 identifiants vers 103000 à 165535. Cela semble finalement optionnel.*

Pour les groupes c'est pareil à l'exeption du groupe 100 (users) qui doit être mapper vers le groupe 100. 

Pour ce faire j'édite de nouveau  `/etc/pve/lxc/121.conf` et j'ajoute : 

~~~bash
# mapper les identifiants utilisateurs 0 à 999 vers 100000 à 100999
lxc.idmap: u 0 100000 1000
# mapper les identifiants utilisateurs 1000 à 2999 vers 1000 à 2999
lxc.idmap: u 1000 1000 2000
lxc.idmap: u 3000 103000 62535
lxc.idmap: g 0 100000 100
lxc.idmap: g 100 100 1
lxc.idmap: g 101 100101 899
lxc.idmap: g 1000 1000 2000
lxc.idmap: g 3000 103000 62535
~~~

Il faut comprendre cette ligne **u/g 0 100000 1000** comme :
- u/g : utilisateur / group
- 0 : à partir de 0 sur le containeur
- 100000 : mapper vers 100000 sur l'hôte
- 1000 : mapper 1000 identifiant donc de 0 à 999

Mais ca ne suffit pas il faut permttre un tel mapping cela se fait dans `/etc/subuid` et `/etc/subgid` en ajoutant : 

~~~bash
root:1000:2000
~~~
Ce qui en gros signifit : 
> Permettre le mapping de 2000 idifiant à partir de 1000. 

## Configuration de Turnkey Fileserver.

### Premier boot

On peu enfin lancer turnkey file server. Lancer le container et connecter vous en SSH ou via le shell de proxmox.

Au premier boot turnkey file server vous demandera de configurer le mot de passe samba. Je skip les deux étapes suivantes Mais j'applique bien les patchs de sécurités à la derniere étape. Puis reboot mais juste avant cela vous affiche un récap de la configuration. 

[gallery w=200 h=150]
pictures/linux/proxmox-zfs-fileserver/11-turnkey-first-boot.png
pictures/linux/proxmox-zfs-fileserver/12-turnkey-first-boot.png
pictures/linux/proxmox-zfs-fileserver/13-turnkey-first-boot.png
pictures/linux/proxmox-zfs-fileserver/14-turnkey-first-boot.png
[/gallery]

### Création des utilisateurs unix

Il faut commencer par creer un utilisateur linux pour chaque utilisateur sur samba qui accede à votre nas. Acceder en http sur le port 12321 à votre server puis connecter avec votre user root, en utilisant le mot de passe que vous avez choisi à la création du container. Puis dans **System > Users and Groups > Create a new user**. Ici je crais mon premier utilisateur **shionn** avec donc l'identifiant 1000, je laisse toute les autres option par defaut.

[gallery]
pictures/linux/proxmox-zfs-fileserver/15-create-unix-account.png
[/gallery]

Ensuite le truc c'est que le mot de passe samba et unix ne sont pas lié pour des raison de sécurité. Pour ca dans **Server > Samba Windows File Share > Convert Users** puis je selectionne mon user shionn et je définit sont mot de passe. 

[gallery]
pictures/linux/proxmox-zfs-fileserver/18-create-samba-account.png
[/gallery]


### Création d'un dossier à partager

Admettons que je veillent partagé le dossier **/mnt/data/shionn** à l'utilisateur **shionn**. Je vais dans **Tools > File Manager** puis je navigue dans **/mnt/data** puis dans **File > Create new Directory**. Je séléctionne ce dossier nouvellement creer puis **Tools > Change ownership** et j'attribus **shionn:users** récursivement. Puis **Tools > Change Permissions** et j'applique 755 récursivement. 

Bien sur tous ca est à adapter en fonction de vos besoin. 

Pour que cela soit possible il vous faudrat dapater les droit d'acces dans le serveur proxmox. Dans mon cas j'ai fait un `chmod 777 /MonPool/data`.

### Creation d'un premier partage Samba

Toujours sur l'interface du serveur je vais dans **Servers > Samba Windows File Sharing.** Il y a par défaut 3 partages, homes cdrom et storage, dont je n'ai pas besoin, je les supprime. Puis sur **Create a new file share**. Et je crois mon partage comme suit. Puis je vais dans le partage nouvellement créer et dans **Security and Access Control**.

[gallery]
pictures/linux/proxmox-zfs-fileserver/16-create-file-share.png
pictures/linux/proxmox-zfs-fileserver/17-create-file-share.png
[/gallery]



## Source

* [Host NAS inside LXC Container par MRP](https://www.youtube.com/watch?si=uNb3HVNwdK8xJMQQ&v=I7nfSCNKeck&feature=youtu.be)
* https://itsembedded.com/sysadmin/proxmox_bind_unprivileged_lxc/
* https://forum.proxmox.com/threads/newuidmap-uid-range-1100-1101-1100-1101-not-allowed.73414/
