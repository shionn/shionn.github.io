sudo apt install debmirror

mkdir /var/mirror

# URIs: http://deb.debian.org/debian/
# Suites: testing testing-updates
# Components: main non-free-firmware contrib non-free
# Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
debmirror --method=https --rsync-extra=none --nosource --progress --keyring=/usr/share/keyrings/debian-archive-keyring.gpg -h deb.debian.org -r debian -d stable -s main -a amd64 /var/mirror/deb.debian.org >> /root/mirror-debian.log

# URIs: https://packages.mozilla.org/apt
# Suites: mozilla
# Components: main
# Signed-By: /var/lib/extrepo/keys/mozilla.asc
debmirror --method=https --rsync-extra=none --nosource --progress --exclude=.* --include=firefox\.deb --ignore-missing-release --keyring=/var/lib/extrepo/keys/mozilla.asc -h packages.mozilla.org -r apt -d mozilla -s main -a amd64 /var/mirror/packages.mozilla.org >> /root/mirror-packages.mozilla.org.log


# -r : The root directory has a dists subdirectory

https://manpages.debian.org/testing/debmirror/debmirror.1.en.html
https://linux.die.net/man/1/debmirror
https://doc.lesmorin.fr/index.php/Debmirror

