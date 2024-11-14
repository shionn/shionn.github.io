## instalation de Jellyfin
Sur votre proxmox creer un container à partir du'une debian. Puis connectez vous à ce container. 

### Ajout du dépo et installation
en root : 
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

### configuration 
Dans /etc/jellyfin/encoding.xml vous pouvez activer le support du HEVC ou AV1. avec les balises :
~~~xml
<AllowHevcEncoding>true</AllowHevcEncoding>
<AllowAv1Encoding>true</AllowAv1Encoding>
~~~

## acceleration materiel 
Ici j'utilise une intel A310. 

### passthrought du GPU
Sur votre proxmox dans /dev/dri vous devrier avoir quelque chose ressemblant à `renderDXXX`, dans mon cas j'ai `renderD128`.
Ensuite il faut identifier l'ID du group `render` dans votre conteneur Jellyfin. 
~~~shell
getent group render
~~~
Dans mon cas cette commande me renvoi `render:x:104:jellyfin`. Ici ce qui m'interesse c'est `104`

Maintenant qu'on a identifier le periférique et le group on peu passthrought notre composant. 
Vous pouvez le faire via l'interface de proxmox

TODO : invserer image

Ou en ajoutant dans le fichier de cofniguration du container dans `/etc/pve/lxc/XXX.conf`:
~~~shell
dev0: /dev/dri/renderD128,gid=104
~~~

Une fois cela fait vous pouvez relancer votre conteneur et normalement dans /dev/dri vous devrriez retrouver votre périphérique en 660 avec root:render. 
~~~shell
root@Jellyfin:/dev/dri# ll
total 0
crw-rw---- 1 root render 226, 128 Nov  7 12:11 renderD128
root@Jellyfin:/dev/dri# 
~~~

### Installer l'acceleration materiel :

Il faut installer le package opencl, pour verifier si vous avz la bonne version faire un `apt policy intel-opencl-icd`. Si vous faut une version 23.xx. ou plus pour les intel ARC sinon un version 22.xx suffit. Si vous repo ne possede pas la bonne version vous pouvez telecharger les package depuis : (https://github.com/intel/compute-runtime/releases). Ou en activant les [apt-pinning](http://jaqque.sbih.org/kplug/apt-pinning.html).

Dans mon cas il me falais aussi installer l'extenssion ffmpeg7 de jellyfin.
~~~shell
apt install jellyfin-ffmpeg7
~~~

### Mode intel low Power : 

TODO

### Activation

Cela se passe dans le `tableau de bord` de jellyfin dans l'interface web. 



## Source
* [Jellyfin](https://jellyfin.org/docs/general/administration/hardware-acceleration/)
* 
