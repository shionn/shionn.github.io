Voici ma petite liste de truc est astuce sur Debian.

## Gnome
### Pavucontrol
Outil pour mieux contrôler les périphériques audio

~~~shell
apt install pavucontrol
~~~

### ALT-F5 qui fait nimp
Dans dconf-editor modifier la clef : `org.gnome.desktop.wm.keybindings`

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

## Vim
### Désactiver le mode visual

~~~shell
echo "set mouse-=a" >> ~/.vimrc
~~~

### Pas de coloration syntaxique

~~~shell
echo "syntax on" >> ~/.vimrc
~~~

## Cron
### Cron au boot
~~~shell
@reboot		root	cd / && run-parts --report /etc/cron.reboot
~~~

## Openrgb
Logiciel de contrôle de périphérique de rgb
### Gskill et gigabyte
Le couple des mémoires Gskill sur une carte mère Gigabyte ne marche pas fort. Ajouter l'option : `acpi_enforce_resources=lax` au boot du noyau.

~~~shell
GRUB_CMDLINE_LINUX="acpi_enforce_resources=lax"
~~~

Installer également `i2c-dev`

~~~shell
apt install i2c-tools
~~~

Avant de lancer OpenRGB charger le module.

~~~shell
sudo modprobe i2c-dev
~~~

Et peut etre vous ajouter au groupe : 

~~~shell 
sudo usermod -aG i2c <USER>
~~~


## Jeux
### Installer Steam
Il faut ajouter les dépôts _non-free_ puis Ajouter des l'architecture i386 :

~~~shell
sudo dpkg --add-architecture i386
~~~

Puis installation de Steam :

~~~shell
sudo apt install steam
~~~

### Jeux comme au ralenti (Horizon Zero Dawn)
Ajouter l'option **tsc=reliable** aux noyaux.

### Son qui sature (Horizon Zero Dawn)
Ajouter ̀`PULSE_LATENCY_MSEC=60 DRI_PRIME=1` à la commande de lancement

### Utilitaire
- Mangohud et Goverlay pour la config
- Gamemoderun

## Vidéo
### OBS pas de Vaapi
~~~shell
apt instal mesa-va-drivers
~~~

## Steam Deck
### Calibrer les joystick
thumbstick_cal

### débloquer / bloquer
sudo steamos-readonly disable

## Eclipse
### Eclipse erreur ouverture markdown
Cannot display wiki markup preview: No more handles because there is no underlying browser available. Please ensure that WebKit with its GTK 3.x bindings is installed (WebKit2 API level is preferred). Additionally, please note that GTK4 does not currently have Browser support.  No more handles because there is no underlying browser available. Please ensure that WebKit with its GTK 3.x bindings is installed (WebKit2 API level is preferred). Additionally, please note that GTK4 does not currently have Browser support.

~~~shell
sudo apt install libwebkit2gtk-4.0-37
~~~

### eclipse wayland
~~~shell
#/bin/bash
export WEBKIT_DISABLE_COMPOSITING_MODE=1
/path/to/eclipse/eclipse
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

## file system
### Samba et fstab
Créer un fichier _.smbcredentials_ dans votre /home :
~~~shell
username=votre user
password=votre mot de pass
domaine=WORKGROUP
~~~

Installer le package _cifs-utils_. 

Éditer votre fichier votre fichier fstab comme suit :
~~~shell
//IP_DU_SERVEUR/PARTAGE/       /DOSSIER/CIBLE    cifs    rw,user,suid,uid=VOTRE_UID,gid=VOTRE_GID,credentials=/VOTRE_HOME/.smbcredentials    0    0
~~~

Puis recharger la configuration comme suit : 

~~~shell
sudo systemctl daemon-reload
~~~

## Ma config desktop
~~~shell
apt install bash-completion vim
apt remove nano
apt install gnome-shell gnome-terminal dconf-editor 
apt install cifs-utils npt
apt install gimp firefox thunar thunar-archive-plugin geany blender gimage-reader
apt install lutris steam gamemode mangohud
apt install git openjdk-17-jdk openjdk-17-source
apt remove firefox-esr
apt remove gnome-software
~~~
