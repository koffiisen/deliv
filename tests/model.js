// Step 3 - this is the code for ./models.js

var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	email: {
		type :String,
		required : false
	},
	desc: String,
	img:
	{
		data: Buffer,
		contentType: String
	},
	like: {
        type: Number, default : 0
    },
    date : {type : Date, default : Date.now}, 
	//for the future - add comments to the image publication
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Image', imageSchema);
