
J'ai eu besoin de faire un bot discord, car les bots gratuit fonctionnaient très mal.

# Créer votre bot : 

Rendez vous à cette URL : [https://discordapp.com/developers/applications](https://discordapp.com/developers/applications). 
Puis créervotre bot en clinquant sur le bouton __New Application__.

[gallery]
pictures/code/java/discord-bot/creation-application.png
[/gallery]

## Configuration du bot

Dans l'onglet __General information__ vous trouverez l' __Application ID__ cela servira pour inviter votre bot à un serveur. 

[gallery]
pictures/code/java/discord-bot/application-id.png
[/gallery]

Dans l'onglet __Bot__ vous pouvez générer le __Token__ de connexion. Noter ce token servira dans le code pour l'authentification.

[gallery]
pictures/code/java/discord-bot/token.png
[/gallery]

## Inviter votre bot à votre serveur

Il vous faut définir les permissions, dans l'onglet __Bot__ cocher les droit dont vous avez besoin : 

[gallery]
pictures/code/java/discord-bot/permission.png
[/gallery]

Puis vous pouvez faire votre propre lien d'invitation comme cela, il faut que ce lien soit donner au propriétaire du discord dont vous voulez que le bot rejoigne. 
Dans mon exemple je dois remplacer l'APPLCATION_ID et les PERMISSION décrite précédemment : 

~~~shell
https://discordapp.com/oauth2/authorize?&client_id=APPLICATION_ID&scope=bot&permissions=PERMISSION
~~~

# Code Java

## Dependance maven 

Voici la dépendance maven pour votre programme

~~~xml
<dependency>
    <groupId>net.dv8tion</groupId>
    <artifactId>JDA</artifactId>
    <version>5.2.2</version>
</dependency>
~~~

## Connecter le bot 

~~~java
JDA Builder builder = JDABuilder.create(TOKEN); // insérer ici le token vu précédemment. 
builder.addEventListener(new ListenerAdapter() {
    // implementer les méthodes que vous voulez
})
JDA jda = builder.build().awaitReady();
~~~

## Envoyer un message

Il faut d'abord trouver le canal que vous voulez rejoindre, la solution la plus simple est je trouve d'utiliser l'identifiant du canal. 

Pour cela j'ajoute cela au bot : 

~~~java
jda.getTextChannels().stream().forEach(System.out::println);
~~~

Et on va avoir quelque chose comme cela : 

~~~
TextChannel:NOM_DU_CANAL(id=ID_DU_CANAL)
~~~

Ensuite on peu envoyer un message dans ce canal : 

~~~java
TextChannel channel = jda.getTextChannelById(ID_DU_CANAL);
channel.sendMessage("Hello World !");
~~~

## Lire l'historique des messages

Pour mon bot j'ai eu besoin d'avoir accès à l'historique des messages pour savoir si j'avais déjà envoyé un message. 
Si on veux avoir le contenu du message il faut ajouter des options dans la configuration du bot. 
Il faut mettre à jour le lien d'invitation et réinviter le bot si il a déjà été invité : 

[gallery]
pictures/code/java/discord-bot/permission-message-1.png
pictures/code/java/discord-bot/permission-message-2.png
[/gallery]

Attention si vous voulez que votre bot rejoigne plus d'un certain nombre de serveur il vous faudra le faire vérifier.

Ensuite il faut modifier le code ainsi :

~~~java
// création du bot, ajouter l'indent : 
JDA Builder builder = JDABuilder.create(TOKEN, Arrays.asList(GatewayIntent.MESSAGE_CONTENT));

// lecture des messages
channel.getHistory().retrievePast(NB_MESSAGE).queue(history -> {
    history.stream().forEach(m -> System.out.println(m.getContentRaw()));
});
~~~

# Source

J'ai été aidé par ce tuto pour faire mon bot.

- https://blog.jaaj.dev/2020/03/19/Cr%C3%A9er-votre-bot-discord.html
