const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsersFollow = function () {
    // create users schema
    this.schema = new mongoose.Schema({
        email: String,
        followers: []
    });
    // bind schema with database
    this.followDB = mongoose.model('UsersFollow', this.schema);
};

UsersFollow.prototype.addFollower = function (emailUser, emailFollower, callback) {
    const self = this;
    self.followDB.find({email: emailUser}, function (err, docs) {
        if (err) {
            callback({
                state: false,
                data: err
            })
        } else {
            if (docs.length > 0) {
                self.updateFollower(emailUser, emailFollower, callback)
            } else {
                const follower = new self.followDB({
                    email: emailUser,
                    followers: [emailFollower]
                });
                follower.save().then(function () {
                    callback({
                        state: true,
                        data: docs
                    })
                }).catch(function () {
                    callback({
                        state: false,
                        data: "error to save"
                    })
                });
            }
        }
    })
};

UsersFollow.prototype.getAllFollower = function (emailUser, callback) {
    const self = this;
    self.followDB.find({email: emailUser}, function (err, docs) {
        if (err) {
            callback({
                state: false,
                data: err
            })
        } else {
            if (docs.length > 0) {
                callback({
                    state: true,
                    data: docs.followers,
                    total: docs.followers.length
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

UsersFollow.prototype.updateFollower = function (emailUser, emailFollower, callback) {
    const self = this;

    self.postDB.findOneAndUpdate({email: emailUser}, {$addToSet: {followers: emailFollower}}, {new: true},
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
module.exports = UsersFollow;


