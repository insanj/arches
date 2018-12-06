
const express = require('express')
const app = express()
const port = 3000
var path = require('path');
var fs = require('fs');

// SERVE HOMEPAGE
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../webapp/index.html'))
})

// 404 AND STATIC FILES
app.use('/static', express.static(path.join(__dirname + '/../webapp/static')))

//app.get('*', function(req, res){
//  res.send('Not found', 404);
//});

// DONE!
app.set('trust proxy', true);
app.listen(port, () => console.log(`Arches on ${port}!`))