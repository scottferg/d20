# Makefile for drzaius.io
#
# target: prerequisites
# 	command
#
default: build

build: d20.drzaius.io

.PHONY: clean

BUILD_CMD = cd src/d20_viewer; go get; CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo
NPM_CMD = yarn install; yarn build
GIT_HASH = $(shell git rev-parse --short HEAD)
CONTAINER = gcr.io/sandbox-161721/d20_viewer:$(GIT_HASH)

bootstrap:
	docker pull kkarczmarczyk/node-yarn
	docker pull golang

compile:
	docker run -v $(CURDIR):/go/src/d20_viewer golang /bin/bash -c "$(BUILD_CMD)" &
	docker run -v $(CURDIR):/workspace kkarczmarczyk/node-yarn /bin/sh -c "$(NPM_CMD)" &
	wait(2)

d20.drzaius.io: compile
	docker build -t $(CONTAINER) .

push: d20.drzaius.io 
	gcloud docker -- push $(CONTAINER)

deploy: clean build push
	kubectl set image deployment/d20-viewer d20-viewer=$(CONTAINER)

run: d20.drzaius.io 
	docker run -p 443:443 $(CONTAINER)

clean:
	-rm -rf node_modules
	-rm -rf build
	-rm d20_viewer
