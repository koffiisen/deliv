const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsersPost = function () {
    // create users schema
    this.schema = new mongoose.Schema({
        img: String,
        email: {type: String, unique: true},
        like: {type: Number, default: 0},
        date: {type: Date, default: Date.now},
    });
    // bind schema with database
    this.postDB = mongoose.model('UsersPost', this.schema);
};

UsersPost.prototype.addPost = function (img, email, callback) {
    const self = this;
    const post = new self.postDB({img: img, email: email});
    post.save().then(function () {
        callback({
            state: true,
            data: []
        })
    }).catch(function () {
        callback({
            state: false,
            data: []
        })
    });
};

UsersPost.prototype.getAllPost = function (email, callback) {
    const self = this;
    self.postDB.find({email: email}, function (err, docs) {
        if (docs.length) {
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
    })
};

UsersPost.prototype.likePost = function (email, postid, callback) {
    const self = this;
    self.postDB.find({email: email}, function (err, docs) {
        if (docs.length) {
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
    })
};

module.exports = UsersPost;


