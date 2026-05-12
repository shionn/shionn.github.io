sudo apt install debmirror

mkdir /var/mirror

# URIs: http://deb.debian.org/debian/
# Suites: testing testing-updates
# Components: main non-free-firmware contrib non-free
# Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

-r : The root directory has a dists subdirectory

 
debmirror --method=http -h deb.debian.org -r debian -d stable -s main -a amd64 --nosource --progress --keyring=/usr/share/keyrings/debian-archive-keyring.gpg --dry-run /var/mirror/deb.debian.org




https://manpages.debian.org/testing/debmirror/debmirror.1.en.html
https://linux.die.net/man/1/debmirror
https://doc.lesmorin.fr/index.php/Debmirror

