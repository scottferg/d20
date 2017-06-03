# Makefile for drzaius.io
#
# target: prerequisites
# 	command
#
default: build

build: d20.drzaius.io

.PHONY: clean

BUILD_CMD = cd src/d20_viewer; go get; CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo
GIT_HASH = $(shell git rev-parse --short HEAD)
CONTAINER = gcr.io/sandbox-161721/d20_viewer:$(GIT_HASH)

bootstrap:
	docker pull digitallyseamless/nodejs-bower-grunt
	docker pull golang

compile:
	docker run -v $(CURDIR):/go/src/d20_viewer golang /bin/bash -c "$(BUILD_CMD)"

grunt:
	docker run -v $(CURDIR):/data digitallyseamless/nodejs-bower-grunt npm run build

d20.drzaius.io: compile grunt
	docker build -t $(CONTAINER) .

push: d20.drzaius.io 
	gcloud docker -- push $(CONTAINER)

deploy: clean build push
	kubectl set image deployment/d20_viewer-deployment d20_viewer=$(CONTAINER)

run: d20.drzaius.io 
	docker run -p 443:443 $(CONTAINER)

clean:
	-rm -rf build
	-rm d20_viewer
