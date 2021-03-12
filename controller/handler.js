const db = require('../model/db')
const Users = require('../model/Users')
const UsersPost = require('../model/UsersPost')

exports.HgetUserByEmail_Fname = (req, res) => {
    db.getUserByEmail_Fname(req.body.email, function (resp) {
        res.send(resp)
    })
}
exports.HcreateUser = (req, res) => {
    db.createUser(req.body.family_name, req.body.name, req.body.email, req.body.password, function (resp) {
        res.send(resp)
    })

}
exports.HdeleteUser = (req, res) => {
    db.deleteUser(req.body.family_name, req.body.email, function (resp) {
        res.send(resp)
    })
}
exports.HupdateUser = (req, res) => {
    db.updateUser(req.body.FnameA, req.body.FnameN, req.body.UemailA, req.body.UemailN, req.body.pswd, req.body.grades, req.body.nameN, function (resp) {
        res.send(resp)
    })
}
exports.HupdateUserProfileDescription = (req, res) => {
    db.updateUserProfileDescription(req.body.description, req.body.Uemail, function (resp) {
        res.send(resp)
    })
}
exports.HgetUserProfileDescription = (req, res) => {
    db.getUserProfileDescription(req.body.Uemail, function (resp) {
        res.send(resp)
    })
}
exports.HdeletetUserProfileDescription = (req, res) => {
    db.HdeletetUserProfileDescription(req.body.Uemail, function (resp) {
        res.send(resp)
    })
}
// A tester
exports.HgetImagebyEmail = (req, res) => {
    db.getImagesbyEmail(req.body.email, function (resp) {
        res.send(resp)
    })
}
exports.HcreateImage = (req, res) => {
    const obj = {
        email: req.body.email, //automatic filling of current user
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    db.createImage(obj, function (resp) {
        res.send(resp)
    })
}

exports.HaddUser = (req, res) => {
    user = new Users();
    user.addUser(req.body.family_name, req.body.name, req.body.email, req.body.password, function (resp) {
        res.send(resp)
    })

}

exports.HloginUser = (req, res) => {
    user = new Users();
    user.login(req.body.email, req.body.password, function (resp) {
        res.send(resp)
    })

}

exports.HaddPost = (req, res) => {
    userPost = new UsersPost();
    userPost.addPost(req.body.img, req.body.email, function (resp) {
        res.send(resp)
    })

}

exports.HgetAllPost = (req, res) => {
    userPost = new UsersPost();
    userPost.getAllPost(req.body.email, function (resp) {
        res.send(resp)
    })

}

exports.HlikePost = (req, res) => {
    userPost = new UsersPost();
    userPost.likePost(req.body.postid, function (resp) {
        res.send(resp)
    })

}
