
# Qu'est-ce qu'Orphanage ?

Orphanage est un **dépôt Debian personnalisé**. Ce Depo a pour but d'hebergé des paquets debian qui n'ont pas de dépot dedié. 
C'est comme un orphelinat pour ces paquets. Certain de ces paquets sont hebergé tel quel, comme debian, et d'autre sont packagé par moi-même, comme Godo4.

Le dépôt est hébergé sur github. [`https://shionn.github.io/Debian-Orphanage/`](https://shionn.github.io/Debian-Orphanage/).

# Ce que contient le dépôt

Le dépôt contient une quinzaine de paquets, pour l'instant mais d'autre viendrons. 

- `orphanage-keyring`	[Debian-Orphanage](https://github.com/shionn/Debian-Orphanage)
- `bc250-control-center`	[movacx/bc250-control-center](https://github.com/movacx/bc250-control-center)
- `discord`	[Discord](https://discord.com/)
- `faugus-launcher`	[Faugus/faugus-launcher](https://github.com/Faugus/faugus-launcher)
- `fluxer`	[Fluxer](https://fluxer.com)
- `freetube`	[FreeTubeApp/FreeTube](https://github.com/FreeTubeApp/FreeTube)
- `game-launcher`	[Game Launcher](https://github.com/shionn/GameLauncher)
- `ge-proton9/10/11`	[GloriousEggroll/proton-ge-custom](https://github.com/GloriousEggroll/proton-ge-custom)
- `godot4`	[Godot4](https://github.com/godotengine/godot)
- `heroic-games-launcher`	[Heroic-Games-Launcher/HeroicGamesLauncher](https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher)
- `hydra-launcher`	[hydralauncher/hydra](https://github.com/hydralauncher/hydra)
- `hyprshot`	[Hyprshot](https://github.com/Gustash/Hyprshot)
- `lib-hidapi-hotplug`	[OpenRGB/hidapi-hotplug](https://codeberg.org/OpenRGB/hidapi-hotplug)
- `openrgb`	[CalcProgrammer1/OpenRGB](https://github.com/CalcProgrammer1/OpenRGB)
- `recomp-launcher`	[Recomp Launcher](https://recomplauncher.com/)
- `umu-launcher`	[Open-Wine-Components](https://github.com/Open-Wine-Components/umu-launcher)

# L'utiliser chez soi via la version publique GitHub

Les prérequis sont une distribution Debian ou Ubuntu (architecture amd64).

## Ajouter le dépôt et la clé de signature.

Le dépôt public est signé en GPG. La clé de signature ainci que les sources sont fournie dans le paquet `orphanage-keyring`.

~~~bash
# Ajouter le dépôt (remplace `trixie` par ta release Debian/Ubuntu)
wget https://shionn.github.io/Debian-Orphanage/pool/main/o/orphanage-keyring/orphanage-keyring_1.0.4_all.deb
sudo apt install ./orphanage-keyring_1.0.4_all.deb
sudo apt update
~~~

## Installer les paquets souhaités

Une fois le dépôt ajouté, les paquets sont disponibles comme n'importe quel autre :

```bash
sudo apt install godot4
```
# Pour conclure

J'ai pris beaucoup de plaisir à faire ce dépot. Nous verrons dans des article futur comment creer un paquet debian et hebergé un dépot acvec reprepro.

