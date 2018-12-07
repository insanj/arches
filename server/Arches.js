
const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

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
	console.log(`Received: ${JSON.stringify(req.body)}`)
	const resultString = req.body["data"];
	extracted.push(resultString);

	const markupData = Buffer.from(req.body["markup"], 'base64')

	var formattedResponse = "\n\nBinary NBT Format:\n------------\n\n" + markupData + "\n\nMinecraft NBT Format:\n------------\n\n" + resultString;

	const filePath = "player.dat";
	fs.writeFile(filePath, markupData, function(er) {
		console.log("Wrote file! " + er);
		fs.readFile(filePath, function(error, data) {
			console.log("Read file! " + error);
			const nbt = require('prismarine-nbt');
			nbt.parse(data, function(error, d) {
				console.log("Parsed file! " + d);
		        console.log(d.value);
		        
		        const ArchesTransformer = require('./ArchesTransformer.js')
		        var transformer = new ArchesTransformer(d);
		        var transformerRendering = transformer.render();

		        var responseString = "Arches Transformed JSON:\n------------\n\n" + transformerRendering;
		        responseString += formattedResponse;
	        	res.end(responseString);
		    });
		});
   	});
});

// 404 AND STATIC FILES
app.use('/static', express.static(path.join(__dirname + '/../webapp/static')))

// DONE!
// app.set('trust proxy', true);
const port = 8080
app.listen(port, () => console.log(`Arches on ${port}!`))