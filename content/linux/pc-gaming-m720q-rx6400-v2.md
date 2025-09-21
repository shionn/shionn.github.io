
Cette article est la suite de celui sur (Mon mini pc à 250 Brouzouff)[2025/pc-gaming-m720q-rx6400]. 

## Point sur la situation

Dans cette article je conclu que je suis déçu des performance, et je met en cause deux point potentiel : 
- le bus pci-e limité à 4x, en effet entre la RX6400 qui est en pcie-4.0x4 et le m720q en pcie-3.0, la bande passante restante est très limité. 
- le processeur qui monte peu en fréquence.

Et puis j'ai joué avec, surtout des vieux jeux, comme la série des **Batman Arkham**. Et j'en suis venu à la conclusion que ce n'était pas possible et que je ratais quelque chose. Certes le processeur n'est pas puissant, ni la carte graphique, mais d'après ce que m'affiche mangohud, le processeur comme la carte graphique était sous exploité. 

## Profile CPU

J'ai pour habitude de lancer mes jeux avec (gamemode de feral interactiv)[https://www.feralinteractive.com/fr/]. 
Bon ben j'ai l'impression que ca marche pas comme ca devrais. Aussi j'ai utilisé cpupower-gui j'ai changé le profil comme suit. 
Dans *Governor*, j'ai mis **Performance** à la place de **powersave** et dans *Energy preference* j'ai mis **performance** à la place de **balance performance**. 

[gallery w=180 h=200]
/pictures/linux/m720q-rx6400/22-cpu-governor-default.jpg
/pictures/linux/m720q-rx6400/22-cpu-governor-performance.jpg
[/gallery]

Et à ce moment magique, mon Batman est devenu fluide comme le montre les captures suivantes.
A gauche en mode **powersave** et à droite en mode **performance**.

[gallery w=300 h=170]
/pictures/linux/m720q-rx6400/23-batman-mangohud-powersave.jpg	En powersave, beaucoup de micro-saccade
/pictures/linux/m720q-rx6400/23-batman-mangohud-performance.jpg	En performance, fps bien plus stable
[/gallery]

## Bench

J'ai donc voulu refaire des benchs. 
Nous sommes sur une Debian 13, kernel 6.16.8, Mesa 25.0.7-2, Proton GE 10.15.

### Shadow of the Tomb Raider

Setup : 
- 1920x1080
- reglage sur Moyen
- sans anti-aliasing
- sans upscaling

[gallery w=300 h=170]
/pictures/linux/m720q-rx6400/24-sotr-reglage.jpg
/pictures/linux/m720q-rx6400/24-sotr-powersave.jpg	En powersave
/pictures/linux/m720q-rx6400/24-sotr-performance.jpg	En performance
[/gallery]


### Cyber punk

Setup :
- 1920x1080
- réglage sur Bas
- sans upscaling

[gallery w=300 h=170]
/pictures/linux/m720q-rx6400/25-cyberpunk-powersave.jpg	En powersave
/pictures/linux/m720q-rx6400/25-cyberpunk-performance.jpg	En performance
[/gallery]


Deuxième salve, cette fois avec le FSR upscaling et génération d'image :
- 1920x1080
- réglage sur Bas
- avec upscaling & generation d'image

[gallery w=300 h=170]
/pictures/linux/m720q-rx6400/26-cyberpunk-fsr-reglage.jpg
/pictures/linux/m720q-rx6400/26-cyberpunk-fsr-powersave.jpg	En powersave
/pictures/linux/m720q-rx6400/26-cyberpunk-fsr-performance.jpg	En performance
[/gallery]

Ces jeux sont bien trop gourmands pour cette configuration. 
Je vais passer sur des jeux plus ancien, 
Initialement cette configuration à été prévu pour ces jeux, dans l'optique de rattraper mon backlog. 

### Batman Arkam Origin

Setup :
- 1920x1080
- reglage max
- sans AA

[gallery w=300 h=170]
/pictures/linux/m720q-rx6400/27-batman-reglage.jpg
/pictures/linux/m720q-rx6400/27-batman-powersave.jpg	En Powersave
/pictures/linux/m720q-rx6400/27-batman-performance.jpg	En Performance
[/gallery]

Le benchmark ne montre pas la différence de stabilité de fps que montre Mangohud.

### Tomb raider (10)

Setup :
- 1920x1080
- réglage sur Normal
- version native

[gallery w=300 h=170]
/pictures/linux/m720q-rx6400/28-tombraider-native-reglage.jpg
/pictures/linux/m720q-rx6400/28-tombraider-native-powersave.jpg	En Powersave
/pictures/linux/m720q-rx6400/28-tombraider-native-performance.jpg	En Performance
[/gallery]

Je recommence mais avec en compatibilité Proton :
- 1920x1080
- réglage sur Normal
- version ProtonGE 10.15

[gallery w=300 h=170]
/pictures/linux/m720q-rx6400/29-tombraider-proton-reglage.jpg
/pictures/linux/m720q-rx6400/29-tombraider-proton-powersave.jpg	En Powersave
/pictures/linux/m720q-rx6400/29-tombraider-proton-performance.jpg	En Performance
[/gallery]

On note un énorme gain de performance entre la version native et la version proton.
Mais comment cela s'explique ? 
En réalité la version native n'est pas native, il s'agit d'une exécution via proton packagé par (Feral Interactiv)[https://www.feralinteractive.com/fr/].
Cette version du jeu n'a jamais été mise à jour, de fait entre cette vieille version de proton et la nouvelle, c'est le jour et la nuit. 

## Conclusion

En jeu je ressent un vrai écart de performance entre le mode **powersave** et **performance**, mais les benchmarks ne le montrent pas. 
Pire les benchmarks semble indiquer le contraire. 

Je n'en ai pas fini avec ce pc, dans un prochain article nous essaierons de lui mettre un plus gros processeur. 
Et qui sai peut être un jour une plus grosse carte graphique ? 
