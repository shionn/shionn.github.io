
Vous êtes sous Linux, vous avez des truc en RGB et vous ne savez comment les contrôler ? OpenRGB peu le faire pour vous mais attention il y a parfois des contraintes. 

Vous n'êtes pas sous Linux et vous avez plein de RGB de marque différente ? et vous voudriez tous centraliser ?  C'est aussi possible mais je n'en parlerai pas. 

## Instalation (sous débian)

Télé-charger OpenRGB sur le [site officiel](https://openrgb.org/#downloads). Puis installer le : 

~~~shell
sudo apt install openrgb_0.9_amd64_bookworm_b5f46e3.deb
~~~

Pour certain périphérique il faut le module i2c : 

~~~shell
sudo apt install i2c-tools 
sudo modprobe i2c-dev
~~~

## Controler vos truc RGB
### Par GUI

OpenRGB fourni un gui pour contrôler vos RGB. Personnellement je n'aime pas. 

[gallery]
pictures/linux/openrgb/gui.png
[/gallery]

### Par script

Bien évidement je vais pas faire un article uniquement pour un simple `apt install`. Ma méthode préférée pour contrôler mes LED c'est via des scripts. 
Ça semble complexe, mais au final c'est bien plus léger ! (hein corsair !)

Voici quelques commandes et des exemples de réponse avec mon matériel : 

#### Lister les périphériques 

D'abord il faut lister vos périphérique pour les identifier et savoir ce qu'il peuvent faire. 

~~~shell
$ sudo openrgb -l 
$ 0: ENE DRAM
  Type:           DRAM
  Description:    ENE SMBus Device
  Version:        AUDA0-E6K5-0101
  Location:       I2C: /dev/i2c-0, address 0x70
  Modes: Direct Off Static Breathing Flashing 'Spectrum Cycle' Rainbow 'Chase Fade' Chase ['Random Flicker']
  Zones: DRAM
  LEDs: 'DRAM LED 1' 'DRAM LED 2' 'DRAM LED 3' 'DRAM LED 4' 'DRAM LED 5' 'DRAM LED 6' 'DRAM LED 7' 'DRAM LED 8'
  1: ...
  5: B550 AORUS ELITE AX V2
  Type:           Motherboard
  Description:    IT5702-GIGABYTE V2.0.10.0
  Version:        0x000A0002
  Location:       HID: /dev/hidraw7
  Serial:         0x57020100
  Modes: [Direct] Static Breathing Blinking 'Color Cycle' Flashing
  Zones: 'D_LED1 Bottom' 'D_LED2 Top' Motherboard
  LEDs: 'Name for Led 1' 'Name for Led 2' 'Name for Led 3' 'Name for Led 4' 'Name for Led 5' 'Name for Led 6' 'Name for Led 7' 'Name for Led 8'
  6: ...
~~~

#### Quelques exemples

~~~shell
# changer mes rams
$ sudo openrgb -d "ENE DRAM" -m "Breathing" -c FF8000
# changer juste une zone de ma carte mere
$ sudo openrgb -d "B550 AORUS ELITE AX V2" -z "Motherboard" -m "Breathing" -c FF8000
~~~

Sur ma carte mère Gigabyte le contrôle des zones ne marche pas. 

## Limite 

Avec pratiquement toutes les cartes mère Gigabyte, pour contrôler les RAMs il vous faut ajouter l'option suivant à votre grub. 
Pour ce faire éditer le fichier `/etc/default/grub` et modifier l'option `GRUB_CMDLINE_LINUX=` en ajoutant `acpi_enforce_resources=lax`. Puis faite un `sudo update-grub`.

Conclusion : n'acheter pas de carte mère Gigabyte, n'acheter pas de barrette de ram avec du RGB.

J'ai d'aileurd changé pour une MSI, plus besoin d'ajouter l'option au noyau et les zone marche. 

## Pour aller plus loin

Si comme moi vous voulez éteindre vos RAMs quand votre pc se met en veille alors il est possible de faire un script comme décris dans [cet article](2024/debian-execute-task-before-and-after-suspend.html). 

Et si vous voulez initialiser votre RGBs au démarrage de votre machine vous pouvez utiliser une crontab : 

~~~shell
@reboot		root	cd / && run-parts --report /etc/cron.reboot
~~~
