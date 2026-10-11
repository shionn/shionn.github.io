# AGENTS.md

## Correction des fautes de français

Quand on me demande de corriger les fautes de français, ignorer les lignes situées entre les balises `[gallery]` et `[/gallery]`.

## Liens Markdown

Quand on corrige les fautes de français dans un fichier Markdown, ne pas supprimer les cibles des liens internes de type `[texte](chemin.html)` : le texte affiché peut être corrigé (accents, accord), mais la cible `](chemin.html)` doit être conservée telle quelle. Ne **pas** vérifier l'existence du fichier `.html` cible sur le disque : le compilateur le génère dynamiquement (voir « Fonctionnement du site »).

## Sens des corrections

Quand on corrige une faute (orthographe, grammaire, ponctuation, style), ne pas modifier le sens du texte : se limiter à la correction demandée, sans réécrire, résumer, reformuler ou ajouter du contenu.

## Correction du titre dans le .json

Quand on corrige les fautes de français dans un fichier `.md`, corriger également les fautes dans le champ `title` du fichier `.json` qui l'accompagne : mêmes règles d'orthographe, de grammaire, d'accents et d'accords. Ne pas modifier le `.json` d'un article non publié.


## Mise à jour de la date

Après avoir corrigé les fautes de français dans les fichiers `.md`, ajouter la date du jour dans le champ `updated` du `.json` qui l'accompagne (format tableau de dates, ex. `["2026/10/11"]`). Opération automatique, mais **uniquement** si l'article est publié : le champ `date` du `.json` est renseigné ET le champ `published` vaut `true`. Ne jamais modifier le `.json` d'un article non publié.

## Taille du contexte

Sois attentif à la taille maximale de ton contexte (150k tokens). Privilégier les lectures ciblées (sections de fichiers, `grep`) aux lectures entières, et éviter les allers-retours redondants qui alourdissent inutilement l'historique.

## Fonctionnement du site (compilation .md → .html)

Les fichiers `.md` ne sont **pas** les pages web : ils sont compilés par un outil qui génère dynamiquement un fichier `.html` dans `content/<année de l'article>/` (ex. `content/2025/armee-gloomspite-gitz.html`). Ces fichiers `.html` n'existent donc **pas** à l'état source.

Conséquences :
- Ne **pas** vérifier qu'une cible de lien `[texte](chemin.html)` pointe vers un fichier `.html` présent sur le disque : c'est le compilateur qui le crée. Un lien vers `content/<année>/...html` qui n'existe pas encore à la recherche est **normal et correct** — ne pas le modifier ni le signaler.
- Se limiter aux corrections demandées (fautes de français, titre dans le `.json`, date dans `updated`). Ne pas explorer le site pour « trouver » des pages manquantes.



