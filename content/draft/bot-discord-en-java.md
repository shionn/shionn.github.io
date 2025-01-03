
J'ai eu besoin de faire un bot discord, car les bot gratuit fonctionnais très mal.

## Creer votre bot : 

Rendez vous à cette URL : https://discordapp.com/developers/applications. 
Puis creer votre bot en clicquant sur le bouton __New Application__.

TODO insertion image bouton

### Configuration du bot

Dans l'onglet __General information__ vous trouverez l' __Application ID__ cela servira pour inviter votre bot à un serveur. 

TODO insertion image

Dans l'onglet __Bot__ vous pouvez générer le __Token__ de connexion. Noter ce token il servira dans le code.

TODO insertion image

### Inviter votre bot à votre serveur

Il vous faut definir les permissions, dans l'onglet __Bot__ cocher les droit dont vous avez besoin : 

TODO insertion image

Puis vous pouver faire votre propre lien d'invitation comme cela, il fauit que ce lien soit donner au propriétaire du discord dont vous voulez que le bot rejoigne : 

~~~shell
https://discordapp.com/oauth2/authorize?&client_id=APPLICATION_ID&scope=bot&permissions=PERMISSION
~~~

## Code Java

### Dependance maven 

### Envoyer un message



## Source

J'ai été aider par ce tuto pour faire mon bot.

- https://blog.jaaj.dev/2020/03/19/Cr%C3%A9er-votre-bot-discord.html
