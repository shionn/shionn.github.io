
J'ai toujours aimer les gestionnaires de fenêtre à base de tuile. 
Plus particulierement (Awesome-wm)[https://awesomewm.org/]. 
Et puis je me suis mis à joué linux, et avec l'avenamant de wayland, j'ai du abandonné awesome.

Je me suis contenté d'un simple gnome-shell pendant tres longtemps. 
Et finalement j'ai voulu tester HyprLand. Et ce vu le coup de foudre, mes vieux démons m'ont repris. 

## Hyprland et debian

Hyprland support (Arch)[https://archlinux.org/] et (NixOs)[https://nixos.org/].
Debian propose une version dans sa branch sid (unstable).
Je l'ai donc utilsé, et tres vite je tombe sur des bugs qui semble corrigé depuis tres longtemps.

### Compilation et repo

Je me lance dans la compilation et l'installation. 
Et quite à faire, j'ai packagé cela et j'en ai fait un repo. 
Ce repo est (disponible ici)[github.com/shionn/hypr-debian].

Voici comment l'installer :

~~~bash
wget https://shionn.github.io/hypr-debian/pool/main/h/hypr-debian-keyring/hypr-debian-keyring_1.0.0_all.deb
sudo apt install ./hypr-debian-keyring_1.0.0_all.deb
sudo apt update
sudo apt install hyprland
~~~

> Attention ce repo n'est pas compatible avec debian 13 Trixie. Il faut au moins debian 14 Forky.



TODO 

Parler de :

- du projet de compilation
- de la creation du repo
- de ma configuration (avec une capture)
-- mes racourcis
-- waybar
-- mako
-- focus :
- problematique gaming
-- comment je m'en sort pour le gaming en dual desktop
-- alternative tenfoot avec gamescope
- conclusion
-- ce que j'ai apris
-- pas pour le gaming













