

sudo apt install -y rustc cargo rust-src -t stable-backports

# arduino avr
cargo install probe-rs-tools

















cargo install cargo-embed






cargo install cargo-pio

cargo pio new <your-project-name> --platform espressif32 --frameworks espidf [--board <your-board-name>]

cargo pio new LedBlink-Esp32-Rust --platform espressif32 --frameworks arduino --board wemos_d1_mini32



cargo pio new --board wemos_d1_mini32 ~/projects/ArduinoLearning/LedBlink-Esp32-Rust

PATH="$HOME/.cargo/bin:$PATH"



VS-Code installer rust+ rust-analyser


Sources

https://github.com/esp-rs/esp-idf-template/blob/master/README-pio.md