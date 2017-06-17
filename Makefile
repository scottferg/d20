# Makefile for drzaius.io
#
# target: prerequisites
# 	command
#
default: build

build: d20.drzaius.io

.PHONY: clean

bootstrap:
	yarn install

yarn:
	yarn build

d20.drzaius.io: yarn
	firebase deploy

desktop:
	pwaify https://d20.drzaius.io/ --platforms=darwin --icon public/images/ic_launcher-6x.icns

clean:
	-rm -rf build
	-rm -rf node_modules
