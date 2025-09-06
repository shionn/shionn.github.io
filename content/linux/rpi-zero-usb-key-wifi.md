
## Installation

Rendez vous sur le site de [Rasperrypi](https://www.raspberrypi.com/software/) pour télécharger et installer **Raspberry Pi Imager**. 
Installer raspian en version lite et configurer l'installation pour qu'il se connect à votre wifi et pour pouvoir vous y connectez dessus en ssh. Faites attention, mais je ne le savais pas le SSID est senssible à la casse. 


## Configuration

Connecter vous au rasperry pi en ssh et commencons par la mise à jour du system :

~~~bash 
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
~~~

### Installation du stockage USB

On commence par creer une image disque sur la carte sd a l'aide de la commande ss : 

~~~bash 
# creation d'une image de 8Go
sudo dd if=/dev/zero of=/usbdisk.img bs=1M count=8192
# formater en FAT32
~~~

Editer le fichier **/boot/firmware/config.txt** et ajouter dans la section [pi0] : 

~~~bash 
[pi0]
dtoverlay=dwc2
~~~


Editer le fichier **/etc/modules** et ajouter une ligne avec **dwc2** :

~~~bash
dwc2
~~~

Redémarrer votre pi.

Normalement on devrais mettre `g_mass_storage file=/usbdisk.img stall=0 removable=1` dans le fichier **/etc/modules** mais cela ne marche plus depuis quelque version de raspian. Il semblerai qu'il faille attendre que le module dwc2 soit fini d'être chargé. 

On peu passé par un service, creer le fichier **/etc/systemd/system/g_mass_storage.service** et editer le comme suit : 

~~~bash
[Unit]
Description=G Mass Storage USB Gadget
After=network.target

[Service]
Type=oneshot
ExecStart=modprobe g_mass_storage file=/usbdisk.img stall=0 removable=1
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
~~~

Enfin activer et démarrer le service : 

~~~bash
sudo systemctl enable g_mass_storage.service
sudo systemctl start g_mass_storage.service
~~~

Normalement votre clef viens de se connecter à votre PC, et vous pouvez creer une table de partition et la formater en fat32 par exemple.

### Montage du diskimg dans le rasperry pi

Il faut commencer par monter votre fichier usbdisk.img dans le systeme de fichier du pi pour pouvoir le partager via samba apres. 

Faite un `file /usbdisk.img` vous devriez avoir quelque chose comme cela :

~~~bash
/usbdisk.img: DOS/MBR boot sector; partition 1 : ID=0xb, start-CHS (0x4,4,1), end-CHS (0x3ff,254,2), startsector 2048, 16775168 sectors
~~~

Faite un `sudo parted /usbdisk.img print`, vous devriez avoir quelque chose comme ca : 

~~~bash
Model:  (file)
Disk /usbdisk.img: 8590MB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags: 

Number  Start   End     Size    Type     File system  Flags
 1      1049kB  8590MB  8589MB  primary  fat32
~~~

Donc on veux monter la partition 1. On commence par faire un `sudo losetup --partscan /dev/loop8 /usbdisk.img` puis on peu creer un dossier : `sudo mkdir -p /mnt/usbdisk1`. et enfin y monter la partition : `sudo mount /dev/loop8p1 /mnt/usbdisk1`







## Conclusion

bon point / mauvais point