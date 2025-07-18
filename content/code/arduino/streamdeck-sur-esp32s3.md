
J'ai acheté cette [board sur aliexpress](https://www.aliexpress.com/item/1005007566332450.html), 
la JC3248W535 qui est basé sur un ESP32S3 avec un écran lcd de 480x320 en 16bit couleur. 
Ce qui correspondait à mon besoin, je voulais un truc capable : 
- d'afficher une image net
- de se connecté au wifi
- de faire de l'USB OTG afin d'émuler un clavier
- optionnelement lire des donner depuis une SD.
- si possible le bluetouth

[gallery]
/pictures/arduino/desk-companion-esp32/01-JC3248W535.avif
[/gallery]

L'idée est vraiment de faire un truc ressemblant un stream deck avec des icones qui permette de lancer des programme sur mon ordinateur. 
Je souhaiterai aussi me connecter a a mes serveur afin d'obtenir des informations disponible comme la production de mes panneau solaire via home assistant. 

Je vous présente aujourd'hui chaque point de solution technique pour ce projet. 

## Préparation
### Initialisation de la board

Il faut reflasher la board avec le logiciel arduino. Pour cela aller dans le menu outil puis gerer les bibliothethe et installer __ESP32 by espressif__.

Ensuit dans le menu outil paramétré la board comme cela : 
- Type de Carte : ESP32-S3 box
- Usb Mode : USB-OTG
- Usb Firmware MSC On Boot : Disabled
- USB DFU On Boot : Disabled
- Partition Scheme : 16M Flash (3MB APP/9.9MB FATFS)
- Erase All Flash Before Sketch Upload : Disabled
- Programmteur : esptool

Puis flasher la board avec **graver la sequence d'initialisation**.

[gallery w=450 h=300]
/pictures/arduino/desk-companion-esp32/02-arduino-install.png
/pictures/arduino/desk-companion-esp32/03-parametre-flash.png
[/gallery]

### Parametrage de plateformIO

J'utilise plateformIO pour develloper avec le framework arduino voici mon platefomio.ini. La board la plus proche est je pense l'esp32s3box. 

~~~
[env:esp32s3box]
platform = espressif32
board = esp32s3box
framework = arduino
upload_speed = 115200
upload_port = /dev/ttyACM0
board_build.partitions = huge_app.csv ; nécéssaire pour avoir acces à plus de rom et flash
monitor_speed = 115200
~~~

## Du code
### Affichage sur l'ecran 
L'écran intégré est un **AXS15231B** la lib GFX adapfruit permet d'afficher dessus. On peu l'ajouter à l'aide du fichier platefomio.ini:

~~~
[env:esp32s3box]
platform = espressif32
board = esp32s3box
framework = arduino
upload_speed = 115200
upload_port = /dev/ttyACM0
board_build.partitions = huge_app.csv ; nécéssaire pour avoir acces à plus de rom et flash
monitor_speed = 115200
lib_deps = 
	moononournation/GFX Library for Arduino@^1.6.0
~~~
L'initialisation de l'écran ce fait comme suit : 

~~~cpp
#include <Arduino.h>
#include <Arduino_GFX_Library.h>

#define DISPLAY_BACKLIGHT 1

Arduino_DataBus* bus = new Arduino_ESP32QSPI(45, 47, 21, 48, 40, 39);
Arduino_GFX* g = new Arduino_AXS15231B(bus, GFX_NOT_DEFINED, 0, false, 320, 480);
Arduino_Canvas* gfx = new Arduino_Canvas(320, 480, g, 0, 0, 0);

void setup() {
	// initialisation du backlight
	pinMode(DISPLAY_BACKLIGHT, OUTPUT);
	digitalWrite(DISPLAY_BACKLIGHT, HIGH);
	this->gfx->begin();
}

void loop() {
	// utilisation de gfx non détaillé dans ce tuto
	gfx-> 
}
~~~

### Le tactile

Pour lire le tactile il faut utiliser la lib WIRE. En fouillant dans el code exemple de la lib j'ai fini par trouver les pin qui font bien. Et j'ai trouver de bien bonne (explication ici)[https://f1atb.fr/esp32-s3-3-5-inch-capacitive-touch-ips-display-setup/].

~~~cpp

#include <Wire.h>


#define TOUCH_ADDR 0x3B
#define TOUCH_SDA 4
#define TOUCH_SCL 8
#define TOUCH_I2C_CLOCK 400000
#define TOUCH_RST_PIN 12
#define TOUCH_INT_PIN 11
#define AXS_MAX_TOUCH_NUMBER 1

void setup() {
	// initialisation du tactile
	Wire.begin(TOUCH_SDA, TOUCH_SCL);
	Wire.setClock(TOUCH_I2C_CLOCK);

	// Configure touch pins
	pinMode(TOUCH_INT_PIN, INPUT_PULLUP);
	pinMode(TOUCH_RST_PIN, OUTPUT);
	digitalWrite(TOUCH_RST_PIN, LOW);
	delay(200);
	digitalWrite(TOUCH_RST_PIN, HIGH);
	delay(200);
}

uint16_t touchX, touchY;

bool isTouched() {
	uint8_t data[AXS_MAX_TOUCH_NUMBER * 6 + 2] = { 0 };

	// commande de lecture
	const uint8_t read_cmd[11] = {
		0xb5, 0xab, 0xa5, 0x5a, 0x00, 0x00,
		(uint8_t)((AXS_MAX_TOUCH_NUMBER * 6 + 2) >> 8),
		(uint8_t)((AXS_MAX_TOUCH_NUMBER * 6 + 2) & 0xff),
		0x00, 0x00, 0x00
	};

	Wire.beginTransmission(TOUCH_ADDR);
	Wire.write(read_cmd, 11);
	while (Wire.endTransmission() != 0);

	while (Wire.requestFrom(TOUCH_ADDR, sizeof(data)) != sizeof(data));

	for (int i = 0; i < sizeof(data); i++) {
		data[i] = Wire.read();
	}

	if (data[1] > 0 && data[1] <= AXS_MAX_TOUCH_NUMBER) {
		uint16_t rawX = ((data[2] & 0x0F) << 8) | data[3];
		uint16_t rawY = ((data[4] & 0x0F) << 8) | data[5];
		if (rawX > 500 || rawY > 500) return false;
		touchX = rawX;
		touchY = rawY;
		return true;
	}
	return false;
}

void press() {
	// traiter un apui sur ecran au coordonné touchX,touchY
}

void release() {
	// traiter un relachement sur ecran au coordonné touchX,touchY
}

bool previousTouch = false;
void loop() {
	bool changed = dashboard.update();
	if (display.isTouched()) {
		previousTouch = true;
		press();
	} else if (previousTouch) {
		previousTouch = false;
		release();
	}
	delai(100);// peu etre necessaire pour debounce.
}
~~~

### Se connecter au wifi 

// TODO



https://f1atb.fr/esp32-s3-3-5-inch-capacitive-touch-ips-display-setup/