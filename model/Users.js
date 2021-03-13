const mongoose = require('mongoose');
const {Schema} = mongoose;

const Users = function () {
    // create users schema
    this.schema = new mongoose.Schema({
        family_name: String,
        name: String,
        email: {type: String, unique: true},
        password: String,
        grade: {type: Number, default: 0},
        description: String,
        date: {type: Date, default: Date.now},
    });
    // bind schema with database
    this.userDB = mongoose.model('Users', this.schema);
};

Users.prototype.addUser = function (family_nameM, nameM, emailM, passwordM, descriptionM, callback) {
    const self = this;
    self.userDB.find({email: emailM}, function (err, docs) {
        if (docs.length) {
            callback({
                state: false,
                data: "Email already exists"
            })
        } else {
            const user = new self.userDB({
                family_name: family_nameM,
                name: nameM,
                email: emailM,
                password: passwordM,
                description: descriptionM
            });
            user.save().then(function () {
                callback({
                    state: true,
                    data: docs
                })
            });
        }
    })
};

Users.prototype.login = function (emailM, passwordM, callback) {
    const self = this;
    self.userDB.find({email: emailM, password: passwordM}, function (err, docs) {
        if (docs.length) {
            callback({
                state: true,
                data: []
            })
        } else {
            callback({
                state: false,
                data: []
            })
        }
    })
};

Users.prototype.delete = function (Fname, Uemail, callback) {
    const self = this;

    self.userDB.deleteOne({family_name: Fname, email: Uemail}, function (err, docs) {
        if (err) {
            callback({
                state: false,
                data: []
            })
        } else {
            if (docs.length > 0) {
                callback({
                    state: true,
                    data: docs
                })
            } else {
                callback({
                    state: false,
                    data: []
                })
            }
        }
    });
};

module.exports = Users;


