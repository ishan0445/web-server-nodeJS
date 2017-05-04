const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = '3000';

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n', (err) =>{
		if(err)
			console.log('Error writing to the logs.');
	});
	next();
});

// Un-comment to start maintenance mode
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/',(req,res) => {
	// res.send('<h1>Hello World</h1>');
	res.render('index.hbs',{
		pageName: 'About Page',
		welcomeMessage: 'Welcome to my website'
	});
});

app.get('/about', (req,res) => {
	// res.send({
	// 	name: 'Ishan',
	// 	contact: '+91-9703002733'
	// });

	res.render('about.hbs',{
		pageName: 'About Page',
	});
});

app.get('/bad', (req,res) => {
	res.send({
		errorMsg: 'Some Error'
	});
});

app.listen(port,() => {
	console.log(`Server is up and running on port ${port}`);
});