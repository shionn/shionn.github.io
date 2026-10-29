Dans un [précédent article](2026/nvidia-proxmox-lxc-passthrought-ollama.html) j'expliquais comment j'avais installé Ollama et Open Webui dans un conteneur LXC sur Proxmox en faisant un passthrough de ma 2080Ti. Aujourd'hui, cet article est très proche du précédent, je recommence avec [llama.cpp](https://llama.cpp/) mais cette fois-ci avec ma nouvelle RTX 2080 Ti de 22 Go.

# Un conteneur Proxmox LXC avec NVIDIA.

## Installation des drivers NVIDIA.

Il faut installer les drivers NVIDIA sur votre serveur Proxmox.
La procédure que je présente ici utilise la méthode extrepo que je trouve plus simple.
Pour cela, commencez par mettre à jour votre serveur :

~~~shell
apt update && apt upgrade
~~~

Ensuite installons les prérequis sur Proxmox :

~~~shell
apt install pve-nvidia-vgpu-helper nvtop pve-headers build-essential
~~~

Ensuite Proxmox propose un outil pour préconfigurer votre système à l'installation des drivers NVIDIA.
Cela met les drivers nouveaux en blacklist et installe quelques paquets nécessaires.

~~~shell
pve-nvidia-vgpu-helper setup
~~~

Ensuite il ne vous reste plus qu'à installer les paquets du driver NVIDIA, puis la méthode extrepo :

~~~shell
apt install extrepo
extrepo enable nvidia-cuda
apt update
apt install nvidia-open
~~~

## Création du conteneur

Je crée ici un conteneur Debian 13 avec 4 cœurs, 16 Go de RAM et 64 Go de disque.
J'ajouterai plus tard si nécessaire.
Il n'est pas nécessaire d'avoir un conteneur non privilégié.

Une fois votre conteneur créé, il faut partager votre carte avec votre conteneur.
Commençons par identifier les périphériques NVIDIA :

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

Il faut partager tous ces dossiers au conteneur. Cela se fait dans l'interface de votre Proxmox.

[gallery]
/pictures/linux/proxmox-lxc-nvidia/add-devices-menu.jpg
/pictures/linux/proxmox-lxc-nvidia/add-devices.jpg
[/gallery]

Et vous devriez avoir quelque chose comme ça :

[gallery]
/pictures/linux/proxmox-lxc-nvidia/devices-list.jpg
[/gallery]

## Driver NVIDIA dans le conteneur

Il faut ensuite installer les drivers NVIDIA dans le conteneur en suivant la même procédure :

~~~shell
apt install extrepo
extrepo enable nvidia-cuda
apt update
apt install nvidia-open
~~~

Puis, faites un `nvidia-smi` et constatez la présence de votre carte :

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

Ici c'est assez simple, il suffit de suivre la procédure officielle :

~~~shell
curl -LsSf https://llama.app/install.sh | sh
~~~

Comme llama s'installe dans votre répertoire personnel (ici, je l'installe en root), il faut ensuite l'ajouter à votre PATH. Ajoutez cette ligne à votre .profile :

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

llama serve --host 0.0.0.0 \
  --n-gpu-layers all \
  --flash-attn on \
  -ctk q8_0 -ctv q8_0 \
  --models-preset models.ini \
  --models-max 1 \
  --api-key-file api-key
~~~

Explications
- --host 0.0.0.0 : Écoute sur toutes les interfaces
- --n-gpu-layers all : Utiliser au maximum les GPUs
- --flash-attn on : nécessaire à la quantisation du cache
- -ctk q8_0 : Quantifier le cache K en 8 bits au lieu de fp16
- -ctv q8_0 : Quantifier le cache V en 8 bits au lieu de fp16
permet de limiter à un maximum de 1 modèle chargé en VRAM, afin que le modèle courant soit déchargé lors d'un changement de modèle.
- --api-key-file api-key : fichier des clés d'authentification, une clé par ligne

Puis finalisons l'installation du service


~~~shell
systemctl daemon-reload
systemctl enable llama-serve.service
~~~

À déplacer
- --spec-type draft-dflash : c'est pour les modèles draft (voir plus bas)
- --models-preset models.ini : fichier de paramétrage de modèles (voir plus bas)

# Installation des modèles

J'ai choisi d'installer 3 modèles avec leurs modèles de draft.

