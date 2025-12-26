
Dans ce tuto je vais essayé de vous montrer comment créer un chat bot en python pour twitch.

# Procedure configuration de Twitch

Rendez vous sur [la console d'application twitch](https://dev.twitch.tv/console) et ajouter une application. Renseigner :
- url de redirection : https://twitchtokengenerator.com
- catégorie : Chat Bot

[gallery]
/pictures/code/python/twitch/02.jpg
[/gallery]

Creer le bot. Puis de retour à la liste, editer le en cliquant sur Gérer. 
Puis cliquer sur **Nouveau Secret**. Vous trouvez ici le **Client ID** et **Client Secret**.

[gallery]
/pictures/code/python/twitch/03.jpg
[/gallery]

Ensuite rendez vous sur [twitchtokengenerator.com](https://twitchtokengenerator.com/) et selectionner 
**Custum Scope Target**. Dans la section **Use My Client Secret and Client ID**, renseigner les deux champs.

[gallery]
/pictures/code/python/twitch/04.jpg
[/gallery]

Ensuite dans la section **Available Token Scopes**, cocher *chat:read* et *chat:edit*.
Puis, dans la même section, cliquer sur **Generate token**.

[gallery]
/pictures/code/python/twitch/05.jpg
[/gallery]

Suivez la procédure et vous avez votre **Access Token** et **Refresh Token**.

[gallery]
/pictures/code/python/twitch/06.jpg
[/gallery]

# Code

J'utilise la lib python [twitchAPI](https://pypi.org/project/twitchAPI/). 

~~~shell
pip install twitchAPI
~~~

Je passe pas trop de temps sur le code c'est surtout les clefs d'api qui sont chiante à avoir. 

~~~python
import asyncio

from twitchAPI.twitch import Twitch
from twitchAPI.type import AuthScope, ChatEvent
from twitchAPI.chat import Chat, ChatEvent, ChatMessage, EventData


CLIENT_ID='<Votre Client ID>'
CLIENT_SECRET='<Votre Client Secret>'
ACCESS_TOKEN='<Votre Access Token>'
REFRESH_TOKEN='<Votre Refresh Token>'

SCOPES = [AuthScope.CHAT_READ, AuthScope.CHAT_EDIT]

CHANNEL='#<Canal twitch à rejoindre>'

async def on_ready(ready_event: EventData):
	print('Le bot est connecté au chat')
	await ready_event.chat.join_room(CHANNEL)

async def on_message(msg: ChatMessage):
	print(f'{msg.user.name} dis: {msg.text}')

async def hello_command(cmd: ChatMessage):
	await cmd.reply(f'Bonjour {cmd.user.name}')

async def start() : 
	twitch = await Twitch(CLIENT_ID, CLIENT_SECRET)
	await twitch.set_user_authentication(ACCESS_TOKEN, SCOPES, REFRESH_TOKEN)
	chat = await Chat(twitch)
	chat.register_event(ChatEvent.READY, on_ready)
	chat.register_event(ChatEvent.MESSAGE, on_message)
	chat.register_command('hello', hello_command)
	chat.start()

if __name__ == "__main__":
	asyncio.run(start())
~~~

# Ressources

- [https://pypi.org/project/twitchAPI](https://pypi.org/project/twitchAPI)
- [https://twitchtokengenerator.com](https://twitchtokengenerator.com)



