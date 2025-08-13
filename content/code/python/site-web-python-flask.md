
Pendant l'été 2025 j'ai aider la commu discord de (STEvE)[https://www.youtube.com/channel/UCzhfRQKiMlcRR-xFh-jvDeQ] 
à faire un bot pour discord avec une interface web avec Flask. Je ne suis pas un dev python experimenté, 
je suis débutant en python donc je pense que j'ai pas tous fait dans les regle de l'art.

## Environnement Python

C'est mon tous premier tuto avec python, aussi voici comment configurer un environnement de dev. 
Creer un dossier qui contiendra votre dossier, pour cet exemple `FlaskBookTuto`. 

### Installer les dépendances

Sous debian, j'installe les dépendance suivante. 

~~~bash
apt install python3 python3-pip python3-venv
~~~

Je code avec vccode avec l'extenssion [ms-python.python](https://marketplace.visualstudio.com/items?itemName=ms-python.python). 
J'utilise sqlitebrowser si j'ai besoin de parcourir la bdd avec un outil.

### Environnement local python

Python, niveau version et dépendance c'est pas mal de la merde. 
Il est poréférable de creer ce qu'on appel un *venv* 
c'est à dire comme un genre d'envirronement python local dans lequel on installe 
les dépendences de notre projet et on ne touche pas au lib du python du system. 

Pour cela dans le dossier du projet, entrer cette commande, 
ca crais un dossier dans lequel s'install les dependances pythons avec les stript d'activation utile.
J'aime faire ce dossier caché que j'appel **.venv**, mais rien ne vous y oblige. 

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
# pour le site web
flask>=3.1
# pour la bdd
flask-sqlalchemy>=3.1
# pour le passage en production
waitress>=3.0
~~~

Puis dans le dossier du projet, avec le venv d'activer, faites cela pour installer les dépendances en locales :

~~~bash
pip install -r requirements.txt
~~~

## Code

Dans cette exemple, nous allons faire un site qui gere une bibliothe de livre (manga ou BD). 

Voici les fonctionnalité : 
- Afficher la liste des livres
- Ajouter une entrée
- Modifier et supprimer une entrée

### Organisation

~~~
FlaskBookTuto
|-- webapp
|   |-- __init__.py
|   |-- book.py    # cf partie BDD
|   |-- routes.py  # controller d'url
|   |-- static
|   |   |-- # contiendra css et icone
|   |
|   |-- templates
|   |   |-- # contiendra les html
|
|-- run.py
|-- schema.sql # contiendra la structure de la bdd
~~~

### Page d'acceuil

Pour l'instant nous allons faire un simple hello world.

~~~python
# fichier webapp/__init__.py
from flask import Flask

webapp = Flask(__name__)

import routes

# fichier webapp/routes.py
from webapp import webapp
from flask import render_template

@webapp.route('/')
def index():
	return render_template('index.html')

# fichier run.py
from webapp import webapp

if __name__ == '__main__':
	# l'option debug permer un rafraichissement à chaud
	webapp.run(debug=True)
~~~

Flask utilise jinja2 pour le templating html. 
Ici je propose de faire un fichier **template.html** qui contiendrais la structure générale du site 
et les fichiers html definirai uniquement ce qui change de page en page. 

Pour le CSS je vais utiliser un framework que j'aime particulierement [mvp.css](https://andybrewer.github.io/mvp/) que je vais mettre dans /webapp/static. 
J'ajoute aussi un favicon mais je ne m'attarde pas dessus.

~~~xml
<!-- fichier webapp/templates/template.html -->

<!DOCTYPE html>
<html color-mode="user">

<head>
	<meta charset="utf-8">
	<title>Flask webapp exemple by shionn</title>
	<link rel="stylesheet" href="/static/mvp.css" />
	<link rel="icon" href="/static/favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon">
</head>

<body>
	<header>
		<nav>
			<a href="/"><img src="/static/favicon.ico"></a>
			<ul>
				<li><a href="/">Livres</a></li>
				<li><a href="/add">Ajouter</a></li> <!-- on verra plus tard-->
			</ul>
		</nav>
	</header>
	<main>
		{% block content %}{% endblock %}
	</main>
	<footer>
		<hr>
	</footer>
</body>

<!-- fichier webapp/templates/index.html -->
{% extends "template.html" %}

{% block content %}
Hello World
{% endblock %}
~~~

Puis pour lancer le site, dans une console, dans le dossier de votre projet avec l'environnement virtuel d'activé :

~~~bash
python3 run.py
~~~

Et le site est disponible sur localhost:5000 :

[gallery]
pictures/code/python/flask/01.jpg
[/gallery]

### Et une bdd en sqlite

Ajoutons une connexion à une bdd SQLlite. Ici je vous propose cette table : 

~~~sql
-- fichier schema.sql
-- il est important que le fichier soit réentrant
CREATE TABLE IF NOT EXISTS `book` (
	id INTEGER PRIMARY KEY,
	name VARCHAR(200) NOT NULL
);
~~~

Puis nous allons initialiser la bdd, modifions le code python comme suit :

~~~python
##############################
# fichier webapp/__init__.py #
##############################
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

webapp = Flask(__name__)

webapp.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(webapp)

# initialisation de la BDD une fois que la webapp est lancer
# importer et executer le fichier schema.sql
with webapp.app_context():
	with open('schema.sql', 'r') as f:
		sql = f.read()
		connection = db.session.connection().connection
		try:
			cursor = connection.cursor()
			cursor.executescript(sql)
			cursor.close()
		finally:
			connection.close()

import routes

############################
# fichier webapp/models.py #
############################
from webapp import db

# SQLAlchemy permet de creer des objets qui représente les enregistrements en base
class Book(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(200))
~~~

Ensuite ajouter une nouvelle route **GET /add** qui ouvrira le formulaire et **POST /add** qui recevra la soumission du formulaire

~~~python
############################
# fichier webapp/routes.py #
############################
from flask import render_template, request, redirect, url_for

from webapp import webapp,db
from webapp.models import Book

@webapp.route('/')
def index():
	return render_template('index.html')

@webapp.route('/add')
def openAddBook():
	return render_template('add.html')

@webapp.route('/add', methods=['POST'])
def submitAddBook():
	book = Book(name=request.form.get('name'))
	db.session.add(book)
	db.session.commit()
	#url_for prend en parametre le nom de la methode
	return redirect(url_for('index'))

@webapp.route('/remove/<id>')
def removeBook(id):
	Book.query.filter_by(id=id).delete()
	db.session.commit()
	return redirect(url_for('index'))
~~~

Et les fichiers HTML qui en decoulent : 

~~~xml
<!-- fichier webapp/templates/index.html -->
{% extends "template.html" %}

{% block content %}
<table>
	<thead>
		<tr>
			<th>Nom</th>
			<th>#</th>
		</tr>
	</thead>
	<tbody>
		{% for book in books %}
		<tr>
			<td>{{book.name}}</td>
			<!-- noter l'ajout de l'id -->
			<td><a href="{{ url_for('removeBook', id = book.id)}}">Supprimer</a></td>
		</tr>
		{% endfor %}
	</tbody>
</table>
{% endblock %}

<!-- fichier webapp/templates/add.html -->
{% extends "template.html" %}

{% block content %}
<form action="{{ url_for('submitAddBook') }}" method="POST">
	<label for="name">Nom</label>
	<input name="name" type="text" />
	<input type="submit" value="Ajouter">
</form>
{% endblock %}
~~~

Ce qui donne ce résultat : 

[gallery w=300 h=190]
pictures/code/python/flask/02.jpg
pictures/code/python/flask/03.jpg
[/gallery]

### Passer en prod

Vous avez du voir un joli message au lancement du programme : 

~~~bash
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
~~~

En effet lors du passage en prod il faut utiliser **waitress** :

~~~python
##################
# fichier run.py #
##################
from webapp import webapp
from waitress import serve

if __name__ == '__main__':
	serve(webapp, host="0.0.0.0", port=80)
~~~

## Conclusion

Je voulais apprendre à faire un peu de python depuis un moment. 
J'espere que mon code ne fera pas mal aux yeux au expert du python, mais si vous l'êtes, que faites vous la ? 

Enfin si vous tombez sur ce tuto j'espere qu'il vous aidera

### ressource
- [le code sur github]()