- [Ornith-1.5-9B](https://huggingface.co/ornith-ai/Ornith-1.5-9B-GGUF)
- [Ornith-1.5-9B-DFlash](https://huggingface.co/abenzerps/Ornith-1.5-9B-DFlash-GGUF)
- [Gemma-4-12B & MTP](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF)
- [NVIDIA-Nemotron-3.5-Bolt-E4B-4GB & Dflash](https://huggingface.co/unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF)

J'aime beaucoup le modèle Ornith, il est vraiment adapté à la génération de code de façon agentique et n'est pas très lourd. 

## Téléchargement des modèles

Je prends ici des modèles quantifiés. La version quantifiée à 8 bits est adaptée en fonction de la quantité de VRAM. Cependant, en dessous de 4B, cela hallucine beaucoup. Je prends les liens de téléchargement présents sur les pages listées précédemment.

~~~shell
wget https://huggingface.co/ornith-ai/Ornith-1.5-9B-GGUF/resolve/main/Ornith-1.5-9B-Q8_0.gguf?download=true
wget https://huggingface.co/abenzerps/Ornith-1.5-9B-DFlash-GGUF/resolve/main/Ornith-1.5-9B-DFlash-Q8_0.gguf?download=true
wget https://huggingface.co/unsloth/gemma-4-12b-it-GGUF/resolve/main/gemma-4-12b-it-Q8_0.gguf?download=true
wget https://huggingface.co/unsloth/gemma-4-12b-it-GGUF/resolve/main/MTP/mtp-gemma-4-12b-it-Q8_0.gguf?download=true
wget https://huggingface.co/unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF/resolve/main/NVIDIA-Nemotron-3.5-Bolt-E4B-UD-Q8_K_XL.gguf?download=true
wget https://huggingface.co/unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF/resolve/main/dflash-NVIDIA-Nemotron-3.5-Bolt-E4B-Q8_0.gguf?download=true
~~~

Puis je place chaque modèle dans le dossier models

## Paramétrer les modèles

Chaque modèle peut avoir des paramètres différents. C'est à cela que sert le fichier models.ini que nous avons paramétré plus tôt. En outre, cela permet de définir le modèle draft adapté à chaque modèle et la taille du cache. Pour chaque modèle, j'ai utilisé les options conseillées sur la page du modèle.

~~~shell
[*]
n-gpu-layers = 99

[Ornith-1.5-9B-Q8_0]
ctx-size=262144
model=models/Ornith-1.5-9B-Q8_0.gguf
model-draft=models/Ornith-1.5-9B-DFlash-Q8_0.gguf
spec-type=draft-dflash
spec-draft-n-max=8
temp=0.6
top-p=0.95
top-k=20
min-p=0.0
presence-penalty=0.0
repeat-penalty=1.0

[Nemotron-3.5-Bolt-E4B-Q8]
model = models/NVIDIA-Nemotron-3.5-Bolt-E4B-UD-Q8_K_XL.gguf
model-draft = models/dflash-NVIDIA-Nemotron-3.5-Bolt-E4B-Q8_0.gguf
spec-type = draft-dflash
spec-draft-n-max = 7
ctx-size = 65536
jinja = true
temp = 1.0
top-p = 0.95
top-k = 64
min-p = 0.0
presence-penalty = 0.0
repeat-penalty = 1.0

[Gemmai-4-12B-Q8]
ctx-size=262144
model = models/gemma-4-12b-it-Q8_0.gguf
model-draft = models/mtp-gemma-4-12b-it-Q8_0.gguf
spec-type = draft-mtp
# par defaut 2
spec-draft-n-max = 3
jinja = true
temp = 1.0
top-p = 0.95
top-k = 64
~~~

Puis relancez le service :

~~~shell
systemctl enable llama-serve.service
~~~

## Test

Vous pouvez vous connecter au port 8080 de votre serveur à l'aide de votre navigateur et commencer à l'utiliser.

[gallery w=500 h=400]
/pictures/linux/proxmox-lxc-llama/llama-interface-web.png
[/gallery]

# Utilisation de façon agentique dans Eclipse

## Installation de Peon AI

J'utilise l'extension PeonAI pour faire de l'agentique. Il peut s'installer via le marketplace d'Eclipse :

[gallery]
/pictures/linux/proxmox-lxc-llama/peon-ai-eclipse-marketplace.png
[/gallery]

Puis configurez-le :

[gallery]
/pictures/linux/proxmox-lxc-llama/peon-ai-eclipse-configuration.png
[/gallery]

Puis vous pouvez l'utiliser en ouvrant la vue `AI Peon` dans `Window > Show View > Other > AI`. Ici je lui demande de corriger cet article.

[gallery]
/pictures/linux/proxmox-lxc-llama/peon-ai-eclipse-utilisation.png
[/gallery]
