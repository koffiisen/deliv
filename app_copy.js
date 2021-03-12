// Import all dependencies & middleware here
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Init an Exconspress App. 
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Use your dependencies here
const {Schema} = mongoose; 
// use all controllers(APIs) here
app.get('/', (req, res) => {
   res.status(200).json({
      status: 'Server Run successfully'
   });
});
// Start Server here
app.listen(8080, () => {
   console.log('Server is running on port 8080!');
});

//base de donnée mongoDB 
//mongoose.connect('mongodb+srv://deliverHome:test@cluster0.ddyzt.mongodb.net/test',{useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect('mongodb://localhost:27017/DeliverHome', {useNewUrlParser: true, useUnifiedTopology: true });

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
    data : Buffer,
    //like : {type : Array, default : 0},
    like: [{
        type: String
    }],
    date : {type : Date, default : Date.now}, 
})

const User = mongoose.model("User", User_schema);
const UserProfileDescription = mongoose.model("UserProfileDescription", UserProfileDescription_schema);
const Publication = mongoose.model("Publication", Publication_schema);


createUser = function(family_nameM,nameM, emailM, passwordM){
    const user = new User({family_name:family_nameM,name:nameM, email:emailM, password:passwordM});
    user.save().then(function(){
        console.log("User créée : ",user);
    });
};
createUserProfileDescription = function(descriptionM,UemailM){
    const UPdescription = new UserProfileDescription({description : descriptionM,Uemail : UemailM});
    UPdescription.save().then(function(){
        console.log("Description de profil créé : ",UPdescription);
    });
};
createPublication = function(typeM, descriptionM, UemailM, dataM){
    const publication = new Publication({type : typeM, description : descriptionM, Uemail : UemailM, data : dataM});
    Publication.save().then(function(){
        console.log("Publication créée : ",Publication);
    });
};

//TEST CREATION DE USER
/*
createUser("doro4", "enguerrand4", "4test@gmail.com", "test4")
createUser("doro3", "enguerrand3", "3test@gmail.com", "test3")
createUser("doro2", "enguerrand2", "2test@gmail.com", "test2")

createUser("doro12", "enguerrand12", "12test@gmail.com", "test12")
*/
//TEST CREATION DE USER PROFILE DESCRIPTION
/** 
createUserProfileDescription("Hello je m'appelle Blaise Pascalette !","12test@gmail.com")
**/
//createUserProfileDescription("Hello je m'appelle Blaise Pascalette !","12test@gmail.com")
const getUserByEmail_Fname = function(Fname,Uemail,callback){
    User.find({ family_name : Fname, email : Uemail }, function (err, docs) { 
        if (err){ 
            console.log(err); 
        }
        else{ 
            console.log("Trouvé : ", docs); 
        }
        callback(docs)
    });
}
const deleteUser = function(Fname,Uemail,callback){
    User.deleteOne({family_name : Fname, email : Uemail }, function(err,docs) {
    if (err){ 
            console.log(err); 
        }
        else{ 
            console.log("Trouvé : ", docs); 
        }
        callback(docs)
    });
}
const updateUser = function(FnameA,FnameN,UemailA,UemailN, pswd, grades, nameN, callback){
    User.updateOne({family_name : FnameA, email : UemailA },{family_name:FnameN,name:nameN, email:UemailN, password:pswd, grade:grades, date:dateM} ,function(err,docs) {
    if (err){ 
            console.log(err); 
        }
        else{ 
            console.log("Trouvé : ", docs); 
        }
        callback(docs)
    });
}

const CcreateUser = function(family_nameM,emailM,nameM,passwordM, callback) {
    User.find({email : emailM }, function(err,docs) {
    console.log(docs)
        if (docs.length){
          callback('User exists already')
        } else {
            //callback(nok)
            const user = new User({family_name:family_nameM,name:nameM, email:emailM, password:passwordM});
            user.save().then(function(){
                console.log("User créée : ",user);
                callback(user)
            });
          }
    })
}
//En guise de test 
//getUserByEmail_Fname("doro12","12test@gmail.com",function(res){
//    console.log(res)
//})

//Se servir de ce model pour créer toutes les routes GET - PUT - UPDATE - DELETE
app.get('/get/user', (req, res) => { 
    getUserByEmail_Fname(req.body.family_name,req.body.email, function(resp){
      res.send(resp)
      })
  })
app.post('/add/user', (req, res) => { 
    createUser(req.body.family_name, req.body.name, req.body.email, req.body.password, function(resp){
      res.send(resp)
      })
  })
  //ROUTE ET FONCTIONS A TESTER OBLIGATOIREMENT 
app.delete('/delete/user', (req, res) => { 
    deleteUser(req.body.family_name,req.body.email, function(resp){
      res.send(resp)
      })
  })
app.post('/update/user', (req, res) => { 
    updateUser(req.body.FnameA,req.body.FnameN,req.body.UemailA,req.body.UemailN, req.body.pswd, req.body.grades, req.body.nameN, function(resp){
      res.send(resp)
      })
  })

app.post('/test/add', (req, res) => { 
    CcreateUser(req.body.family_name,req.body.email,req.body.name,req.body.password, function(resp){
      console.log(req.body.email)
      res.send(resp)
      })
  })