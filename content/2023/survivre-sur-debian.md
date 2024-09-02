Voici ma petite liste de truc est astuce sur debian.

## Gnome
### Pavucontrol
Outil pour mieux controller les peripheriques audio

~~~shell
apt install pavucontrol
~~~

### ALT-F5 qui fait nimp
dans dconf-editor modifier la clef : `org.gnome.desktop.wm.keybindings`

### Desactiver pasword apres sleep
installer dconf-editor modifier la clef `/org/gnome/desktop/screensaver lock-enable` à false

## Vim
### Desactiver le mode visual

~~~shell
echo "set mouse-=a" >> ~/.vimrc
~~~

### Pas de coloration syntaxique

~~~shell
echo "syntax on" >> ~/.vimrc
~~~

## Cron
### cron au boot
~~~shell
@reboot		root	cd / && run-parts --report /etc/cron.reboot
~~~

## Openrgb
Logiciel de control de peripherique de rgb
### Gskill et gigabyte
Le couple des mémoires Gskill sur une carte mere gigabyte ne marche pas fort. Ajouter l'option : `acpi_enforce_resources=lax` au boot du noyau.

~~~shell
GRUB_CMDLINE_LINUX="acpi_enforce_resources=lax"
~~~

installer également `i2c-dev`

~~~shell
apt install i2c-dev
~~~

Avant de lancer openrgb charger le module.

~~~shell
sudo modprobe i2c-dev
~~~

## Jeux
### Installer steam
Il faut ajouter les dépot _non-free_ puis Ajouter des l'architecture i386 :

~~~shell
sudo dpkg --add-architecture i386
~~~

Puis installation de steam :

~~~shell
sudo apt install steam
~~~

### Jeux comme au ralenti (Horizon Zero Dawn)
Ajouter l'option **tsc=reliable** aux noyeau

### Son qui sature (Horizon Zero Dawn)
ajouter ̀`PULSE_LATENCY_MSEC=60 DRI_PRIME=1` à la commande de lancement

### Utilitaire
- Mangohud
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

Sur chacun de mes serveurs je commence par faire ca :

~~~shell
apt install bash-completion vim -y
apt remove nano -y
echo "set mouse-=a" >> ~/.vimrc
echo "syntax on" >> ~/.vimrc
echo "alias ll=\"ls -l\"" >> ~/.bashrc
echo "alias la=\"ls -al\"" >> ~/.bashrc
~~~

### Tomcat
Quand je veux deployé dans ROOT Je dois changer les droit d'acces dans le dossier ROOT de `/var/lib/tomcat10/webapps`

Pour répondre sur 80 dans le fichier : `/etc/tomcat10/server.xml`

### Tuto file serveur sur promox
J'aime pas les tuto youtube mais celui la est bien [MRP](https://youtu.be/I7nfSCNKeck?si=uNb3HVNwdK8xJMQQ)

### hdparm spindown des disks :
[source](https://wiki.archlinux.org/title/Hdparm)

~~~shell
#/etc/udev/rules.d/69-hdparm.rules
ACTION=="add|change", KERNEL=="sd[a-z]", ATTRS{queue/rotational}=="1", RUN+="/usr/bin/hdparm -B 127 /dev/%k"
~~~

## Ma config desktop
~~~shell
apt install bash-completion vim
apt remove nano
apt install gnome-shell gnome-terminal
apt install cifs-utils npt
apt install gimp firefox thunar gedit blender gimage-reader
apt install lutris
apt install git openjdk-17-jdk openjdk-17-source7
apt remove firefox-esr
apt remove gnome-software
~~~
