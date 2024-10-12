

J'aime bien faire des bouts de code sur les Arduinos, il y a l'aspect des technologies récentes, 
mais surtout j'ai parfois l'agréable impression de coder sur de vieux ordinateur 8bit. 
Mais je n'aime pas utiliser l'éditeur officiel Arduino. 
Surtout qu'au final je travail rarement sur un arduino mais bien souvent sur d'autre board notamment les ESP.

# Installation de PlatformIO

## Installation de VSCode
Télé charger et installer VSCode disponible ici : https://code.visualstudio.com/

## Pré-requis
### Python
Il vous faut un environnement python 3 sur votre machine. Sous Debian il vous suffit d'installer python3-venv.
Pour les autres systèmes vous pouvez regarder sur la [documentation de PlatformIO](https://docs.platformio.org/en/latest/faq/install-python.html)

~~~shell
sudo apt install python3-venv
~~~

### Communication série
Il vous faut la possibilité d'utiliser les ports séries. Sous Dedian il vous faut vous ajouter au group __dialout__.

~~~shell
sudo usermod -a -G dialout $USER
~~~

Si cela ne suffit pas il faut aussi ajouter le group tty.

## Installation de l'extension PlatformIo
Dans les extensions de VSCode, recherche et installer "PlatformIO IDE".

// insertion image

## Autre extension

Venant d'éclipse j'aime bien l'extension : Eclipse Keymap

# Premier projet

## Création d'un projet

En ouvrant l'extension de PlatformIO vous accédez à l'interface de création de projet.
Il y a un nombre impressionnant de carte disponible. 

// insertion image

## Structure

La Structure d'un projet sous PlatformIO est un peu différent de celui d'un projet avec l'ide Arduino. 

~~~
Répertoire Racine 
|- plateformio.txt # un peu l'équivalent d'un pom.xml
|--src
|  |- main.c
|- lib
|  |--Foo
|  |  |- Foo.c
|  |  |- Foo.h
|  |--Bar
|  |  |--src
|  |     |- Bar.c
|  |     |- Bar.h
~~~

## Faire clignoter une diode 

Créer un projet et coller dans le fichier main ce code simple :

~~~cpp
#include <Arduino.h>

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
~~~

## Upload du code

Cliquer sur ce bouton et normalement la diode de votre carte clignotera : 
// inserer image

