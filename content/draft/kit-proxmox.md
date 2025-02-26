


## Lien vers des Tutos

### Installation de Home Assistant

[Source Originale](https://forum.proxmox.com/threads/guide-install-home-assistant-os-in-a-vm.143251/)

Traduction du post :
#### Recupération de l'image

- Aller sur la page d'installation [HA website](https://www.home-assistant.io/installation/alternative)
- Copier le lien **KVM/Proxmox**
- Dans votre console proxmox faites un wget pour la télécharger
- puis decompress

~~~shell
wget <ADDRESS>
unxz </path/to/file.qcow2.xz>
~~~

#### Création de la VM

General:
- Select your VM name and ID
- Select 'start at boot'

OS:
- Select 'Do not use any media'

System:
- Change 'machine' to 'q35'
- Change BIOS to OVMF (UEFI)
- Select the EFI storage (typically local-lvm)
- Uncheck 'Pre-Enroll keys'

Disks:
- Delete the SCSI drive and any other disks

CPU:
- Set minimum 2 cores

Memory:
- Set minimum 4096 MB

Network:
- Leave default unless you have special requirements (static, VLAN, etc)


Confirm and finish. Do not start the VM yet.

Add the image to the VM

- In your node's console, use the following command to import the image from the host to the VM

Bash:

~~~
qm importdisk <VM ID> </path/to/file.qcow2> <EFI location>
~~

For example,

Bash:

~~~
qm importdisk 205 /home/user/haos_ova-12.0.qcow2 local-lvm
~~~


- Close the node's console and select your HA VM
- Go to the 'Hardware' tab
- Select the 'Unused Disk' and click the 'Edit' button
- Check the 'Discard' box if you're using an SSD then click 'Add'
- Select the 'Options' tab
- Select 'Boot Order' and hit 'Edit'
- Check the newly created drive (likely scsi0) and uncheck everything else

Finish Up

- Start the VM
- Check the shell of the VM. If it booted up correctly, you should be greeted with the link to access the Web UI.
- Navigate to <VM IP>:8123

Done. Everything should be up and running now.

