SHELL:=/bin/bash
# .EXPORT_ALL_VARIABLES:

TESTING_PORT=80

local:
	python -m SimpleHTTPServer $(TESTING_PORT)

.PHONY: ngrok
ngrok:
	./ngrok http $(TESTING_PORT) -subdomain arches