'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    api = require('./api'),
    cors = require('cors');

var app = express();

app.set('port', 9000);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    next();
});

// Endpoints
app.get('/api/heroes', api.listAll);
app.put('/api/edit/:id', api.update);
app.post('/api/add', api.create);
app.delete('/api/delete/:id', api.delete);

app.listen(app.get('port'), function () {
    console.log('✔Express server listening on http://localhost:%d/', app.get('port'));
});