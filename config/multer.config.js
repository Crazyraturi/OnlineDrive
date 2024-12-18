
const multer = require('multer');
const FirebaseStorage= require('multer-firebase-storage');
const firebase = require('./firebase.config')
const serviceAcccount = require('../adroit-standard-444814-r3-firebase-adminsdk-azr0e-f1835a84f5.json')

const storage = FirebaseStorage({
    credentials:firebase.credential.cert(serviceAcccount),
    bucketName : 'adroit-standard-444814-r3.firebasestorage.app',
    unique: true,

})


const uplode = multer({
    storage:storage,
})


module.exports = uplode;