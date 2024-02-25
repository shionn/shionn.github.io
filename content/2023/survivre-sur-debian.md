Voici ma petite liste de truc est astuce sur debian.

## Gnome
### Pavucontrol
Outil pour mieux controller les peripheriques audio

### ALT-F5 qui fait nimp
dans dconf-editor modifier la clef : `org.gnome.desktop.wm.keybindings`

### Desactiver pasword apres sleep
installer dconf-editor modifier la clef `/org/gnome/desktop/screensaver lock-enable` à false

## Configuration
### Vim
#### Desactiver le mode visual

~~~shell
echo "set mouse-=a" >> ~/.vimrc
~~~

#### Pas de coloration syntaxique

~~~shell
echo "syntax on" >> ~/.vimrc
~~~

## Jeux
### Jeux comme au ralenti (Horizon Zero Dawn)
Ajouter l'option **tsc=reliable** aux noyeau

### Son qui sature (Horizon Zero Dawn)
ajouter ̀`PULSE_LATENCY_MSEC=60 DRI_PRIME=1` à la commande de lancement

### Utilitaire
- Mangohud
- Gamemoderun

## Steam Deck
### Calibrer les joystick
thumbstick_cal

## Erreur
### Eclipse erreur ouverture markdown
Cannot display wiki markup preview: No more handles because there is no underlying browser available. Please ensure that WebKit with its GTK 3.x bindings is installed (WebKit2 API level is preferred). Additionally, please note that GTK4 does not currently have Browser support.  No more handles because there is no underlying browser available. Please ensure that WebKit with its GTK 3.x bindings is installed (WebKit2 API level is preferred). Additionally, please note that GTK4 does not currently have Browser support.

~~~shell
sudo apt install libwebkit2gtk-4.0-37
~~~

## Seveur
### Initialisation

Sur chacun de mes serveurs je commence par faire ca :

~~~shell
apt install bash-completion vim -y
echo "set mouse-=a" >> ~/.vimrc
echo "syntax on" >> ~/.vimrc
echo "alias ll=\"ls -l\"" >> ~/.bashrc
echo "alias la=\"ls -al\"" >> ~/.bashrc
~~~

### Tomcat
Quand je veux deployé dans ROOT Je dois changer les droit d'acces dans le dossier ROOT de `/var/lib/tomcat10/webapps`

Et si je veux qu'il reponde sur 80 dans le fichier : `/etc/tomcat10/server.xml`

