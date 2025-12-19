# Installation de Jellyfin
Sur votre proxmox créer un container à partir d'une Debian. 
Puis connectez vous à ce container. 
Je ne vais pas détailler en profondeur la creation de ce container. 
Mais prévoir : 
- 100 go d'espace disque (pour le transcodcage)
- 4 coeurs
- 2 go de ram
- non privilégié

## Ajout du dépo et installation

En root : 

~~~shell
apt install extrepo
extrepo enable jellyfin
apt update
apt install jellyfin
~~~

Je ne sais plus pour quelle raison mais j'ai installé :

~~~shell
apt install jellyfin-ffmpeg6
~~~

## Configuration 

Dans /etc/jellyfin/encoding.xml vous pouvez activer le support du HEVC ou AV1. 
Avec les balises :

~~~xml
<AllowHevcEncoding>true</AllowHevcEncoding>
<AllowAv1Encoding>true</AllowAv1Encoding>
~~~

# Accélération matériel 

Ici j'utilise une Intel Arc A310. 
Certes en jeux c'est pas une foudre de guerre mais pour le transcodage 
vidéo c'est ce qui donne la meilleure qualité. 

Cependant si vous avez un processeur Intel avec un GPU intégré cela 
suffit amplement. Dans mon cas possédant un serveur à base de Xéon, 
je n'en ai pas et j'ai donc opté pour une carte dédié. 

## Passthrought du GPU

Sur votre Proxmox dans `/dev/dri` vous devriez avoir quelque chose ressemblant 
à `renderDXXX`, dans mon cas j'ai `renderD128`. 
Ensuite il faut identifier l'ID du group `render` dans votre conteneur Jellyfin. 

~~~shell
getent group render
~~~

Dans mon cas cette commande me renvoi `render:x:104:jellyfin`. Ici ce qui m'intéresse c'est `104`.

Maintenant qu'on a identifié le périphérique et le group on peu 
passthrought notre composant. Vous pouvez le faire via l'interface de Proxmox.

[gallery]
pictures/linux/proxmox-jellyfin/01-add-device-button.png
pictures/linux/proxmox-jellyfin/02-add-device-interface.png
[/gallery]

Ou en ajoutant dans le fichier de configuration du container 
dans `/etc/pve/lxc/XXX.conf`:

~~~shell
dev0: /dev/dri/renderD128,gid=104
~~~

Une fois cela fait vous pouvez relancer votre conteneur et normalement 
dans /dev/dri vous devriez retrouver votre périphérique en 660 
avec root:render. 

~~~shell
root@Jellyfin:/dev/dri# ll
total 0
crw-rw---- 1 root render 226, 128 Nov  7 12:11 renderD128
root@Jellyfin:/dev/dri# 
~~~

## Installer l'accélération matériel :

Il faut installer le package opencl, pour vérifier si vous avez la 
bonne version faire un `apt policy intel-opencl-icd`. 
Il vous faut :
- une version supérieur à 22.xx pour un gpu intégré au processeur.
- une version supérieur à 23.xx pour une intel Arc

Si votre repo ne possède pas la bonne version vous pouvez les télécharger et installer à la main  
les packages depuis [github](https://github.com/intel/compute-runtime/releases). 

Dans mon cas il me faut aussi installer l'extension ffmpeg7 de jellyfin.

~~~shell
apt install jellyfin-ffmpeg7
~~~

## Activation

Cela se passe dans le `tableau de bord` de Jellyfin dans l'interface web. 

[gallery]
pictures/linux/proxmox-jellyfin/03-activation-transcodage-menu.png
pictures/linux/proxmox-jellyfin/04-activation-transcodage-options.png
[/gallery]

# Résultat
Avec cette configuration, ma machine transcode un flux 4K en 
HEVC 10bit vers de l'AV1 4K à environ 180 fps. Ce qui est assez :p. 
En software malgré l'attribution de 20 coeur, je plafonnais a 15 fps. 

[gallery]
pictures/linux/proxmox-jellyfin/05-resultat.png
[/gallery]


# Source

* [Jellyfin](https://jellyfin.org/docs/general/administration/hardware-acceleration/)
