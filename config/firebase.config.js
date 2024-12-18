const Firebase = require('firebase-admin');


const serviceAcccount = require('../adroit-standard-444814-r3-firebase-adminsdk-azr0e-f1835a84f5.json')


const firebase = Firebase .initializeApp({
    credential: Firebase.credential.cert(serviceAcccount),
    storageBucket :"adroit-standard-444814-r3.firebasestorage.app"
})

module.exports = Firebase