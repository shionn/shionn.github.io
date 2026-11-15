
Je vous présente aujourd'hui comment faire un paquet pour Debian. C'est ainsi que je m'y prends pour le projet [Debian Orphanage](2026/orphanage.html) qu'on a vu précédemment. 

# Préparer la structure de dossier

Il faut créer un dossier, ce dossier correspondra au `/` quand le paquet sera installé sur l'PC. À ce dossier il faut ajouter un fichier DEBIAN/control qu'on verra plus tard. On peut aussi adjoindre un fichier copyright. Prenons en exemple le cas de mon paquet pour Godot 4. 

~~~shell
godot4-4.7.2/
├── DEBIAN/
│   ├── control        # les métadonnées du paquet
│   ├── copyright      # les licences
└── usr/
    ├── bin/
    │   └── godot4     # lien symbolique vers ../../share/godot4/Godot_v4.7.2-stable_linux.x86_64 
    └── share/
        ├── godot4/    # dossier contenant les fichiers de godot
        |   ├── Godot_v4.7.2-stable_linux.x86_64
        |   └── icon.svg
        └── applications
            └── Godot4.desktop 
~~~

# Remplir DEBIAN

## `DEBIAN/control`

Le fichier `control` est le cœur du paquet : il décrit ce que le paquet est et ce dont il a besoin. Chaque champ est important. 
Voici comment je le remplis pour Godot4.

~~~shell
Source: godot4
Section: devel
Priority: optional
Maintainer: Shionn<shionn@gmail.com>
Homepage: https://godotengine.org/fr/
Package: godot4
Version: 4.7.2
Architecture: amd64
Depends: 
Description: Développez vos jeux en 2D et 3D, des projets cross-plateformes...
~~~

Voici le détail de chaque champ :

- **`Package`** : nom unique du paquet.
- **`Version`** : version du paquet X.Y.Z.
- **`Section`** : catégorie du paquet dans les dépôts (`utils`, `devel`, `games`, `graphics`, `misc`, ...).
- **`Priority`** : importance relative (`essential`, `important`, `optional`).
- **`Architecture`** : architecture ciblée (`amd64`, `all` pour les paquets indépendants de l'architecture).
- **`Maintainer`** : email du maintainer. C'est l'auteur du paquet, pas l'auteur du programme.
- **`Depends`** : liste des paquets requis pour fonctionner. Plusieurs valeurs sont séparées par des virgules. Un champ vide (`Depends: `) signifie « n'a besoin de rien ».
- **`Description`** : description du paquet.
- **`Homepage`** : site officiel du projet.

## `DEBIAN/copyright`

La plupart des paquets Debian doivent inclure un fichier `copyright` décrivant les licences. Voici comment je le remplis pour Godot4.

~~~shell
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/
Upstream-Name: godot4
Source: https://github.com/godotengine/godot/tree/4.7.2-stable
Files: *
Copyright: 2014-present Godot Engine contributors
Licence: MIT License
~~~

- **`Format`** : référence le format officiel Debian.
- **`Upstream-Name`** : nom du projet en amont.
- **`Source`** : lien vers le dépôt source et le tag correspondant au build.
- **`Files`** : quelles sections de copyright s'appliquent auxquels fichiers (`*` pour tous).
- **`Copyright`** : qui détient les droits.
- **`Licence`** : le texte de la licence (MIT, GNU GPL v3, ...).

## Build

Une fois le dossier prêt, on le compresse en `.deb` avec `dpkg` :

```bash
dpkg-deb --build godot4-4.7.2
```

Le résultat, `godot4-4.7.2.deb`, peut alors être installé avec `sudo apt install ./godot4-4.7.2.deb` ou déposé dans un dépôt.

# Conclusion

Ce n'est pas si difficile de construire un paquet. Nous verrons dans un prochain article comme créer et hébergé un dépôt avec Reprepro.