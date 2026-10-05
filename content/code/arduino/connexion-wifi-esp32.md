Bonjour.

Voici un petit tuto simple sur la gestion de la connexion wifi avec le framework arduino sur un ESP32 mais cela fonctionne aussi avec un ESP8266 et probablement d'autres cartes.

# Connexion

La connexion se fait avec la bibliothèque Wifi qui est incluse dès qu'on configure notre projet pour utiliser une carte ESP32. 

~~~cpp
#include <Arduino.h>
// pour un ESP32
#include <WiFi.h>
// pour un ESP8266
#include <ESP8266WiFi.h>


#define SSID_NAME "MonSSID"
#define SSID_PASS "mot de pass wifi"
#define HOST_NAME "nom d'hôte de l'ESP32"

void setup() {
	Serial.begin(9600);
	WiFi.disconnect(true);
	// il faut faire le setHostName avant le mode, sinon ce n'est pas pris en compte.
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
}

void loop() {

}
~~~

## Problème avec certains routeurs et l'ESP8266

J'ai souvent eu le souci que mes ESP8266 avaient beaucoup de mal à se connecter à mon réseau wifi. 
Il faut fouiller dans votre routeur, dans la configuration du réseau 2,4 GHz, et trouver une option s'appelant **mode sans fil** qui est peut-être réglée sur "N Only", puis passer cette option à "legacy".

[gallery]
pictures/code/arduino/asus/rooter-asus-legacy.png
[/gallery]

# Bonus : appeler un serveur

Et voici un exemple qui appelle un serveur en faisant un GET sur une adresse.

~~~cpp
// pour un esp32
#include <HTTPClient.h>
// pour un esp8266
#include <ESP8266HTTPClient.h>

#define HOST "http://www.google.com/" 

WiFiClient client;
HTTPClient http;

void setup() {
	// code de connexion précédent
}

void loop() {
	if (http.begin(client, HOST)) {
		int status = http.GET();
		Serial.printf("HTTP status %d\n", status);
		if (status == 200) {
			// si la réponse est petite
			String response = http.getString();
			Serial.println(response);
			// sinon lire par paquet 
			char buffer[100];
			int len = http.getStream().readBytes(buffer, 100);
			while (len != -1) {
				Serial.print(buffer);
				len = http.getStream().readBytes(buffer, 100);
			}
		}
		http.end();
	} else {
		Serial.println("not connected");
	}
}
~~~

## Et en HTTPS ?

Je ne vais pas présenter ici comment faire un appel en https, car personnellement je pense qu'il est mieux de rester sur un réseau local. 
Mais une solution un peu crade est d'ignorer la vérification ssl.

~~~cpp
// ajouter cet import
#include <WiFiClientSecure.h>

// changer le type du client
WiFiClientSecure client;

void setup() {
	client.setInsecure();
}

void loop() {
	// pas de changement
}
~~~


