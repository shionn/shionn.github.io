
# Home assistant et MQTT

Aujourd'hui on va voir comment créer un objet connecté à votre serveur Home Assistant via MQTT à l'aide d'un simple ESP8266.

MQTT est un protocole pour les objets connectés très simple et relativement ancien, la première version de ce protocole datant de 99.
Ce protocole fonctionne sur le modèle de client et de broker. 
Le client s'abonne et publie à des sujets de messages auprès du broker.

Je ne vais pas traiter de l'installation de Home Assistant.

## Instalation de MQTT sur HA

Rendez-vous sur votre serveur HomeAssistant et allez dans `Paramètres > Apps > Installer l'application`.
Entrez MQTT dans la barre de recherche et sélectionnez `Mosquitto Broker` puis cliquez sur **Installer**.

[gallery w=350 h=215]
pictures/code/arduino/ha-01.jpg
pictures/code/arduino/ha-02.jpg
[/gallery]

Une fois l'installation faite, il a fallu que je redémarrer mon serveur pour que le broker soit réellement actif.

## Configuration

Retournez dans `Paramètres > Apps > Mosquitto MQTT > Configuration`, cliquez sur le bouton **Ajouter** en dessous de Logins.
Rentre les identifiants de votre choix, pour cet exemple je mets **mqtt-user / changeit**.

[gallery w=350 h=215]
pictures/code/arduino/ha-03.jpg
[/gallery]

# Une lampe sur ESP8266

Dans l'exemple suivant, je vais utiliser un ESP8266.
Je vais contrôler la LED embarquée via le serveur.
Pour une raison que j'ignore sur ma version de mon contrôleur, la LED s'allume sur l'état LOW et s'éteint sur l'état HIGH.

## Configuration du projet

J'utilise Visual Studio Code pour le développement Arduino. J'explique comment l'installer dans cet [article](2024/vs-code-arduino-platform-io.html).

Pour ce projet on va avoir besoin de la lib [home-assistant-integration](https://github.com/dawidchyrzynski/arduino-home-assistant).
Pour rappel on peut ajouter une lib à un projet en éditant le fichier `platformio.ini`.

~~~
lib_deps = dawidchyrzynski/home-assistant-integration@^2.1.0
~~~

## Connexion WiFi

J'explique plus en détail la connexion au Wi-Fi dans cet [article](2025/connexion-wifi-esp32.html).

~~~cpp
#include <Arduino.h>
#include <ESP8266WiFi.h>

#define SSID_NAME "<VOTRE_SSID>"
#define SSID_PASS "<VOTRE_PASS_WIFI>"
#define HOST_NAME "<NOM_D_HOTE_DE_VOTRE_CHOIX>"

WiFiClient client;

void initWifi() {
	WiFi.disconnect(true);
	WiFi.setHostname(HOST_NAME);
	WiFi.mode(WIFI_STA);
	WiFi.setAutoConnect(true);
	WiFi.setAutoReconnect(true);
	WiFi.begin(SSID_NAME, SSID_PASS);

	while (!WiFi.isConnected()) {
		Serial.print(".");
		delay(100);
	}
	Serial.println();
	Serial.print("Connected. Ip: ");
	Serial.println(WiFi.localIP().toString());

	// Je réutilise cette adresse MAC plus tard
	Serial.print("Connected. Mac: ");
	Serial.println(WiFi.macAddress());
}

void setup() {
	Serial.begin(9600);
	
	initWifi();
}

void loop() {

}
~~~

## Connexion au Broker MQTT

Pour vous connecter au broker MQTT.

~~~cpp
// Ajout de l'import
#include <ArduinoHA.h>

// j'utilise l'adresse MAC de l'ESP32, mais je sais pas du tout si cela a une importance.
byte mac[] = { 0x1A, 0x2B, 0x3C, 0x4D, 0x5E, 0x6F };

HADevice device(mac, sizeof(mac));
HAMqtt mqtt(client, device);

void onStateChanged(HAMqtt::ConnectionState state) {
	Serial.print("onStateChanged: ");
	// Devrait afficher 0 lorsque la connexion est réussie.
	Serial.println(state);
}

void setup() {
	Serial.begin(9600);
	
	initWifi();
	
	// Donner le nom de votre choix à votre objet connecté
	device.setName("TestDeviceName");

	// Associer la fonction onStateChanged au changement d'état du périphérique.
	mqtt.onStateChanged(onStateChanged);
	// Identifiant précédent
	mqtt.begin("<IP de Votre Serveur HA>", 1883, "mqtt-user", "changeit");
}

void loop() {
	mqtt.loop();
}
~~~

Et normalement si tout se passe bien vous devriez voir la console :

~~~
onStateChanged: -5
onStateChanged: 0
~~~

## Ajout d'une lampe. 

Un device peut avoir plusieurs composants, ici on va juste faire une lampe.

~~~cpp
// Ajout d'une lampe.
// Donner l'identifiant de votre choix, il doit être unique.
HALight light("LightId", HALight::BrightnessFeature | HALight::ColorTemperatureFeature | HALight::RGBFeature);

// Ajout d'un callback pour recevoir les messages de changement d'état sur la lampe
void onLightStateCommand(bool state, HALight* sender) {
	Serial.print("State: ");
	Serial.println(state);

	// Appliquer le changement
	digitalWrite(LED_BUILTIN, state ? LOW : HIGH);
	
	// Il faut renvoyer l'état au broker pour acquitement.
	sender->setState(state);
}

void setup() {
	Serial.begin(9600);
	
	initWifi();

	// Initialisation, de la lampe on va faire très simple ici.
	pinMode(LED_BUILTIN, OUTPUT);
	digitalWrite(LED_BUILTIN, HIGH);
	
	device.setName("TestDeviceName");
	
	// Donner le nom de choix
	light.setName("TestLightName");
	// Associer le callback
	light.onStateCommand(onLightStateCommand);

	mqtt.onStateChanged(onStateChanged);
	mqtt.begin("<IP de Votre Serveur HA>", 1883, "mqtt-user", "changeit");
}

void loop() {
	mqtt.loop();
}
~~~

Et normalement dans votre Home Assistant vous devriez voir apparaître un bouton pour contrôler votre petite lumière :

[gallery]
pictures/code/arduino/ha-04.jpg
[/gallery]

