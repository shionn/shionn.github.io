Voici ma petite liste de truc et astuce pour jouer sous Debian. 
Cette page se concentre sur l'aspect jeux vidéo.
Pour des astuces plus généraliste merci de [regarder cette page](2023/debian-general-help-kit.html).

# Installation

## Steam
Il faut ajouter les dépôts _non-free_ puis Ajouter des l'architecture i386, mettre à jour les depot puis installer steam :

~~~shell
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install steam
~~~

## Proton GE

Créer le dossier compatibilitytools.d dans steam si inexistant :

~~~shell
mkdir -p ~/.steam/debian-installation/compatibilitytools.d
~~~

Télécharger la dernière version [ici](https://github.com/GloriousEggroll/proton-ge-custom/releases).

Extraire l'archive

~~~shell
tar -xvf "la derniere archive".tar.gz -C ~/.steam/debian-installation/compatibilitytools.d/
~~~

## Lancer steam depuis TTY

~~~shell
gamescope -W 5120 -H 1440 -f -e --disable-color-management --mangoapp --adaptive-sync -- steam -tenfoot -steamos
~~~

# Nvidia

La procedure la plus simple pour installer les driver est je pense la méthode via extrepo

~~~shell
sudo apt install extrepo
sudo extrepo enable nvidia-cuda
sudo apt update
sudo apt install nvidia-open
~~~

## Connaitre la version du driver en fonction de la carte

Ne marche pas avec le extrepo, je ne sais pas pourquoi. 

~~~shell
sudo apt install nvidia-detect
nvidia-detect
~~~

# Steam Deck
Pour calibrer les joystick : `thumbstick_cal`

Pour unlock le system : `sudo steamos-readonly disable`

# Utilitaire

- Mangohud et Goverlay pour la config
- Gamemoderun
- Gamescope

## Mangohud qui marche pas parfois

installer mangohud:i386

~~~shell
apt install mangohud:i386
~~~

# Probleme sur certaine Jeu

## Cyberpunk qui block sur l'ecran titre 

~~~shell
WINEDLLOVERRIDES="winmm,version=n,b" %command% --launcher-skip
~~~

## Jeux comme au ralenti (Horizon Zero Dawn)

Ajouter l'option **tsc=reliable** aux noyaux.

## Son qui sature (Horizon Zero Dawn)

Ajouter ̀`PULSE_LATENCY_MSEC=60 DRI_PRIME=1` à la commande de lancement

## Son qui crack (station to station)

Confirmer les erreurs avec `pw-top`. puis dans /etc/pipewire/pipewire.conf.d/pipefire.conf :

~~~shell
echo "context.properties = {default.clock.min-quantum = 1024}" | sudo tee pipewire.conf 
~~~
[Source reddit](https://www.reddit.com/r/linux_gaming/comments/1gy347h/newbie_here_ive_tried_almost_all_fixes_theres/)

## Jeu qui crashe avec bcp de sacade (hogward legacy)

Parfois c'est du manque de nmap. 
Le jeux crash avec une erreur `MAPPING_ERROR: 0x0`. 
Faire un `cat /proc/sys/vm/max_map_count` et voir la valeur pour la doubler, dans mon cas 1048576. On double la valeur. 

Doubler la valeur de maniere temporaire : `sudo sysctl -w vm.max_map_count=2097152`

De maniere définitive : 

~~~shell
echo "vm.max_map_count=2097152" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
~~~

# Autre truc 

~~~shell
# Options de démarrage du noyau (à ajouter dans /etc/default/grub)
amdgpu.vm_fragment_size=9 amdgpu.vm_max_fragment_size=9 amdgpu.gttsize=1024 amdgpu.noretry=0
# Optiopn de lancement
RADV_PERFTEST=rt 
RADV_PERFTEST=rt,gpl 
RADV_FORCE_VRS=2 
RADV_FORCE_WAYLAND=1
DXVK_ASYNC=1 
WINE_LARGE_ADDRESS_AWARE=1 
WINE_HEAP_DELAY_FREE=1
~~~

[les variable de mesa](https://docs.mesa3d.org/envvars.html)



