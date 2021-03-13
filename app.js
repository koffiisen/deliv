// Import all dependencies & middleware here
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Schema} = mongoose;
const Router = require('./routes/routes')

mongoose.set('useCreateIndex', true)
//mongodb://u8f2zcxqiyi0abryburm:cL4NCI4H3Y6Ij0ucIM02@bn6ixksojju0rpu-mongodb.services.clever-cloud.com:27017/bn6ixksojju0rpu
mongoose.connect('mongodb://u8f2zcxqiyi0abryburm:cL4NCI4H3Y6Ij0ucIM02@bn6ixksojju0rpu-mongodb.services.clever-cloud.com:27017/bn6ixksojju0rpu', {useNewUrlParser: true, useUnifiedTopology: true });

// Init an Exconspress App.
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");

// use all controllers(APIs) here && // Use your dependencies here
app.get('/', (req, res) => {
   res.status(200).json({
      status: 'Server Run successfully'
   });
});
// Start Server here
app.listen(PORT, () => {
   console.log('Server is running on port 8080!');
});
//base de donnée mongoDB

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/back',Router);

//---------IMAGE ADDING-----------------
