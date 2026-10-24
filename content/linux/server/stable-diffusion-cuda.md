Dans un précédent article j'expliquais comment j'avais installé Llama.cpp dans un conteneur LXC sur Proxmox en l'exposant comme un service. Aujourd'hui je fais presque la même chose avec [stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) : au lieu de générer du texte, je vais générer des images. Attention, ce n'est pas le `stable-diffusion.cpp` Python de biolab : celui-ci est **entièrement en C/C++**, basé sur [ggml](https://github.com/ggml-org/ggml) — la même bibliothèque que Llama. La plupart du temps, il n'est **pas nécessaire de compiler** : des binaires précompilés sont disponibles en release. La procédure d'installation des drivers NVIDIA et du conteneur est identique, je m'en remets donc à mon article sur Llama.

# Stable Diffusion en C++ sur un conteneur Proxmox LXC avec NVIDIA

## Vérifier l'accès à la carte graphique
Vous devriez voir votre RTX 2080 Ti ainsi que la version du driver. C'est le backend GPU qui accélérera la génération.
Avant d'installer quoi que ce soit, vérifiez que la carte graphique est bien visible depuis le conteneur :

~~~shell
nvidia-smi
~~~

You devriez voir votre RTX 2080 Ti ainsi que la version du driver. C'est le backend GPU qui accélérera la génération.

## Installation (release précompilée)

Des binaires précompilés sont disponibles en release, ce qui évite de compiler le projet. Pour Linux x86_64, trois variantes sont proposées : CPU, Vulkan et ROCm (AMD). Comme tu as une NVIDIA, la variante **Vulkan** est la bonne : Vulkan fonctionne sur les cartes NVIDIA (le pilote NVIDIA fournit l'implémentation Vulkan), donc le binaire utilise bien ta 2080 Ti.

Télécharge la release Linux x86_64 (Vulkan) :

~~~shell
cd /root
curl -L -O https://github.com/leejet/stable-diffusion.cpp/releases/download/master-1000-95ff762/sd-master-1000-95ff762-bin-Linux-Ubuntu-24.04-x86_64-vulkan.zip
unzip sd-master-1000-95ff762-bin-Linux-Ubuntu-24.04-x86_64-vulkan.zip
~~~

Le tag de version dans l'URL (`master-1000-95ff762`) évolue à chaque release (le projet en publie quotidiennement). Pour te procurer la dernière, préfère la page [releases](https://github.com/leejet/stable-diffusion.cpp/releases) et choisis le binaire Linux x86_64 correspondant à ta carte graphique.

Vérifie ensuite que le binaire fonctionne :

~~~shell
./bin/sd-cli -h
~~~

Si le binaire ne trouve pas la bibliothèque Vulkan, installe le runtime Vulkan dans le conteneur :

~~~shell
apt install libvulkan1
~~~

Pour de meilleures performances CUDA, il est possible de compiler depuis source avec `cmake .. -DSD_CUDA=ON` (voir la build guide). La release Vulkan se déploye plus vite ; la compilation CUDA est un peu plus performante.

## Télécharger un modèle

Contrairement à Llama qui récupère ses modèles, ici ce sont **vous** qui devez télécharger les poids du modèle (au format `.safetensors`, `.ckpt/.pth/.pt` ou `.gguf`). Pour SDXL, le modèle base et le VAE sont séparés :

~~~shell
curl -L -O https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sd_xl_base_1.0.safetensors
curl -L -O https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/resolve/main/sdxl_vae-fp16-fix.safetensors
~~~

Avec 22 Go de VRAM, SDXL est très à l'aise. Des modèles plus légers (SD 1.5, SD 2.1) fonctionnent aussi, et sont utiles pour faire tourner plusieurs modèles.

## Générer une image

Le point d'entrée est le binaire `./bin/sd-cli`. Voici une génération txt2img en 1024x1024 avec SDXL :

~~~shell
./bin/sd-cli \
  -m /root/stable-diffusion.cpp/models/sd_xl_base_1.0.safetensors \
  --vae /root/stable-diffusion.cpp/models/sdxl_vae-fp16-fix.safetensors \
  -H 1024 -W 1024 \
  --cfg-scale 7.5 \
  --sampling-method dpmpp_2m \
  --steps 30 \
  --seed 42 \
  -p "a beautiful mountain landscape at sunset, highly detailed" \
  -o /root/out/paysage.png
~~~

Explications
- `-m` : chemin du modèle (les poids).
- `--vae` : VAE séparé, nécessaire pour SDXL.
- `-H` / `-W` : hauteur et largeur de l'image.
- `--cfg-scale` : force de guidage du prompt (plus c'est élevé, plus l'image respecte le prompt).
- `--sampling-method` : méthode de dénombrement (euler, dpmpp_2m, ...).
- `--steps` : nombre d'étapes de diffusion (plus c'est élevé, meilleure qualité mais plus lent).
- `--seed` : graine aléatoire, pour reproduire une image.
- `-p` : prompt.
- `-o` : chemin de sortie de l'image.

