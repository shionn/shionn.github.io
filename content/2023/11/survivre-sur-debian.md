Voici ma petite liste de truc est astuce sur debian.

## Outils
### Pavucontrol
Outil pour mieux controller les peripheriques audio

## Configuration
### Vim
#### Desactiver le mode visual
echo "set mouse-=a" >> ~/.vimrc

#### Pas de coloration syntaxique
Ajouter "syntax on" au ~/.vimrc

### Desactiver pasword apres sleep
installer dconf-editor
/org/gnome/desktop/screensaver lock-enable > false

## Jeux
### Jeux comme au ralenti (Horizon Zero Dawn)
Ajouter l'option **tsc=reliable** aux noyeau

### Son qui sature (Horizon Zero Dawn)
ajouter **PULSE_LATENCY_MSEC=60 DRI_PRIME=1** à la commande de lancement

### Utilitaire
- Mangohud
- Gamemoderun

## Steam Deck
### Calibrer les joystick
thumbstick_cal

## Erreur
### Eclipse erreur ouverture markdown
Cannot display wiki markup preview: No more handles because there is no underlying browser available. Please ensure that WebKit with its GTK 3.x bindings is installed (WebKit2 API level is preferred). Additionally, please note that GTK4 does not currently have Browser support.  No more handles because there is no underlying browser available. Please ensure that WebKit with its GTK 3.x bindings is installed (WebKit2 API level is preferred). Additionally, please note that GTK4 does not currently have Browser support.

sudo apt install libwebkit2gtk-4.0-37

## Seveur
### Tomcat
dossier contenant le deploement ROOT a changer le droit
/var/lib/tomcat10/webapps#

changer le port dans : /etc/tomcat10/server.xml
