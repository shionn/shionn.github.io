
# Servir son propre dépôt Debian avec reprepro et lighttpd

Un dépôt Debian permet d'héberger des paquets `.deb` et de les distribuer via `apt`. Cet article explique comment mettre en place un tel dépôt soi-même avec **reprepro** (pour générer la structure) et **lighttpd** (pour le servir), en reproduisant l'essentiel d'un script de maintenance réel.

> Ce tutoriel suppose que vous ayez déjà compris la structure d'un `.deb` (voir l'article sur la création d'un paquet). On s'intéresse ici à l'enveloppe du dépôt, pas au contenu des paquets.

## Qu'est-ce qu'un dépôt Debian ?

Un dépôt Debian regroupe plusieurs suites (releases) organisées selon un schéma précis :

```
distributions/            # fichier décrivant les suites (trixie, experimental, ...)
pool/<suite>/<composant>/<arch>/<pkg>/  # les .deb, organisés par suite/composant/architecture
Release                   # fichier de signature du dépôt
InRelease                 # version signée en GPG
```

Le fichier `distributions` declare chaque suite (`Codename`, `Architectures`, `Components`) et indique si elle est signée (`SignWith: yes`). Le paquet `orphanage-keyring` contient ensuite les clés GPG nécessaires pour vérifier ces signatures.

## Installer

Les deux outils nécessaires sont disponibles dans les dépôts standards :

```bash
sudo apt update
sudo apt install reprepro lighttpd
```

`reprepro` génère la structure du dépôt ; `lighttpd` servira les fichiers via HTTP.

## Générer une clé GPG

Pour qu'un dépôt soit signable de façon automatisée, on génère une **clé dédiée sans mot de passe** :

```bash
gpg --batch --passphrase '' --quick-add-key "$identifiant" sign never
```

Une clé sans passphrase est indispensable ici : le script de mise à jour va devoir **exporter** régulièrement la clé privée pour la mettre dans le keyring apt. Impossible d'exporter une clé protégée par un mot de passe sans entrer ce mot de passe à chaque exécution. C'est pourquoi Orphanage utilise une clé dédiée, et non la clé personnelle du maintainer.

> **Sécurité :** la clé privée reste locale (`~/.gnuph`) et ne doit jamais être exposée dans les scripts ni dans un dépôt public. Les scripts ne contiennent qu'un identifiant de clé (`SignKey:`), jamais la clé elle-même.

## Configurer reprepro

Le cœur de la configuration est le fichier `conf/distributions`. Voici comment il est généré :

```bash
mkdir -p "${CONFIG_ROOT}/conf/"

cat > "${CONFIG_ROOT}/conf/distributions" <<EOF
Origin: ${ORIGIN}
Label: ${ORIGIN}
Codename: trixie
Architectures: amd64
Components: main
Description: Orphanage repository by shionn
SignWith: yes

Origin: ${ORIGIN}
Label: ${ORIGIN}
Codename: experimental
Architectures: amd64
Components: main
Description: Orphanage repository by shionn
SignWith: yes
EOF
```

Chaque bloc correspond à une suite :

- **`Origin` / `Label`** : nom du dépôt.
- **`Codename`** : nom de la suite (`trixie`, `experimental`, ...).
- **`Architectures`** : architectures supportées (`amd64`).
- **`Components`** : composants (`main`).
- **`Description`** : description libre.
- **`SignWith: yes`** : active la signature GPG de la suite.

## Incorporer et exporter

Une fois les `.deb` disposés dans le bon dossier, on les incorpore au dépôt, puis on exporte le pool :

```bash
# Incorporer tous les .deb de build/trixie/*/*.deb dans la suite trixie
reprepro -b "${CONFIG_ROOT}" includedeb trixie build/trixie/*/*.deb

# Exporter le pool dans distributions/pool/
reprepro -b "${CONFIG_ROOT}" export trixie
```

L'inclusion à ce niveau (`build/trixie/*/*.deb`) signifie qu'on récupère les paquets déposés dans un sous-dossier par package. Après l'export, le pool est prêt à être servi.

## Servir avec lighttpd

Enfin, on configure `lighttpd` pour servir le pool via HTTP. La configuration typique :

```
server.root = "/var/www/html"
```

Le pool est alors accessible sous `/var/www/html/pool/`, et le fichier de sources apt pointe vers ce chemin :

```
Types: deb
Architectures: amd64
URIs: http://orphanage.shionn.org/pool
Suites: trixie
Components: main
Signed-By: /usr/share/keyrings/orphanage.pgp
```

Les `URIs:` indiquent où se trouve le pool, et `Signed-By:` la clé qui signe les paquets. Une fois `lighttpd` relancé (`sudo systemctl restart lighttpd`), le dépôt est accessible par `apt` sur le réseau.

## À retenir

Un dépôt Debian = une structure générée par reprepro (`distributions/`, `pool/`, `Release`) + un serveur web (lighttpd) qui la met à disposition. La signature GPG (clé dédiée sans passphrase) garantit l'authenticité des paquets. C'est exactement ce que fait Orphanage pour son serveur local.

## À lire aussi

- [Créer un paquet `.deb` maison](2026/debian/create-deb/), pour comprendre comment construire les `.deb` qui seront ensuite incorporés dans ce dépôt.
