Pendant longtemps j'ai cherché à exécuter des scripts avant et/ou après la mise en veille de mon pc. 

Actuellement je m'en sers sur mon pc principal pour éteindre le RGB quand il rentre en veille, et le rallumer quand il sort de cette veille. 

# Comment qu'on fait

Si on fait un `man systemd-suspend.service` on y apprend que tous les exécutables 
dans __/usr/lib/systemd/system-sleep/__ sont exécuté avant et après une mise en veille avec deux argument :  

- 'pre' ou 'post' suivant si il rentre en veille ou si il en sort. 
- les types de mise en veille 'suspend' ou 'hibernate' ...

Donc on craies le dossier __/usr/lib/systemd/system-sleep/__ si il n'existe pas. 

Et maintenant on peu y faire notre script : 

~~~shell
#!/bin/bash
if [ "${1}" == "pre" ]; then
	echo "le pc passe en veille"
elif [ "${1}" == "post" ]; then
	echo "le pc sort de veille"
fi
~~~


