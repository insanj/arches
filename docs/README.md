<a href="http://github.com/insanj/arches"><img src="https://img.shields.io/badge/github--black.svg?logo=github&style=plastic&logoColor=white" /></a>

## How to use

1. Local deploy with `make`
2. Gcloud with `make gcloud`

Configure PostgreSQL and open Admin at http://127.0.0.1:59126/browser/#.

1. Create server, database, arches table
2. Fill in by running ETL process completely in webapp

Open up webapp locally using http://localhost:8080/.


Set up the SQL Cloud platform through Google Cloud and connect to the App Engine instance https://cloud.google.com/sql/docs/postgres/connect-app-engine. In addition to adding the permissions to the SQL Cloud API, you may need to open up the firewall https://cloud.google.com/community/tutorials/setting-up-postgres. Some tips can be found on StackOverflow https://stackoverflow.com/questions/48496999/gcloud-postgres-wont-connect-with-app-engine.

> NOTE: if the TCP port for PostgreSQL is already in use, you can find and kill it using `netstat -vanp tcp | grep 5432`.

## What's included

```
.
├── LICENSE
├── Makefile
├── app.yaml
├── package.json
├── docs
├── server
│   ├── Arches.js
│   └── ArchesExtractor.js
└── webapp
    ├── index.html
    └── static
```

## Creators

**Julian Weiss**

- <https://twitter.com/insanj>
- <https://github.com/insanj>


## Copyright and license

Code and documentation copyright 2018 [Julian Weiss](https://github.com/insanj). Code released under the [GNU License](LICENSE). 

```
arches: powerful travelog for gamers built in nodejs & postgresql
Copyright (C) 2018 Julian (insanj) Weiss

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```
