const mongoose = require('mongoose');
const {Schema} = mongoose;
const multer = require('multer');

const User_schema = new Schema({
    family_name: String,
    name : String, 
    email : {type : String, unique : true}, 
    password:String,
    grade : {type : Number, default: 0},  
    date : {type : Date, default : Date.now}, 

});
const UserProfileDescription_schema = new Schema({
    description : String,
    Uemail : String, 
    ifollow : [{
        type: String
    }],
    followers: [{
        type: String
    }],
    date : {type : Date, default : Date.now}, 
})
const Publication_schema = new Schema({
    type : String,
    description : String,
    Uemail : String,
    data : {
        type :Buffer,
        contentType: String
    },
    //like : {type : Array, default : 0},
    /*
    comments: [{
        type: String
    }],
    */
    like: [{
        type: Number
    }],
    date : {type : Date, default : Date.now}, 
})
const ImageSchema = new Schema({
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
const  storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const User = mongoose.model("User", User_schema);
const UserProfileDescription = mongoose.model("UserProfileDescription", UserProfileDescription_schema);
const Publication = mongoose.model("Publication", Publication_schema);
const Image = mongoose.model('Image', ImageSchema);

/*
exports.createUser = function(family_nameM,nameM, emailM, passwordM){
    const user = new User({family_name:family_nameM,name:nameM, email:emailM, password:passwordM});
    user.save().then(function(){
        console.log("User créée : ",user);
    });
};
*/

exports.createUser = function(family_nameM,nameM,emailM,passwordM, callback) {
    User.find({email : emailM }, function(err,docs) {
    console.log(docs)
        if (docs.length){
          callback({
              state :false,
              data : "Email already exists"
            })
        } else {
            const user = new User({family_name:family_nameM,name:nameM, email:emailM, password:passwordM});
            user.save().then(function(){
                console.log("User créée : ",user);
                callback({
                    state:true,
                    data : docs
                  })
            });
          }
    })
}
exports.createUserProfileDescription = function(descriptionM,UemailM){
    User.find({email : emailM }, function(err,docs) {
        console.log(docs)
            if (docs.length){
              callback({
                  state :false,
                  data : "Already exits"
                })
            }
            else {
              const UPdescription = new UserProfileDescription({description : descriptionM,Uemail : UemailM});
              UPdescription.save().then(function(){
                console.log("Description de profil créée : ",UPdescription);
                callback({
                    state:true,
                    data : docs
                })
            });
        }
    })
}
exports.createPublication = function(typeM, descriptionM, UemailM, dataM){
    const publication = new Publication({type : typeM, description : descriptionM, Uemail : UemailM, data : dataM});
    Publication.save().then(function(){
        console.log("Publication créée : ",Publication);
    });
};
//Get
exports.getUserByEmail_Fname = function(Uemail,callback){
    User.find({email : Uemail }, function (err, docs) { 
        if (err){ 
            console.log(err); 
            callback({
                state:false,
                data:[]
            })
        }
        else{ 
            if(docs.length > 0){
                callback({
                    state:true,
                    data:docs
                })
                console.log("Trouvé : ", docs); 
            }else{
                callback({
                    state:false,
                    data:[]
                })
            }
        }
    });
};
exports.getUserProfileDescription = function(UemailM,callback){
    UserProfileDescription.find({ email : UemailM }, function (err, docs) { 
        if (err){ 
            /*
            console.log(err);
            callback({
                state:false,
                data:[]
            }) 
            */
        }
        else{ 
            if(docs.length > 0){
                callback({
                    state:true,
                    data:docs
                })
                console.log("Trouvé : ", docs); 
            }else{
                callback({
                    state:false,
                    data:[]
                })
            }
        }
    });
};
//Delete
exports.deleteUserProfileDescrition = function(UemailM,callback){
    UserProfileDescription.deleteOne({ email : UemailM }, function (err, docs) { 
        if (err){ 
            console.log(err);
        }
        else{ 
            if(docs.length > 0){
                callback({
                    state:true,
                    data:docs
                })
            console.log("Trouvé : ", docs); 
            }
            else{
                callback({
                    state:false,
                    data:[]
                })
            }
        }
    });
};
exports.deleteUser = function(Fname,Uemail,callback){
    User.deleteOne({family_name : Fname, email : Uemail }, function(err,docs) {
    if (err){ 
            console.log(err); 
        }
    else{ 
            if(docs.length > 0){
                callback({
                    state:true,
                    data:docs
                })
                console.log("Supprimé : ", docs); 
            }
            else{
                callback({
                    state:false,
                    data:[]
                })
            }
        }
    });
};
//Update
exports.updateUserProfileDescription = function(descriptionM,UemailM,callback){
    UserProfileDescription.updateOne({email : UemailM},{description : descriptionM},function(err,docs) {
        if (err){ 
            console.log(err); 
        }
    else{ 
            if(docs.length > 0){
                callback({
                    state:true,
                    data:docs
                })
                console.log("MAJ : ", docs); 
            }
            else{
                callback({
                    state:false,
                    data:[]
                })
            }
        }
    });
};
exports.updateUser = function(FnameA,FnameN,UemailA,UemailN, pswd, grades, nameN, callback){
    User.updateOne({family_name : FnameA, email : UemailA },{family_name:FnameN,name:nameN, email:UemailN, password:pswd, grade:grades, date:dateM} ,function(err,docs) {
    if (err){ 
            console.log(err);
        }
    else{ 
        if(docs.length > 0){
                callback({
                    state:true,
                    data:docs
                })
        }else{
                callback({
                    state:false,
                    data:[]
                })
            }
            console.log("MaJ : ", docs); 
        }
    });
};

exports.follow = function(follower, tofollow) {
    UserProfileDescription.find({ email : UemailM }, function (err, docs) { 
        if (err){ 
            console.log(err); 
        }
        else{ 
            console.log("Trouvé : ", docs); 
        }
        callback(docs.follower)
    });
}
//------------------------IMAGE BDD---------------------------------------------------------------

const upload = multer({ storage: storage });
// A tester 
exports.getImagesbyEmail = function(emailM, callback) {
    Image.find({email : emailM}, (err, items) => {
        if (err) {
            console.log(err);
            callback(err);
            //res.status(500).send('An error occurred', err);
        }
        else {
            callback ({ items: items });
            //res.render({ items: items });
        }
    });
}
exports.createImage = function(obj, callback) {
    Image.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			item.save();
			//res.redirect('/upload_file'); //redirect to the feed 
		}
    callback(item)
	});
}
exports.likeImage = function() {
    
}