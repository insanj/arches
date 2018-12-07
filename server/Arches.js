
const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const databaseFilename = "arches.db";

// SERVE HOMEPAGE
const path = require('path');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../webapp/index.html'))
})

// EXTRACT ENDPOINT
var extracted = [];
app.use(bodyParser.urlencoded({ extended: false, limit: '500mb'}));
app.use(bodyParser.json());

app.post('/extract', function (req, res) {	
	const resultString = req.body["data"];
	extracted.push(resultString);

	const markupData = Buffer.from(req.body["markup"], 'base64')

	var responseDict = {"binary": markupData, "nbt": resultString};

	const filePath = "player.dat";
	fs.writeFile(filePath, markupData, function(er) {
		fs.readFile(filePath, function(error, data) {
			const nbt = require('prismarine-nbt');
			nbt.parse(data, function(error, d) {		        
		        const ArchesTransformer = require('./ArchesTransformer.js')
		        var transformer = new ArchesTransformer(d);
		        var transformerRendering = transformer.render();

		        responseDict["json"] = transformerRendering;
	        	res.end(JSON.stringify(responseDict));
		    });
		});
   	});
});

app.post('/transform', function (req, res) {	
	const ArchesLoader = require('./ArchesLoader.js')
	var loader = new ArchesLoader(databaseFilename);

	loader.loadJSONIntoPostgreSQL(req.body, function (loaderResponse) {
		res.end(loaderResponse);
	});
});

// 404 AND STATIC FILES
app.use('/static', express.static(path.join(__dirname + '/../webapp/static')))

// DONE!
// app.set('trust proxy', true);
const port = 8080
app.listen(port, () => console.log(`🐚 Arches on ${port}!`))
