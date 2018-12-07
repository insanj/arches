
const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

// SERVE HOMEPAGE
const path = require('path');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../webapp/index.html'))
})


var savedStuff = [];

// EXTRACT ENDPOINT
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/extract', function (req, res) {	
	console.log(`Received: ${JSON.stringify(req.body)}`)
	const resultString = req.body["data"];
	savedStuff.push(resultString);

	const formattedResponse = "Arches JSON Format:\n------------" + "Minecraft NBT Format:\n------------" + savedStuff.toString();
	res.end(formattedResponse)
})

// 404 AND STATIC FILES
app.use('/static', express.static(path.join(__dirname + '/../webapp/static')))

//app.get('*', function(req, res){
//  res.send('Not found', 404);
//});

// DONE!
// app.set('trust proxy', true);
const port = 8080
app.listen(port, () => console.log(`Arches on ${port}!`))