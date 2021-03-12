const express = require('express');
const Router = express.Router()
const handler = require('../controller/handler')
const app = require('../app.js')

Router.get('/get/user', handler.HgetUserByEmail_Fname)
Router.post('/add/user', handler.HcreateUser)
Router.delete('/delete/user', handler.HdeleteUser)
Router.post('/update/user', handler.HupdateUser)
Router.post('/update/profiledesc', handler.HupdateUserProfileDescription)
Router.get('/get/profiledesc', handler.HgetUserProfileDescription)
Router.delete('/delete/profiledesc', handler.HdeletetUserProfileDescription)
Router.get('/get/desc', handler.HdeletetUserProfileDescription)

// A tester
Router.get('/get/image', handler.HgetImagebyEmail)
Router.post('/create/image', handler.HcreateImage)
Router.post('/addUser', handler.HaddUser)
Router.post('/login', handler.HloginUser)
Router.post('/addPost', handler.HaddPost)
Router.post('/getAllPost', handler.HgetAllPost)
Router.post('/likePost', handler.HlikePost)

module.exports = Router
