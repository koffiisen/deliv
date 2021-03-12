
// Step 1 - set up express & mongoose
 
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000
var fs = require('fs');




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine 
app.set("view engine", "ejs");
  
 // Step 5 - set up multer for storing uploaded files

 
 app.get('/upload_file', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

app.get('/', function(req, res) {
    res.render('./testsage.ejs');
});

// Step 8 - the POST handler for processing the uploaded file

app.post('/upload_file', (req, res, next) => {
	var obj = {
		email: req.body.email, //automatic filling of current user
		desc: req.body.desc,
	}
});

// Step 9 - configure the server's port

app.listen(port, err => {
	if (err)
		throw err
	console.log('Server listening on port', port)
})

