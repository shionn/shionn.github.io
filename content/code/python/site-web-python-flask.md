
Pendant l'été 2025 j'ai aider la commu discord de (STEvE)[https://www.youtube.com/channel/UCzhfRQKiMlcRR-xFh-jvDeQ] 
à faire un bot pour discord avec une interface web avec Flask. Je ne suis pas un dev python experimenté, 
je suis débutant en python donc je pense que j'ai pas tous fait dans les regle de l'art.

## Environnement Python

Installer les dépendances 

~~~bash
pyhton3, pyhton3-pip, python3-venv
~~~

C'est mon tous premier tuto avec python, aussi voici comment configurer un environnement de dev. 
Creer un dossier qui contiendra votre dossier, pour cet exemple `FlaskBlogExemple`. 

Python, niveau version et dépendance c'est pas mal de la merde. 
Il est poréférable de creer ce qu'on appel un *venv* 
c'est à dire comme un genre d'envirronement python local dans lequel on installe 
les dfépendences de notre projet et on ne touche pas au lib du python du system. 

Pour cela dans le dossier du projet, entrer cette commande, 
ca crais un dossier dans lequel s'install les dependances pythons avec les strict d'activation utile.
J'aime faire ce dossier caché, mais rien ne vous y oblige. 

~~~bash
python3 -m venv .venv
~~~

Puis il faut activer l'envirronement, pour cela entrer la commande suivante. 
Cela va changer votre invite de commance en passant de cela `user@host:path$` à cela `(.venv) user@host:path$`.

~~~bash
source .venv/bin/activate
~~~

## Dépendance

Dans le dossier de votre projet, creer un fichier `requirements.txt` et dedans ajouter les lignes : 

~~~
flask
flask-sqlalchemy
waitress
~~~

Puis dans le dossier du projet, avec le venv d'activer, faites cela pour installer les dépendances en locales :

~~~bash
pip install -r requirements.txt
~~~

## Préparation des répertoires






sqlitebrowser