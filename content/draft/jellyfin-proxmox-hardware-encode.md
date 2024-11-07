## instalation de Jellyfin
Sur votre proxmox creer un container à partir du'une debian. Puis connectez vous à ce container. 

### Ajout du dépo et installation
en root : 
~~~bash
apt install extrepo
extrepo enable jellyfin
apt update
apt install jellyfin
~~~

Je ne sais plus pour quelle raison mais j'ai installé :
~~~bash
apt install jellyfin-ffmpeg6
~~~

### configuration 
Dans /etc/jellyfin/encoding.xml vous pouvez activer le support du HEVC ou AV1. avec les balises :
~~~xml
<AllowHevcEncoding>true</AllowHevcEncoding>
<AllowAv1Encoding>true</AllowAv1Encoding>
~~~



