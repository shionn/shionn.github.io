
Je vous propose aujourd'hui un tuto sur la mise en place d'un serveur nas avec des disques en ZFS. Je ne vous présente pas ZFS, je pense que vous connaissez les avantages de ce systeme. 
La solution que je vous propose ici c'est que la grappe de disque ZFS soit traiter par proxmox et qu'on crais un container **Turnkey** hyper leger dessus qui se charge de traiter vos partages sur votre reseau. 
Cette solution présente plusieurs avantage : 
- grape ZFS partageable entre plusieurs container
- utilisation des ressources plus leger
- container non priviligié
Mais en désavantage :
- La gestion des patrtage n'est pas des plus simple avec turnkey

## Container
### Création du pool 

inserer screen

### Création du container

Inserer screan :
- telechargement de turnkey
- création du container

### Partage du pool



### Mapping des Users (Optionnel)

Par defaut quand un disque est monté dans un container les id utilisateurs et groups ne sont pas les mêmes. Il faut ajouter 100000 à l'id de l'utisateur du guest pour avoir l'id de l'host. En gros pour simplifier `id guest=id host + 100 000`. 
Dans beaucoup de cas cela ne nous convient pas. Dans mon cas je souhaites que les id utilisateur soit le même. Dans mon cas je souhaites que les id superieur à 1000 soit les meme entre le guest et l'host.






## Source

* https://www.youtube.com/watch?si=uNb3HVNwdK8xJMQQ&v=I7nfSCNKeck&feature=youtu.be
* https://itsembedded.com/sysadmin/proxmox_bind_unprivileged_lxc/
