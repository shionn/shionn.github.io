## Reglage R7 5800XD3 PBO
Originellement l'accès à ces réglages n'étaient pas permis sur ce processeur. Heureusement au fur et à mesure des mise à jour du PBO ça a été permis. 

Voici quelque réglage trouvé sur [reddit](https://www.reddit.com/r/Amd/comments/11qgb1v/suggested_ppt_tdc_edc_for_5800x3d/) : 
[table class="collection" title="PBO R7 5800X3D" cols="#,PPT,TDC,EDC"]
défaut	142	95	140
gaming	122	82	124
heavy multi work	114	75	115
lower power gaming	100	65	90 
[/table]


https://www.reddit.com/r/linux/comments/t7pxpk/are_all_of_your_usb_devices_disconnecting/

echo -1 > /sys/module/usbcore/parameters/autosuspend

et si ca corrige le probleme : 
/etc/default/grub
usbcore.autosuspend=-1 >> GRUB_CMDLINE_LINUX_DEFAULT
sudo update-grub


