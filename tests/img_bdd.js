
// Step 1 - set up express & mongoose
 
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 3000
var fs = require('fs');
var path = require('path');
let multer = require('multer');
var imgModel = require('./model');



mongoose.connect('mongodb://localhost:27017/DeliverHome', {useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine 
app.set("view engine", "ejs");
  
 // Step 5 - set up multer for storing uploaded files
 
 
 let storage = multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, 'uploads')
     },
     filename: (req, file, cb) => {
         cb(null, file.fieldname + '-' + Date.now())
     }
 });
 
let upload = multer({ storage: storage });

 
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

// Step 8 - the POST handler for processing the uploaded file

app.post('/upload_file', upload.single('image'), (req, res, next) => {
	const obj = {
		email: req.body.email, //automatic filling of current user
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	imgModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/upload_file'); //redirect to the feed 
		}
	});
});

// Step 9 - configure the server's port

app.listen(port, err => {
	if (err)
		throw err
	console.log('Server listening on port', port)
})

