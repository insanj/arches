SHELL:=/bin/bash
# .EXPORT_ALL_VARIABLES:

TESTING_PORT=8080

node:
	npm start

install:
	npm install

gcloud:
	gcloud app deploy

#TESTING RECIPES:
# 
#local:
#	python -m SimpleHTTPServer $(TESTING_PORT)
#
#.PHONY: ngrok
#ngrok:
#	./ngrok http $(TESTING_PORT) -subdomain arches
#