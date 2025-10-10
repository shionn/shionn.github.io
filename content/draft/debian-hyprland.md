


## Installation

### Compilation depuis les sources

Dépdendance nécssaire à la coompilation


~~~shell
sudo apt install cmake libgl1-mesa-dev
~~~

~~~shell
sudo apt install libpugixml-dev
git clone git@github.com:hyprwm/hyprwayland-scanner.git
cd hyprwayland-scanner
cmake -DCMAKE_INSTALL_PREFIX=/usr -B build
cmake --build build -j `nproc`
sudo cmake --install build
~~~

~~~shell
git clone git@github.com:hyprwm/hyprutils.git
cd hyprutils
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr -S . -B ./build
cmake --build ./build --config Release --target all -j`nproc 2>/dev/null || getconf NPROCESSORS_CONF`
sudo cmake --install build
~~~

~~~shell
sudo apt install libseat-dev libinput-dev wayland-protocols libwayland-dev libpixman-1-dev libdrm-dev libgbm-dev libdisplay-info-dev hwdata
git clone git@github.com:hyprwm/aquamarine.git
cd aquamarine
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr -S . -B ./build
cmake --build ./build --config Release --target all -j`nproc 2>/dev/null || getconf _NPROCESSORS_CONF`
sudo cmake --install build
~~~

~~~shell
git clone git@github.com:hyprwm/hyprlang.git
cd hyprlang
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr -S . -B ./build
cmake --build ./build --config Release --target hyprlang -j`nproc 2>/dev/null || getconf _NPROCESSORS_CONF`
sudo cmake --install ./build
~~~

~~~shell
sudo apt install libzip-dev libcairo2-dev librsvg2-dev libtomlplusplus-dev
git clone git@github.com:hyprwm/hyprcursor.git
cd hyprcursor
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr -S . -B ./build
cmake --build ./build --config Release --target all -j`nproc 2>/dev/null || getconf _NPROCESSORS_CONF`
sudo cmake --install build
~~~

~~~shell
sudo apt install libmagic-dev
git clone https://github.com/hyprwm/hyprgraphics
cd hyprgraphics
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr -S . -B ./build
cmake --build ./build --config Release --target all -j`nproc 2>/dev/null || getconf NPROCESSORS_CONF`
sudo cmake --install build
~~~

Et c'est le drame, y a besoin de libxkbcommmon v2 :

~~~shell
sudo apt install meson bison
git clone git@github.com:xkbcommon/libxkbcommon.git
meson compile -C build
cd build
sudo meson install
~~~

~~~
sudo apt install libxkbcommon-dev libxcursor-dev libre2-dev
sudo apt install libxcb-xfixes0-dev libxcb-icccm4-dev libxcb-composite0-dev libxcb-res0-dev libxcb-errors-dev
git clone --recursive https://github.com/hyprwm/Hyprland
cd Hyprland
make all
sudo make install
~~~

Installation optionnel 

~~~shell
sudo apt install qt6-declarative-dev
git clone --recursive -b v0.1.0 git@github.com:hyprwm/hyprland-qt-support.git
cd hyprland-qt-support
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -DINSTALL_QML_PREFIX=/lib/qt6/qml -S . -B ./build
cmake --build ./build --config Release --target all -j`nproc 2>/dev/null || getconf NPROCESSORS_CONF`
sudo cmake --install build
~~~

~~~shell
sudo apt install qt6-wayland-dev qt6-wayland-private-dev qt6-3d-dev 	qt6-5compat-dev
git clone --recursive -b v0.1.5 git@github.com:hyprwm/hyprland-qtutils.git
cd hyprland-qtutils
cmake --no-warn-unused-cli -DCMAKE_BUILD_TYPE:STRING=Release -DCMAKE_INSTALL_PREFIX:PATH=/usr -S . -B ./build
cmake --build ./build --config Release --target all -j`nproc 2>/dev/null || getconf NPROCESSOR


DE LA MERDE
~~~


Il faut installer kitty, comme termminal en plus de hyprland

sudo apt install kitty

## Configuration



## lancement de jeu

gamescope -W 5120 -H 1440 -f --sdr-gamut-wideness 1 -- 

Ressource : 

- https://wiki.hypr.land
- https://github.com/hyprwm
- https://github.com/JaKooLit/Debian-Hyprland






- https://github.com/gaurav23b/simple-hyprland/blob/main/docs/basic_configuration.md
- https://deepwiki.com/gaurav23b/simple-hyprland/3.1-basic-configuration
- https://blog.cschad.com/posts/hyprland_configuration/
- https://itsfoss.com/configuring-hyprland/
- https://wiki.hypr.land/Configuring/Monitors/
- https://wiki.archlinux.org/title/Hyprland
- https://wiki.hypr.land/Getting-Started/Installation/
