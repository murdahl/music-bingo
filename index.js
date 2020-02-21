var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;

var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');

// ROUTES
const musicRoute = require('./routes/music-page');

app.set('view engine', 'hbs');
app.engine(
	'hbs',
	handlebars({
		layoutsDir: __dirname + '/views/layouts',
		extname: 'hbs'
	})
);

app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use('/', musicRoute);

app.listen(port, () => console.log(`App listening to port ${port}`));
