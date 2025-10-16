
J'ai toujours aimer les gestionnaires de fenêtre à base de tuile. 
Plus particulierement [Awesome-wm](https://awesomewm.org/). 
Et puis je me suis mis à joué sur linux, et avec l'avenamant de wayland, j'ai du abandonné awesome. 
Je me suis contenté d'un simple gnome-shell pendant très longtemps. 
Et finalement j'ai voulu tester HyprLand. 
Et ce fu le coup de foudre, mes vieux démons m'ont repris. 

## Hyprland et debian

Hyprland support [Arch](https://archlinux.org/) et [NixOs]([https://nixos.org/).
Debian propose une version dans sa branch sid (unstable).
Je l'ai donc utilsé, et tres vite je tombe sur des bugs qui semble corrigé depuis tres longtemps. 
Et je me suis rendu compte que le paquet proposé par debian avit plus de 1 ans de retard et plus de 10 version de retard.

### Compilation et repo

Je me suis lancer donc sur la construction d'un repo pour proposé des paquet compilé pour debian. 
Car quite à le faire pour moi autant le faire pour tous le monde. 

Je ne vais pas en parler plus ici, mais si ca vous interresse les scriptes pour la construction du repo sont [disponible ici](https://github.com/shionn/hypr-debian).
Voici comment l'installer :

~~~bash
wget https://shionn.github.io/hypr-debian/pool/main/h/hypr-debian-keyring/hypr-debian-keyring_1.0.0_all.deb
sudo apt install ./hypr-debian-keyring_1.0.0_all.deb
sudo apt update
sudo apt install hyprland
~~~

> Attention ce repo n'est pas compatible avec debian 13 Trixie. Il faut au moins debian 14 Forky.

## Ricing

Hyperland et ricing, ca va de paire. Voic ma configuration. 
J'essaie de faire au plus simple. 
J'ai repris la couleur du blog. 

> En gros le ricing, c'est l'art de custumiser son Envirronement de Bureau.

### Raccourci

J'ai repris mes raccourcis que j'utilisai sur Awesome. A savoir :

- &lt;Super&gt; &lt;Enter&gt; : shell, ici kitty
- &lt;Super&gt; C : kill
- &lt;Super&gt; &lt;Shift&gt; Q : exit HyprLand
- &lt;Super&gt; E : Nautilu
- &lt;Super&gt; V : Passer la fnêtre en flottante
- &lt;Super&gt; R : Ouverture du menu de commande
- &lt;Super&gt; F : Passer en fullscreen
- &lt;Super&gt; &lt;Left&gt; : Passer au workspace à gauche
- &lt;Super&gt; &lt;Right&gt; : Passer au workspace de droite
- &lt;Super&gt; &lt;Shift&gt; &lt;Left&gt; : Passer l'application active au workspace à gauche
- &lt;Super&gt; &lt;Shift&gt; &lt;Right&gt; : Passer l'application active au workspace de droite
- &lt;Super&gt; &lt;1..6&gt; : Passer au workspace 1..6
- &lt;Super&gt; &lt;Shift&gt; &lt;1..6&gt; : Passer l'application active au workspace 1..6
- &lt;Super&gt; &lt;Clic gauche&gt; : Déplacer une fenêtre
- &lt;Super&gt; &lt;Clic droit&gt; : Redimentionner une fenêtre

### Bar : Waybar

J'ai choisi d'utilise waybar qui semble être le plus basique. Rien de bien particulier à ce niveau. 

Mais je me suis amusé à mettre des icone pour chaque workspaces.

### Lanceur d'application : Wofi

Je n'ai pas réussi à le themé comme je voulais. 

### Notification : Mako

J'ai choisi de mettre les notifications en bas de l'écran, le clic sur la notification m'ammene sur le sujet de la notification. 
Mais pour cela il m'a falu ajouter une configuration à hyprland. `focus_on_activate = true`.



TODO 

Parler de :

- de ma configuration (avec une capture)
- mes racourcis
- waybar
- mako
 - focus :
- problematique gaming
 - comment je m'en sort pour le gaming en dual desktop
 - alternative tenfoot avec gamescope
- conclusion
 - ce que j'ai apris
 - pas pour le gaming













