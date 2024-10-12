

# Instalation de PlatformIO

J'aime bien faire des bouts de code sur les Arduinos, il y a l'aspect des technologies recentes, mais j'ai parfois l'agréable impression de coder sur de vieux ordinateur 8bit. 
Mais je n'aime pas utiliser l'éditeur officiel Arduino. Surtout qu'au final je travail rarement sur un arduino mais bien souvent sur d'autre board notament les ESP.

## Instalation de VSCode
Télécharger et installer VSCode disponible ici : https://code.visualstudio.com/

## Prérequis
### Python
Il vous faut un envirronement python3 sur votre machine. Sous debian il vous suffit d'installer python3-venv.
Pour les autres system vous pouvez regarder du coder de la [documentation de PlatformIO](https://docs.platformio.org/en/latest/faq/install-python.html)

~~~shell
sudo apt install python3-venv
~~~

### Communication serie
Il vous faut la possibilité d'utilisé les ports series. Sous linux il vous faut vous ajouter au group __dialout__.

~~~shell
sudo usermod -a -G dialout $USER
~~~

Si ca ne suffit pas il faut aussi ajouter le group tty.

## Autre extention

Venant de eclipse j'aime bien l'extension : Eclipse Keymap

## Installation de l'extenssion PlatformIo
Dans les extensions de VSCode, recherche et installer "PlatformIO IDE".

// insertion image

# Premier projet

## Création d'un projet

En ouvrant l'extension de platformIO vous accedez à l'interface de création de projet. Il y a un nombre impressionant de board disponible. 

// insertion des board

## Structure

La Structure d'un projet sous platformio est un peu différent de celui d'un projet avec l'ide Arduino. 

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

## faire clignoter une led 

Creer un projet et coller dans le fichier main ce code simple :

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

## upload 

Clicker sur ce bouton : 

// inserer image

Et normalement la led de votre carte clignotera :)
