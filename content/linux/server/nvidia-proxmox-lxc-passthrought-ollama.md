
Ce tuto s'intérresse surtout à la procédure à suivre pour installer une carte graphique NVIDIA sur votre Proxmox avec un pass-through dans un conteneur.
Cette solution n'utilise pas les drivers pro qui permettent de découper une carte en plusieurs. En effet, avec la containment LXC, une même carte peut être partagée entre plusieurs conteneurs. 

## Installation des driver Nvidia

### Nvidia sur proxmox

Il faut commencer par installer les driver nvidia sur votre proxmox. 
Commencer par le mettre à jour :

~~~bash
apt update && apt upgrade
~~~

Ensuite il vous faudrat ces outils :

~~~bash
apt install pve-nvidia-vgpu-helper nvtop pve-headers build-essential
~~~

Ensuite proxmox propose un outil pour préconfigurer votre systeme à l'installation des driver nvidia.
Cela passe les drivers nouveau en blacklist et install quelques packet nécéssaire. 

~~~bash
pve-nvidia-vgpu-helper setup
~~~

Ensuite il ne vous reste plus qu'à installer les paquets du driver nvidia. 

~~~bash 
wget https://developer.download.nvidia.com/compute/cuda/repos/debian12/x86_64/cuda-keyring_1.1-1_all.deb
apt install ./cuda-keyring_1.1-1_all.deb
apt update
apt upgrade
apt install nvidia-driver-cuda
~~~

Vérifiez que vous n'avez aucune erreur. Si vous avez la moindre erreur faite cela pour annuler l'installation des drivers.
Et malheureusement je ne pourrai pas vous aider à la corriger :[

~~~bash
apt remove nvidia-driver-cuda && apt autoremove
~~~

Si vous n'avez aucune erreur, vous pouvez reboot, après le reboot faite un nvidia-smi et normalement vous avez quelques chose comme cela : 

~~~bash
$ nvidia-smi 
Sat Aug 23 10:52:17 2025       
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 580.65.06              Driver Version: 580.65.06      CUDA Version: 13.0     |
+-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 2080 Ti     On  |   00000000:81:00.0 Off |                  N/A |
| 41%   40C    P8              1W /  260W |       4MiB /  11264MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+

+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI              PID   Type   Process name                        GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|  No running processes found                                                             |
+-----------------------------------------------------------------------------------------+
~~~

### Nvidia dans le Container LXC

Votre container n'as pas besoin d'option particulière, il n'as pas besoin d'être privilégié.
configuration, sur l'hôte faites un ls `/dev/nvi*` et vous devriez avoir quelque chose comme cela : 

~~~bash
root@MaxiMox:~# ls -l /dev/nvi*
crw-rw-rw- 1 root root 195,   0 Aug 23 10:52 /dev/nvidia0
crw-rw-rw- 1 root root 195, 255 Aug 23 10:52 /dev/nvidiactl
crw-rw-rw- 1 root root 195, 254 Aug 23 10:52 /dev/nvidia-modeset
crw-rw-rw- 1 root root 508,   0 Aug 23 10:52 /dev/nvidia-uvm
crw-rw-rw- 1 root root 508,   1 Aug 23 10:52 /dev/nvidia-uvm-tools

/dev/nvidia-caps:
total 0
cr-------- 1 root root 234, 1 Aug 23 10:52 nvidia-cap1
cr--r--r-- 1 root root 234, 2 Aug 23 10:52 nvidia-cap2
~~~

Il fait passthrought tous ces dossiers au container. Cela se fait dans l'interface de votre proxmox.

[gallery]
/pictures/linux/proxmox-lxc-nvidia/add-devices-menu.jpg
/pictures/linux/proxmox-lxc-nvidia/add-devices.jpg
[/gallery]

Et vous devriez avoiir quelque chose comme ca :

[gallery]
/pictures/linux/proxmox-lxc-nvidia/devices-list.jpg
[/gallery]

Ensuite il ne vous reste plus qu'a installer les drivers nvidia et la suite l'ogiciel cuda sur votre container, la procédure est semblable à celle de l'hote. 

~~~bash 
wget https://developer.download.nvidia.com/compute/cuda/repos/debian12/x86_64/cuda-keyring_1.1-1_all.deb
apt install ./cuda-keyring_1.1-1_all.deb
apt update
apt install cuda-toolkit
apt install nvidia-driver-cuda
~~~

Vous pouver faire un nvdia-smi pour confirmer que la carte est disponible et fonctionnel sur votre container. 

## Exemple une IA avec Ollama

### Ollama

Pour tester cette nouvelle carte, je vous propose d'installer ollama qui est un group d'IA opensource.

~~~bash
# L'installateur à besoin de lspci
apt install pciutils
wget https://ollama.com/install.sh
./install.sh
~~~

Et normalement vous devriez avoir une sortie console ressemblant à :

~~~bash
./install.sh 
>>> Cleaning up old version at /usr/local/lib/ollama
>>> Installing ollama to /usr/local
>>> Downloading Linux amd64 bundle
################################################# 100.0%
>>> Adding ollama user to render group...
>>> Adding ollama user to video group...
>>> Adding current user to ollama group...
>>> Creating ollama systemd service...
>>> Enabling and starting ollama service...
>>> NVIDIA GPU installed.
~~~

Puis faire un essaie en console. 

~~~bash
ollama run qwen2.5-coder:7b
~~~

### Open web UI

Ajoutons une interface graphique à notre IA. 
Pour installer openweb ui, sur votre machine vous avez besoin : 

~~~bash
apt install python3-pip python3-venv
~~~

Dans mon cas je l'ai installer dans /root. Puis rentrer les commandes suivante : 

~~~bash
python3 -m venv open-webui
source open-webui/bin/activate
pip install open-webui
open-webui serve
~~~

Render vous sur le port 5000 de votre container :)


## Ressource

J'ai réussi à faire cela en m'appuyant sur ces documentations :
- [How to set up a NVIDIA GPU with Open WebUI and Ollama on Proxmox](https://www.nasmaster.com/how-to-set-up-a-nvidia-gpu-with-open-webui-and-ollama-on-proxmox)
- [CUDA Installation Guide for Linux](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#network-repo-installation-for-debian)
- [NVIDIA vGPU on Proxmox VE](https://pve.proxmox.com/wiki/NVIDIA_vGPU_on_Proxmox_VE)

