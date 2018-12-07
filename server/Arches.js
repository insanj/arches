
const express = require('express');
const app = express();

// SERVE HOMEPAGE
const path = require('path');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../webapp/index.html'))
})

// EXTRACT ENDPOINT TO UPLOAD GZIP FILE
const fileupload = require("express-fileupload");
app.use(fileupload());
app.post('/extract', function (req, res) {
	//let buff = Buffer.from(, 'base64');  
	//let buffString = buff.toString("utf8");
	console.log("uploaded!!" + req.files);
	res.send('ok')
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