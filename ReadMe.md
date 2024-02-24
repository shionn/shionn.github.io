# Articles

Toutes les paires de fichier du même nom json et md represente un article de type `page` ou `post`. La page se différencie du `post` dans le fait qu'il n'apparait pas dans la page d'acceuil.

Un article peu avoir une `category` mais plusieurs `tag`.

metadata d'un article :

~~~
{
	type: "post", // ou page
	date: "yyyy/MM/dd",
	updated: "yyyy/MM/dd", // optionnel
	title: "Mon titre",
	logo: false,
	logoFolder: "dossier', // optionnel
	category: "Titre Categorie",
	tags: [ "Titre tag 1", ... ],
	js: [ liste fichier JS a ajouter à la page ], //optionnel (remplir scripts)
	published: true // false pour draft
}
~~~

# Rendu

Tous les appels de rendu se font sur le fichier `template.html` avec les objets `site` et `scripts`. Mais la variable `mode` qui change en fonction de ce qui est generé :
- page d'acceuil : `mode=index`
- page draft : `mode=draft`
- page de tag ou de category: `mode=group` avec la variable `group` qui est le tag ou la category.
- page d'un article : `mode=article` avec la varivbale `article`
- page 404 : `mode=404`

Structure de `site`
- `article` tous les de types publié ou non
	- `category` categorie de l'article
		- `is(Category|Tag)`
	- `tags` liste des tags de l'article (structure identique à `category`.
	- `logo` image de l'entete de l'article
	- `is(Post|Page)`
	- `title`
	- `shortContent` contenu formaté en HTML tronqué pour l'affichage dans la page d'acceuil
	- `fullContent` contenu formaté en HTML
	- `date`
	- `formatedDate` au format dd MMMM yyyy
	- `updateDate`
	- `formatedUpdateDate` au format dd MMMM yyyy
	- `author` pour l'instant une constante "shionn" à aajouter au metadata.

- `lastArticles` renvoie les derniers articles `post` pour l'affichage de la page d'acceuil.
- `drafts` renvoie les articles `post` non publié pour la génération de `draft.html`.

## Home page
Appel le rendu de `template.html` avec `mode=index` avec les objets `site` et `scripts`

## Article page ou post
Appel le rendu de `template.html` avec `mode=index` avec les objets `site` et `scripts`



# Extenssion Common Mark :

## gallery

exemple :

~~~
[gallery w=300 h=200]
path/to/img.jpg
another/img.jpg	right
[/gallery]
~~~

`w` et `h` sont les taille pour les apercus d'une image
`right`ou `left`ou `TODO` optionnel, domaine de valeur de l'attribut css `object-position` pour du contenu de la mignature.

rendu :

~~~
<div class="gallery">
	<a href="path/to/img.jpg"><img src="path/to/img.jpg" width="300" height="200"></a>
	<a href="path/to/img.jpg"><img src="another/img.jpg" width="300" height="200" style="object-position: right"></a>
</div>
~~~


## Table

exemple :

~~~
[table class="ma-classe-1, ma-classe-2" title="mon titre" cols="titre 1,titre 2"]
data 1	data 2
data 3	data 4
[/table]
~~~

rendu :

~~~
<table class="ma-classe-1, ma-classe-2">
	<thead>
		<tr>
			<th colspan="2">mon titre</th>
		</tr>
		<tr>
			<th>titre 1</th><th>titre 2</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>data 1</td><td>data 2</td>
		</tr>
		<tr>
			<td>data 3</td><td>data 4</td>
		</tr>
	</tbody>
</table>
~~~