Pour lister tous les drapeaux disponibles : `./bin/sd-cli -h`.

## Génération à partir d'une image (img2img)

~~~shell
./bin/sd-cli \
  -m /root/stable-diffusion.cpp/models/sd_xl_base_1.0.safetensors \
  --vae /root/stable-diffusion.cpp/models/sdxl_vae-fp16-fix.safetensors \
  -H 1024 -W 1024 \
  --cfg-scale 7.5 \
  --steps 30 \
  -i /root/out/paysage.png \
  -o /root/out/paysage-modifie.png \
  --strength 0.5 \
  -p "le même paysage, mais avec un lac au premier plan"
~~~

`-i` est l'image de départ, `--strength` contrôle dans quelle mesure le prompt est appliqué (0 = l'image inchangée, 1 = régénération quasi complète).

## Sélection du backend et de la VRAM

stable-diffusion.cpp supporte plusieurs backends : CPU, CUDA, Vulkan, Metal, OpenCL et SYCL. Le backend par défaut est le GPU. Pour voir les dispositifs disponibles :

~~~shell
./bin/sd-cli --list-devices
~~~

Pour choisir explicitement le GPU et l'emplacement des poids :

~~~shell
./bin/sd-cli -m /root/stable-diffusion.cpp/models/sd_xl_base_1.0.safetensors -p "a cat" --backend cuda0 --params-backend cuda0
~~~

- `--backend` : backend d'exécution (runtime) — `cuda0`, `cpu`, `vulkan0`, `auto`, ...
- `--params-backend` : où sont stockés les poids (`cuda0`, `cpu` ou `disk` = recharger à la demande).
- `--flash-attn on|off|auto` : flash attention, pour gagner en mémoire et en vitesse.

Avec 22 Go de VRAM, vous pouvez générer de grandes images et faire tenir des modèles lourds. Le projet gère le découpage (tiling) du VAE et le split de couche sur plusieurs GPU si nécessaire.

## Utilisation en serveur (interface web)

stable-diffusion.cpp embarque une interface web. Vous pouvez la lancer comme un service systemd, ce qui est l'équivalent du `llama serve` de l'article précédent.

Fichier `/etc/systemd/system/stable-diffusion-server.service` :

~~~shell
[Unit]
Description=stable-diffusion.cpp web server
After=network.target

[Service]
User=root
Type=simple
WorkingDirectory=/root/stable-diffusion.cpp
ExecStart=/root/stable-diffusion.cpp/start-server.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
~~~

Finalisons l'installation du service :

~~~shell
chmod +x /root/stable-diffusion.cpp/start-server.sh
systemctl daemon-reload
systemctl enable stable-diffusion-server.service
systemctl start stable-diffusion-server.service
~~~

L'interface web écoute alors sur un port par défaut (à confirmer dans la sortie du service). Vous pouvez y choisir le modèle et le prompt, puis générer.

## Performance

Pour améliorer les performances ou réduire l'utilisation de la VRAM/RAM, reportez-vous à la [guide de performance](https://github.com/leejet/stable-diffusion.cpp/blob/master/docs/performance.md). Sur une carte comme la 2080 Ti de 22 Go, le tiling du VAE et le choix du `--sampling-method` sont les leviers les plus simples.

## Test

Les images générées se trouvent dans le dossier `/root/out`. Ouvrez le fichier généré avec votre navigateur pour visualiser le résultat.

## Source 

https://www.linuxtricks.fr/wiki/ia-installer-stablediffusion-cpp-pour-la-generation-d-image-nvidia-amd-cpu
