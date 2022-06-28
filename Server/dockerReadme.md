To be be able run docker & build its image on Windows machine-


Install WSL 2 for running Linux kernel as docker backend

enable WSL using Dism command

Install linux kernel on Windows 
https://docs.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package

Install Docker for Windows and choose WSL2 
https://docs.docker.com/desktop/windows/wsl/

Set default 
    wsl.exe --set-default-version 2


Restart your machine

In terminal run docker --help to check 


navigate to Server folder of this project and run this command to build the image

    docker build -t coach-gurus--server-image -f .\dockerFile .

let it build

then run to see all the images locally

    docker images

to run docker image in a container ON local machine PORT 9000 mapped to container port 8081 -

    docker run -p 9000:8081 coach-gurus-server-image

Browse 
http://localhost:9000



