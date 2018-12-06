SHELL:=/bin/bash
# .EXPORT_ALL_VARIABLES:

TESTING_PORT=3000

node:
	npm start

install:
	npm install

local:
	python -m SimpleHTTPServer $(TESTING_PORT)

.PHONY: ngrok
ngrok:
	./ngrok http $(TESTING_PORT) -subdomain arches

gcloud:
	gcloud app deploy