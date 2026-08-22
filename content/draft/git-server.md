
Faire un serveur git qui backup vos repo github regulierement :

# Installation des outil 

Installet une debian dans votre proxmox, puis dessus installer git.

~~~shell
apt install git
~~~

Préparer le dossier qui acceuillera vos repo git : 

~~~shell
mkdir /git
chown root:users /git
chmod 775 /git
~~~

# Creation de votre user

Creer votre utilisateur qui se connectera en git via ssh :

~~~shell
useradd -m -s /usr/bin/bash <votre user>
passwd <votre user> # puis saisser deux fois le mdp voulu
usermod -a -G users <votre user>
# depuis le client copier votre clef ssh
ssh-copy-id <votre user>@<votre serveur>
~~~

Ajouter également la clef à votre user qui vous sert d'access a github : 

~~~shell
scp ~.ssh/<partie privé> <votre user>@<votre serveur>:~/.ssh
scp ~.ssh/<partie public> <votre user>@<votre serveur>:~/.ssh
~~~


# cloner un repo github

~~~bash
git clone --recurse-submodule --mirror git@github.com/...
~~~


# pull automatique depuis git :

Dans /home/<votreuser>/update.sh :

~~~bash
#/bin/bash
cd /git

echo "start pull"
find /git -type d -name "*.git" -exec sh -c 'cd "{}" && echo "{}" && git fetch -p origin' \; 
echo "end pull"
~~~



Dans /etc/cron.daily/update-git (render le executable : `chmod +x /etc/cron.daily/update-git` ):

~~~ 
#!/bin/bash
sudo -u <votre user> /home/shionn/update.sh >> /root/update.log
~~~


