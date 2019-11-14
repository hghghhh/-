var express = require('express');
var fs = require('fs');
var router = require('./router.js');
var bodyParser = require('body-parser');

var app = express();

app.use('/node_modules/', express.static('./node_modules'));
app.use('/public/', express.static('./public'));

app.engine('html', require('express-art-template'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(router);

app.listen(3000, function () {
    console.log('3000 is running...');
});