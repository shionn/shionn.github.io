Bonjour.
Voici un petit tuto simple sur la synchronisation d'une horloge sur un ESP32 via NTP. Cela marche également sur un ESP8266.

# Préparation

## Connexion reseau

Je ne détaillerai pas dans ce tuto comment faire, mais vous pouvez regarder [ce tuto](/2025/connexion-wifi-esp32)

## Ajout lib

Pour la synchronisation NTP il vous faut la lib [NTPClient](https://github.com/arduino-libraries/NTPClient). 
Avec plateformio vous pouvez l'ajouter comme cela dans le fichier platformio.ini. 

~~~
lib_deps = 
	arduino-libraries/NTPClient@^3.2.1
~~~

# Code

L'utilisation de la lib est assez simple, comme le montre ce code.

~~~cpp
#include <Arduino.h>
// pour un esp32
#include <WiFi.h> 
// pour un esp8266
#include <ESP8266WiFi.h>

// gestion du temps
#include <NTPClient.h>
#include <WiFiUdp.h>

#define NTP_PACKET_SIZE 48
#define NTP_LOCAL_PORT 8888
#define NTP_SERVER "pool.ntp.org"
#define TIME_ZONE_IN_SECOND 3600
// toutes les heures
#define REFRESH_INTERVAL_IN_MS 3600000 

WiFiUDP udp;
NTPClient timeClient(udp, NTP_SERVER, TIME_ZONE_IN_SECOND, REFRESH_INTERVAL_IN_MS);

void setup() {
	// connexion au reseau (non détaillé ici)
	timeClient.begin();
}

void loop() {
	// mettre à jour si le delai de rafraichissement est dépassé.
	timeClient.update();

	Serial.print("Heure : ");
	Serial.println(timeClient.getFormattedTime());

	delay(1000);
}
~~~

## Et avec le changement d'heure ?

Cela se fait facilement avec la lib [TimeZone](https://github.com/JChristensen/Timezone). 

~~~
lib_deps = 
	arduino-libraries/NTPClient@^3.2.1
	jchristensen/Timezone@^1.2.5
~~~

Ensuite il faut initialisé NtpClient sur la timezone UTC. Puis definir notre time zone. Voici un exemple avec mon cas personnel c'est dire CET/CEST. 

~~~
// autre import
#include <Timezone.h>

// declaration du client ntp en UTC
NTPClient ntpClient(udp, NTP_SERVER, 0, REFRESH_INTERVAL_IN_MS);
// CEST : commence le dernier dimanche de mars à 2 heure du matin avec un décalage de 120 minutes
TimeChangeRule cest = { "CEST", Last, Sun, Mar, 2, 120 };
// CET : commence le dernier dimanche d'octobre à 3 heure du matin avec un décalage de 60 minutes
TimeChangeRule cet = { "CET", Last, Sun, Oct, 3, 60 };
// construction de notre timezone.
Timezone timezone(cest, cet);

void setup() {
	// pas de changement
}

void loop() {
	ntpClient.update();
	// récupération de l'heure en UTC
	time_t utcTime = ntpClient.getEpochTime();
	// convertion en locale
	time_t localTime = timezone.toLocal(utcTime);

	Serial.print("Heure : ");
	Serial.println(ctime(&localTime));

	delay(1000);
}
~~~




