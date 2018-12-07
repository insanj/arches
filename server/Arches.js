
const express = require('express');
const app = express();

// SERVE HOMEPAGE
const path = require('path');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../webapp/index.html'))
})

// EXTRACT ENDPOINT TO UPLOAD GZIP FILE
const bodyParser = require("body-parser");
const pako = require('pako');
app.use(bodyParser.text({inflate: true}));
app.post('/extract', function (req, res) {
	var stringRep = req.body.toString();
	// console.log(`Received: ${req.body}`)
	console.log('String = ' + stringRep);
	let buff = new Buffer(data, 'base64');  

// console.log(`Inflated to: ${pako.inflateRaw(req.body)}`)
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