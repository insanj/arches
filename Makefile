SHELL:=/bin/bash

.EXPORT_ALL_VARIABLES:
SQL_USER:=postgres
SQL_PASSWORD:=slide
SQL_DATABASE:=arches

TESTING_PORT=8080

.PHONY: node
postgres:
	npm start

install:
	npm install

gcloud:
	gcloud app deploy

#.PHONY: postgresql
#postgresql:
#	gcloud sql databases create arches --instance=arches

#TESTING RECIPES:
# 
#local:
#	python -m SimpleHTTPServer $(TESTING_PORT)
#
#.PHONY: ngrok
#ngrok:
#	./ngrok http $(TESTING_PORT) -subdomain arches
#