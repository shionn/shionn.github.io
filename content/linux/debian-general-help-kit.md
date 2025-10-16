Voici ma petite liste de truc et astuce sur Debian.

## Audio 
### Pavucontrol
Outil pour mieux contrôler les périphériques audio

~~~shell
apt install pavucontrol
~~~

### audio qui crack
Je n'ai pas trouver de meileurs solution. Mais relancer le serveur pipewire resout le probleme. 

~~~shell
systemctl --user restart pipewire.service
~~~

## Cron
### Cron au boot

Créer un dossier `/etc/crton.reboot` puis ajouter cela au fichier `/etc/crontab`

~~~shell
@reboot		root	cd / && run-parts --report /etc/cron.reboot
~~~

## Eclipse
### Eclipse erreur ouverture markdown
Cannot display wiki markup preview: No more handles because there is no underlying browser available. Please ensure that WebKit with its GTK 3.x bindings is installed (WebKit2 API level is preferred). Additionally, please note that GTK4 does not currently have Browser support.  No more handles because there is no underlying browser available. Please ensure that WebKit with its GTK 3.x bindings is installed (WebKit2 API level is preferred). Additionally, please note that GTK4 does not currently have Browser support.

~~~shell
sudo apt install libwebkit2gtk-4.0-37
~~~

### Eclipse wayland
~~~shell
#/bin/shell
export WEBKIT_DISABLE_COMPOSITING_MODE=1
/path/to/eclipse/eclipse
~~~

## File system

### Samba et fstab

Créer un fichier _.smbcredentials_ dans votre /home :

~~~shell
username=votre user
password=votre mot de pass
domaine=WORKGROUP
~~~

Installer le package _cifs-utils_. 

Éditer votre fichier fstab comme suit :

~~~shell
//IP_DU_SERVEUR/PARTAGE/       /DOSSIER/CIBLE    cifs    rw,user,suid,uid=VOTRE_UID,gid=VOTRE_GID,credentials=/VOTRE_HOME/.smbcredentials    0    0
~~~

Puis recharger la configuration comme suit : `sudo systemctl daemon-reload`


## Gnome
### ALT-F5 qui fait nimp
Dans dconf-editor modifier la clef `unmaximise` dans le dossier : `org.gnome.desktop.wm.keybindings`

### Desactiver pasword apres sleep
Installer dconf-editor modifier la clef `/org/gnome/desktop/screensaver lock-enable` à false

### Le pc ne se met pas en veille
Généralement un processus l'en empêche. J'ai trouvé cette astuce sur Reddit. Pour connaître ce processus vous pouvez entrer cette commande : 

~~~shell
dbus-send --print-reply --dest=org.gnome.SessionManager /org/gnome/SessionManager org.gnome.SessionManager.GetInhibitors
~~~

Cela vous donnera une réponse comme cela : 

~~~shell
method return time=1728730333.701330 sender=:1.28 -> destination=:1.303 serial=2481 reply_serial=2
   array [
      object path "/org/gnome/SessionManager/Inhibitor272"
   ]
~~~

Ensuite on reprend le __/org/gnome/SessionManager/Inhibitor272__ qu'on met dans cette commande :

~~~shell
dbus-send --print-reply --dest=org.gnome.SessionManager /org/gnome/SessionManager/Inhibitor272 org.gnome.SessionManager.Inhibitor.GetAppId
~~~

Qui nous donnera ce résultat :

~~~shell
method return time=1728730410.581488 sender=:1.28 -> destination=:1.304 serial=2482 reply_serial=2
   string "firefox"
~~~

## Jeux

Voir ma page [dédié au jeux](2025/debian-gaming-help-kit.html)


## Journalctl
### Log qui spam

J'ai un spam de ce log. 

~~~shell
i2c-designware-pci 0000:09:00.3: Refused to change power state from D0 to D3hot
~~~

Il semblerai qu'ajouter l'option suivante la grub resolve le probleme : 

~~~shell
GRUB_CMDLINE_LINUX="pcie_port_pm=off"
~~~

## Materiel
### Faire un smart profond

