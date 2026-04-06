
deb https://ppa.launchpadcontent.net/kisak/kisak-mesa/ubuntu plucky main 
deb-src https://ppa.launchpadcontent.net/kisak/kisak-mesa/ubuntu plucky main 

telecharger ca : https://keyserver.ubuntu.com/pks/lookup?op=get&search=0xeb8b81e14da65431d7504ea8f63f0f2b90935439

sudo gpg --dearmor -o /usr/share/keyrings/kisak-mesa.gpg eb8b81e14da65431d7504ea8f63f0f2b90935439.asc


et remodifier les source : 

deb [signed-by=/usr/share/keyrings/kisak-mesa.gpg] https://ppa.launchpadcontent.net/kisak/kisak-mesa/ubuntu plucky main 
deb-src [signed-by=/usr/share/keyrings/kisak-mesa.gpg] https://ppa.launchpadcontent.net/kisak/kisak-mesa/ubuntu plucky main 











activer depot contrib et non-free

sudo apt install software-properties-common 




Autre source : 

https://linuxconfig.org/install-packages-from-an-ubuntu-ppa-on-debian-linux

https://note.mowlabs.ovh/workspace/32944895-5f28-4800-b6fb-7d4bc11efe07/uUN-iBWuUeNY5j9ClJfup

https://fr.ubunlog.com/comment-ajouter-des-r%C3%A9f%C3%A9rentiels-ppa-%C3%A0-Debian-et-des-distributions-bas%C3%A9es-sur-celui-ci/
