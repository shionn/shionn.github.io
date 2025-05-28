
J'adore les mini pc professionnels. Tout particulièrement les Lenovo Thinkcenter. J'en possédais déjà deux, puis un jour je suis tombé sur une vidéo de [ETG Gear](https://www.youtube.com/watch?v=jrzvkyytwts) qui rentre une RX6400 dans un M720Q.

## Les composants

Je commence par faire des recherches sur ce que je veux. Idéalement je cherche un Lenovo M720Q ou M920Q ou M70Q avec au moins un I5. La quantité de ram ou de disque m'importe peu. Je prendrais dans mon stock si il n’y en as pas assez.

Puis une RX6400, je cherche d'occasion. J'ai pas de modèle de préférence, mais il me faut du simple slot en low profile. Spoiler je n'ai strictement rien trouvé sur le marché de l'occasion.

Je sais qu'il me faudra aussi un riser spécifique pour adapter le connecteur pci-e du lenovo vers ma carte graphique, facile ça se trouve sur aliexpress.

### Un M720Q

Le M720Q peut être équipé de processeur intel de 8ème ou 9ème génération avec un TDP de maximum 35W. Il possède un port NVME, un berceau pour un disque de 2.5", 2 emplacement mémoire sodimm. Ce modèle possède également un port pci-e 8x en 3.0. Ce port est à un format spécifique et demande un adaptateur particulier. Donc malheureusement ce port bridera la RX6400 qui est pci-e 4x mais en 4.0.

Donc comme à mon habitude j'ai squatté leboncoin à la recherche d'un lenovo jusqu'à trouver le modèle qui me convenait avec un prix correcte et j'ai fini par trouver cette configuration :

- M720Q
- CPU I5 8400T
- 16go (2x8) de ram
- NVME de 256Go
- SSD de 256Go (bonus agréable)
- Brique d'alimentation de 90W
- Pour 120 €

[gallery w=200 h=200]
pictures/linux/m720q-rx6400/01.jpg
pictures/linux/m720q-rx6400/02.jpg
pictures/linux/m720q-rx6400/03.jpg
pictures/linux/m720q-rx6400/04.jpg
pictures/linux/m720q-rx6400/05.jpg
[/gallery]

### Une RX 6400

J'avais pas de modèle de préférence. Aussi grâce à un bon plan j’ai réussi à me procurer une RX6400 de Sapphire neuve pour 89 €.

[gallery w=400 h=200]
pictures/linux/m720q-rx6400/09.jpg
[/gallery]

### Truc en plus

A cela j'ai ajouté deux babioles. Une plaque qui aide à refroidir le chipset de la carte mère. Mais aussi un adaptateur pci-e car le connecteur pci-e du m720q est à un format particulier. J'ai trouvé ces deux truc sur aliexpresse pour 15 €

[gallery w=200 h=200]
pictures/linux/m720q-rx6400/06.jpg
pictures/linux/m720q-rx6400/15.jpg
[/gallery]

## Assemblage

### Amélioration du M720Q

Pour améliorer le refroidissement du chipset j'ajoute ce radiateur acheter sur Aliexpress. Il est fourni avec ces vis de fixation et des pads thermique déjà installé.

[gallery w=200 h=200]
pictures/linux/m720q-rx6400/07.jpg
pictures/linux/m720q-rx6400/08.jpg
[/gallery]

### Echec de la RX6400

Je dois bien évidemment retirer le SSD car ma carte graphique ira s'y loger.

Et là c'est le drame. Sur le net j'avais vu des projets avec les modèles RX6400 de chez XFX ou asrock. Et moi j'ai une Sapphire! Et le radiateur de celui-ci est trop grand et du coup la carte graphique ne rentre pas !

[gallery w=300 h=200]
pictures/linux/m720q-rx6400/10.jpg
[/gallery]

Mais en retirant l'antenne du bluetooth, ça passe. Et peut-être que je trouverai une solution pour mettre l'antenne ailleurs.

Ensuite j'ai trouvé et adapté un model 3D de [ITG Gear](https://www.printables.com/model/1053116-lenovo-m920qm720q-xfx-rx-6400-ventilation-3d-case) qui permet de remplacer le bracket de la RX6400 pour l'inserer dans le boitier. J'ai du le modifier pas mal pour que ça rentre correctement.

[gallery w=250 h=200]
pictures/linux/m720q-rx6400/11.jpg
pictures/linux/m720q-rx6400/12.jpg
pictures/linux/m720q-rx6400/13.jpg
pictures/linux/m720q-rx6400/14.jpg
[/gallery]

## Modelisation d'un boitier

Malheureusement les ressources que j'ai trouvé sur le net, n'étaient pas du tout adaptées, ca forcait sur la carte et j'aimais pas du tout. Donc j'ai eu l'idée de faire un boîtier avec un trou ou tout le radiateur de la carte ressortirait par ce trou.

J'ai utilisé openscad pour modéliser le boîtier. Je ne connaissais pas cet outil, c'était la première fois que je m'en servais. J'adore le concept, on doit coder la forme que l'on veut. Les modèles que j'ai utilisé sont disponible à la fin de l'article.

[gallery w=350 h=200]
pictures/linux/m720q-rx6400/16.png
[/gallery]

// a partir de la j'ai pas corriger l'orthographe

## Benchmark

J'ai commencer par installer "bazzite". J'ai immediatement detesté. J'ai donc vite remis une debian et j'ai mon installation habituel. Bien évidement je ne cherche pas à lancé des jeu en 4k. Je me focalise sur le 1080p.

[table cols="Jeu,Profil,Fps"] 
Cyberpunk 2077	Low	44
Horizon Zero Dawn	Original	31
Shadow of the Tomb Raider	Very Low	57
[/table]

[gallery w=350 h=200]
pictures/linux/m720q-rx6400/17.png
pictures/linux/m720q-rx6400/18.png
pictures/linux/m720q-rx6400/19.png
[/gallery]


Autre cas que j'ai testé sans benchmark : 
- Hogward Legacy : injouable moins de 5fps, meme en low avec un upscaling depuis le 720p.
-  : 20fps chute a 10 en detail minimal avec un upscaling depuis le 720p.

Pourtant de ce que j'ai vu sur le net, cette RX6400 est capable de mieux. Notement dans les %low, j'en conclu que la limitation du pci-e 3.0 4X est trop importante, il faudrait donc au moins du 3.0 en 8x ou du 4.0 en 4x.

## Conclusion 

Franchement j'ai aimé construire ce pc. Comme j'ai dis j'adore ce type d'ordinateur. J'avais besoin 

Si vous voulez faire pareil, ne faites pas comme moi, ne prenez pas une Sapphire, 
mais priviligier la XFX ou Asorck.

Grâce à ce projet j'ai aussi découvert [OpenScad](https://openscad.org/) et j'adore. 

### Cout

[table cols="Produit,Cout"]
Lenovo	120 €
RX 6400	89 €
Radiateur chipset	7 €
Riser	8 €
3D print	Trop de temps
Total	224 €
[/table]

### Ressources

Vous trouverez toute les ressource que j'ai utilisé sur ce [github](https://github.com/shionn/LenovoM720Q)
