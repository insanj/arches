
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
app.use(function(req,res,next){
	if(req.url.includes("extract") == true) {
		return bodyParser.json();
	} else {
		next()
	}
});

app.post('/extract', function (req, res) {	
	console.log(`Received: ${JSON.stringify(req.body)}`)
	const resultString = req.body["data"];
	extracted.push(resultString);

	const markupData = req.body["markup"];

	var formattedResponse = "Binary NBT Format:\n------------" + markupData + "Minecraft NBT Format:\n------------" + resultString;
	res.end(formattedResponse);
});

/*
app.post("/transform", function (req, res) {
	console.log("Got something!");

	var body = '';
    filePath = __dirname + '/transform.dat';
    req.on('data', function(data) {
		console.log("Streaming data!");
        body += data;
    });

    req.on('end', function (e) {
		console.log("End of data! " + e);
        fs.writeFile(filePath, body, function(er) {
			console.log("Wrote file! " + er);
			fs.readFile(filePath, function(error, data) {
				console.log("Read file! " + error);
				const nbt = require('prismarine-nbt');
				nbt.parse(data, function(error, d) {
					console.log("Parsed file! " + d);
			        console.log(d.value);
			    	res.end(d.value);
			    });
			});
        });
    });
});
*/

// 404 AND STATIC FILES
app.use('/static', express.static(path.join(__dirname + '/../webapp/static')))

//app.get('*', function(req, res){
//  res.send('Not found', 404);
//});

// DONE!
// app.set('trust proxy', true);
const port = 8080
app.listen(port, () => console.log(`Arches on ${port}!`))