~~~shell
# lancer le test
sudo smartctl -t long /dev/nvme0
# voir la progress
sudo smartctl -a /dev/nvme0 | grep -i progress
# voir les résultats
sudo smartctl -a /dev/nvme0
~~~

## Proxmox
### changer le hostname d'un container

~~~shell
pct set <VMID> --hostname <newname>
~~~

### changer les uid dans un rootfs

~~~shell
pct mount <ID>
cd /var/lib/lxc/<ID>/rootfs
find /var/lib/lxc/<ID>/rootfs/ -user <OLDUID> -exec chown -h <NEWUID> {} \;
find /var/lib/lxc/<ID>/rootfs/ -group <OLDGID> -exec chgrp -h <NEWGID> {} \; 
pct unmount <ID>
~~~

## Vidéo
### OBS pas de Vaapi
~~~shell
apt install mesa-va-drivers
~~~


## Vim

Configuration de vim, désactiver le mode de séléction à la souris : 

~~~shell
echo "set mouse-=a" >> ~/.vimrc
~~~

Ajouter la coloration syntaxic : 

~~~shell
echo "syntax on" >> ~/.vimrc
~~~

## Youtube
### Downloader une video

En discutant en vocale sur le didi de Steve, j'ai decouvert ce petit outil.

~~~shell
sudo apt install yt-dlp
yt-dlp -f 'bestvideo[codec^=av01]/bestvideo+bestaudio' --merge-output-format mkv <URL>
~~~

On peu aller tres loin, pour telecharger toutes les musiques d'une playlist et en plus découper chaque video selon le chapitrage avec les mignatures  : 

~~~shell
yt-dlp --split-chapters -f 'bestaudio' --output '%(playlist_title)s/sources/%(title)s.%(ext)s' --output chapter:'%(playlist_title)s/%(title)s/%(section_number)02d - %(section_title)s.%(ext)s' --restrict-filenames --write-thumbnail --output thumbnail:'%(playlist_title)s/%(title)s/00 - %(title)s.%(ext)s' <URL en /playlist?list=>
~~~


## Wayland
### executer un truc en XWayland : 

~~~shell 
GDK_BACKEND=x11 <command>
~~~

## Seveur
### Initialisation

Sur chacun de mes serveurs je commence par faire cela :

~~~shell
apt install bash-completion vim -y
apt remove nano -y
echo "set mouse-=a" >> ~/.vimrc
echo "syntax on" >> ~/.vimrc
echo "alias ll=\"ls -l\"" >> ~/.bashrc
echo "alias la=\"ls -al\"" >> ~/.bashrc
~~~

### Tomcat
Quand je veux déployé dans ROOT je dois changer les droit d'accès dans le dossier ROOT de `/var/lib/tomcat10/webapps`

Pour répondre sur 80 dans le fichier : `/etc/tomcat10/server.xml`

### Tuto file serveur sur promox
J'aime pas les tuto youtube mais celui la est bien [MRP](https://youtu.be/I7nfSCNKeck?si=uNb3HVNwdK8xJMQQ)

### hdparm spindown des disks :
[source](https://wiki.archlinux.org/title/Hdparm)

~~~shell
#/etc/udev/rules.d/69-hdparm.rules
ACTION=="add|change", KERNEL=="sd[a-z]", ATTRS{queue/rotational}=="1", RUN+="/usr/bin/hdparm -B 127 /dev/%k"
~~~

### Connaitre quel processus ecoute sur quel port

on peu utilisé netstat : `apt instal` netstat puis `netstat -ltnp`

### creer un service

Par exemple : **/etc/systemd/system/MonService.service**

~~~shell
[Unit]
Description=NOM DU SERVICE
After=syslog.target network.target

[Service]
SuccessExitStatus=143
User=root
Group=root
Type=simple
Environment="FOO=BAR"
WorkingDirectory=/root
ExecStart=/absolut/path/truc.sh
ExecStop=/bin/kill $MAINPID

[Install]
WantedBy=multi-user.target
~~~

Puis :

~~~shell
sudo systemctl daemon-reload
sudo systemctl enable MonService.service
~~~


