
Dans un [précedent article](2026/nvidia-proxmox-lxc-passthrought-ollama.html) j'éxpliquais comment j'avais installer Ollama et Open Webui dans un container LXC sur proxmox en faisant un passthrought de ma 2080Ti. Aujourd'hui cette article est tres proche du précédent je recommance avec [llama.cpp](https://llama.app/) mais cette fois ci avec ma nouvelle 2080Ti 22Gb. 

# Un container proxmox LXC avec nvidia.

## Installation des drivers nvidia.

Dans Il faut installer les drivers nvidia sur votre serveur proxmox. 
La procedure que je présente ici utilise la methode extrepo que je trouve plus simple. 
Pour cela commencer par mettre à jour votre serveur : 

~~~shell
apt update && apt upgrade
~~~

Ensuite installons les prérequis sur proxmox :

~~~shell
apt install pve-nvidia-vgpu-helper nvtop pve-headers build-essential
~~~

Ensuite proxmox propose un outil pour préconfigurer votre systeme à l'installation des drivers nvidia.
Cela passe les drivers nouveau en blacklist et install quelques packet nécéssaire. 

~~~shell
pve-nvidia-vgpu-helper setup
~~~

Ensuite il ne vous reste plus qu'à installer les paquets du driver nvidia en suite la methode extrepo : 

~~~shell
apt install extrepo
extrepo enable nvidia-cuda
apt update
apt install nvidia-open
~~~

## Création du container

Je crais ici un container debian 13 avec 4 coeur 16go de ram et 64go de disque. 
J'ajouterai par la suite si j'ai besoin de plus. 
Il n'est pas nécéssaire d'avoir un container priviligié. 

Une fois votre container créer, il faut partagé votre carte à votre container. 
Commencons par identifier les péripheriques nvidia : 

~~~shell
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

Il faut passthrought tous ces dossiers au container. Cela se fait dans l'interface de votre proxmox.

[gallery]
/pictures/linux/proxmox-lxc-nvidia/add-devices-menu.jpg
/pictures/linux/proxmox-lxc-nvidia/add-devices.jpg
[/gallery]

Et vous devriez avoir quelque chose comme ca :

[gallery]
/pictures/linux/proxmox-lxc-nvidia/devices-list.jpg
[/gallery]

## Driver nvidia dans le Container

Il faut ensuite installer les driver nvidia dans le container en suivant la même procedure : 

~~~shell
apt install extrepo
extrepo enable nvidia-cuda
apt update
apt install nvidia-open
~~~

Puis faite un nvidia-smi et constater la présence de votre carte :

~~~shell
$ nvidia-smi 
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 615.71.09              Driver Version: 615.71.09      CUDA Version: 13.4     |
+-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 2080 Ti     On  |   00000000:06:00.0 Off |                  N/A |
| 41%   40C    P8              1W /  260W |       4MiB /  22528MiB |      0%      Default |
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

# Llama

## Installation

Ici c'est assez simple, il suffit de suivre la procedure officiel :

~~~shell
curl -LsSf https://llama.app/install.sh | sh
~~~

Comme llama s'install dans votre home (ici je m'embete pas je le fait en root) il faut ensuite l'ajouter à votre path. Ajouter cette ligne à votre .profile : 

~~~shell
export PATH="$HOME/.local/bin:$PATH"
~~~

## Installation en service

Créer un fichier `/etc/systemd/system/llama-serve.service` avec :

~~~shell
[Unit]
Description=Llama Server
After=network.target

[Service]
User=root
Type=simple
WorkingDirectory=/root
ExecStart=/root/start-llama-serv.sh
ExecStop=/bin/kill $MAINPID

[Install]
WantedBy=multi-user.target
~~~

Puis créons le fichier `/root/start-llama-serv.sh` avec : 

~~~shell
#!/bin/bash
export PATH="$HOME/.local/bin:$PATH"

# à adapter en fonction de votre modele et la vram que vous avez. 
# Attention ici j'ai un gros cache mais n'oubliez pas que j'ai 22go de VRam.
export LLAMA_ARG_CTX_SIZE="400000"

llama serve --host 0.0.0.0 \
  --n-gpu-layers all \
  --flash-attn on \
  -ctk q8_0 -ctv q8_0 \
  --api-key-file api-key
~~~

Explication 
- --host 0.0.0.0 : Ecoute sur toute les interfaces
- --n-gpu-layers all : Utiliser au maximum les GPUs
- --flash-attn on : necessaire à la quantisation du cache
- -ctk q8_0 : Quantifier le cache K en 8bits au lieux de fp16
- -ctv q8_0 : Quantifier le cache K en 8bits au lieux de fp16
- --api-key-file api-key : fichier des clef d'authentification, une clef par ligne

Puis finalisons l'installation du service

~~~shell
systemctl daemon-reload
systemctl enable llama-serve.service
~~~

## Télécharger un premier model

J'aime beaucoup le modèle Ornith, il est vraiment adapté à la génération de code en agentique et n'est pas tres lourd. Je prend ici la version quantisé en 8bit mais vous pouvez prendre la version Q6_K qui est aussi tres performante. 

~~~shell
llama download -hf ornith-ai/Ornith-1.5-9B-GGUF:Q8_0
~~~

Puis relancer le service : 

~~~shell
systemctl enable llama-serve.service
~~~

## Test

Vous pouvez vous connecté au port 8080 de votre serveur à l'aide de votre navigateur et commencer à l'utiliser

[gallery]
[/gallery]

# Utilisation en agentique dans Eclipse

## Installation de Peon AI 

J'utilise l'extention PeonAi pour faire de l'agentique. Il peu s'installer via le marketplace d'eclipse :

[gallery]
[/gallery]

Puis le configurer :

[gallery]
[/gallery]

Puis vous pouver l'utiliser en ouvrant la vue `AI Peon` dans `Window > Show View > Other > AI`. Ici je lui demande de corriger ce présent article. 

[gallery]
[/gallery]
