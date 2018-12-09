SHELL:=/bin/bash

.EXPORT_ALL_VARIABLES:
SQL_USER:=webapp
SQL_PASSWORD:=arches123
SQL_DATABASE:=prod

TESTING_PORT=8080

.PHONY: node
postgres:
	npm start

install:
	npm install

gcloud:
	gcloud app deploy

proxy:
	./cloud_sql_proxy -instances=arches-224720:us-east1:arches=tcp:5432

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