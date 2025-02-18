
Dependance necessaire :

~~~shell
apt install wget git python3 python3-venv libgl1 libglib2.0-0
~~~

cloner le repo

demarrer le seervice en CPU


./webui.sh --use-cpu all --precision full --no-half --skip-torch-cuda-test --listen


## Utiliser une intel arc

git clone https://github.com/openvinotoolkit/stable-diffusion-webui.git


installer pip : 

apt install python3-pip

puis installer openvimo 

pip install --pre openvino


./webui.sh --skip-torch-cuda-test --precision full --no-half --listen

