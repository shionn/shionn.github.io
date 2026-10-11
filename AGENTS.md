# AGENTS.md

## Correction des fautes de français

Quand on me demande de corriger les fautes de français, ignorer les lignes situées entre les balises `[gallery]` et `[/gallery]`.

## Liens Markdown

Quand on corrige les fautes de français dans un fichier Markdown, ne pas supprimer les cibles des liens internes de type `[texte](chemin.html)` : le texte affiché peut être corrigé (accents, accord), mais la cible `](chemin.html)` doit être conservée telle quelle. Vérifier que le chemin du lien pointe bien vers une page HTML existante avant de le remettre.

## Sens des corrections

Quand on corrige une faute (orthographe, grammaire, ponctuation, style), ne pas modifier le sens du texte : se limiter à la correction demandée, sans réécrire, résumer, reformuler ou ajouter du contenu.

## Mise à jour de la date

Après avoir corrigé les fautes de français dans les fichiers `.md`, ajouter la date du jour dans le champ `updated` du `.json` qui l'accompagne (format tableau de dates, ex. `["2026/10/11"]`). Opération automatique, mais **uniquement** si l'article est publié : le champ `date` du `.json` est renseigné ET le champ `published` vaut `true`. Ne jamais modifier le `.json` d'un article non publié.

