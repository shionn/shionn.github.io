
## 


###

apt install aptly

creer une  structure de donnée pour vos  : 

repo
 |--- stable
 |--- unstable


et par exemple pour discord qui fournit des packet pour la version stable metter le dossier stable : 

wget --trust-server-names -P repo/stable https://discord.com/api/download/stable?platform=linux&format=deb




## Source

Je me suis aider de ces sources : 
- https://une-tasse-de.cafe/blog/creer-repo-debian/
