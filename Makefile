default: deploy

.PHONY: clean

bootstrap:
	yarn install

build:
	yarn build

deploy: build
	firebase deploy

start:
	yarn start

clean:
	-rm -rf build
	-rm -rf node_modules
