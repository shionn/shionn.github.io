
J'adore les mini pc professionel. Tous particulierement les Lenovos Thinkcenter. J'en possedais déjà deux. Et un jour je suis tomber sur une vidéo de [ETG Gear](https://www.youtube.com/watch?v=jrzvkyytwts) qui rentre une RX6400 dans un M720Q. 

## Les composants

Je commence par faire des recherches sur ce que je veux. Idéalement je cherches un lenovo M720Q ou M920Q ou M70Q avec au moins un I5. La quantité de ram ou de disque m'importe peu. Je prendrais dans mon stock. 

Puis une RX6400, je cherche d'occasion. J'ai pas de model de préférence, mais il me faut du simple slot en low profile. 

Je sais qu'il me faudra aussi un riser proprietaire adapter le connecteur pcie du lenovo vers ma carte graphique, facile ca se trouve sur aliexpress. 

### Un M720Q

Le M720Q peu être equiper de processeur intel de 8ieme ou 9ieme génération avec un TDP de maximum 35W. Il possede un port NVME, un berceau pour un disque de 2.5", 2 emplacement mémoire sodimm. Ce modele possede également un port pci-e 8x en 3.0. Ce port est a un format spécifique et demande un adaptateur particulier. Donc malhereusement ce port bridera la RX6400 qui est pci-e 4x mais en 4.0. 

Donc comme à mon habitude j'ai squaté leboncoin à la recherche d'un lenovo jusqu'à trouvé le modele qui me convenais avec un prix correcte et j'ai fini par trouver ce model avec une configuration qui me convenais. 

- M720Q
- CPU I5 8400T
- 16go (2x8) de ram
- nvme de 256Go
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

Je dois bien evidement retirer le SSD car ma carte graaphique ira s'y loger.

### Une RX 6400

J'avais pas de model de préférence. Aussi grâce à un bon plan j'arrive à me procurer une RX6400 de Sapphire neuve pour 89€. 

[gallery w=400 h=200]
pictures/linux/m720q-rx6400/09.jpg
[/gallery]

### Truc en plus

A cela j'ai ajouté deux babioles. Une plaque qui aide à refroidir le chipset de la carte mère. Mais aussi un adapteur pci-e car le connecter pci-e du m720q est à un format particulier. J'ai trouver ces deux truc sur aliexpresse pour 15 €

[gallery w=200 h=200]
pictures/linux/m720q-rx6400/06.jpg
pictures/linux/m720q-rx6400/15.jpg
[/gallery]

## Assemblage

### Amélioration du M720Q

Pour améliorer le refroidissement du chipset j'ai trouvé ce radiateur qu'on trouve sur Ali Express pour environ 7 EUR. Il est fourni avec ces vis de fication et des pads thermique déjà installé.

[gallery w=200 h=200]
pictures/linux/m720q-rx6400/07.jpg
pictures/linux/m720q-rx6400/08.jpg
[/gallery]

### Echec de la RX6400

Et la c'est le drâme. Sur le net j'avais vu des projet avec les modeles RX6400 de chez XFX ou asrock. Et moi j'ai une Sapphire! Et le radiateur de celui-ci est trop grand et du coup la carte graphique ne rentre pas !

[gallery w=300 h=200]
pictures/linux/m720q-rx6400/10.jpg
[/gallery]

Mais en retirant l'antenne du bleutouth, ca passe. Et peu etre que je trouverai une solution pour mettre l'antenne ailleurd. 

Ensuite j'ai trouvé et adapté un model 3D de [ITG Gear](https://www.printables.com/model/1053116-lenovo-m920qm720q-xfx-rx-6400-ventilation-3d-case) qui permet de remplacer le bracket de la RX6400 pour l'inserer dans le boitier. J'ai du le modifier pas mal pour que ca rentre correctement.

[gallery w=250 h=200]
pictures/linux/m720q-rx6400/11.jpg
pictures/linux/m720q-rx6400/12.jpg
pictures/linux/m720q-rx6400/13.jpg
pictures/linux/m720q-rx6400/14.jpg
[/gallery]


## Modelisation d'un boitier

Malheureusement les ressources que j'ai trouvé sur le net, n'etais pas du tous adapté, ca forcais sur la carte et j'aimais pas du tous. Donc j'ai eu l'idée de faire un boitier avec un trou ou tous le radiateur de la carte resortirai par ce trou.

J'ai utilisé openscad pour modélisé le boitier. Je ne connaissais pas cet outil c'etait la premiere fois que je m'en servais. J'adore le concepte, on dois coder la forme que l'on veux. Les modéles que j'ai uitilisé sont disponible à la fin de l'article.

[gallery w=350 h=200]
pictures/linux/m720q-rx6400/16.png
[/gallery]


## Benchmark

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
