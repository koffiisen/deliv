const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsersPost = function () {
    // create users schema
    this.schema = new mongoose.Schema({
        img: String,
        email: String,
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
        if (err) {
            callback({
                state: false,
                data: err
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
    })
};

UsersPost.prototype.likePost = function (postid, callback) {
    const self = this;

    self.postDB.findOneAndUpdate({_id: postid}, {$inc: {like: 1}}, {new: true},
        function (err, response) {
            if (err) {
                callback({
                    state: false,
                    data: []
                })
            } else {
                callback({
                    state: true,
                    data: response
                })
            }
        });

};
module.exports = UsersPost;


