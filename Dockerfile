FROM ubuntu:16.04
MAINTAINER Dariusz Rzepka <dariusz.rzepka@deployed.pl>

# to build the docker file use command: docker build -t project-name .

RUN apt-get update && \
    apt-get install -y curl python git

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y nodejs yarn && \
    node --version && \
    yarn --version

# webpack image loader dependencies
RUN apt-get -y install libpng-dev optipng libjpeg-dev libgif-dev build-essential g++ nasm
