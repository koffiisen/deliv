
// Step 1 - set up express & mongoose
 
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var port = 3000
var fs = require('fs');
var path = require('path');
//let multer = require('multer');
var imgModel = require('./model');



//mongoose.connect('mongodb://localhost:27017/DeliverHome', {useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine 
app.set("view engine", "ejs");
  
 // Step 5 - set up multer for storing uploaded files
 
 
 /*let storage = multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, 'uploads')
     },
     filename: (req, file, cb) => {
         cb(null, file.fieldname + '-' + Date.now())
     }
 });*/
 
//let upload = multer({ storage: storage });

 
 app.get('/inscription', (req, res) => {
    
            res.render('formInscr');
        
    });


// Step 8 - the POST handler for processing the uploaded file

app.post('/inscription', (req, res, next) => {
	var obj = {
		name: req.body.Name,
		family_name: req.body.family_name, 
		email: req.body.email, //automatic filling of current user
		password: req.body.password,
	}
	console.log(obj); 
	});



// Step 9 - configure the server's port

app.listen(port, err => {
	if (err)
		throw err
	console.log('Server listening on port', port)
})

