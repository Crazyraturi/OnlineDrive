const express = require("express");
const fileModel = require("../models/files.models");
const router = express.Router();
const uplode = require("../config/multer.config");
const authMiddleware = require("../middlewares/auth");
const Firebase = require('../config/firebase.config')

router.get("/home", authMiddleware, async (req, res) => {
  const userFiles = await fileModel.find({
    user: req.user.userId,
  });




  res.render('home',{
    files:userFiles
  })

});

router.post(
  "/upload",
  authMiddleware,
  uplode.single("file"),
  async (req, res) => {
    const newFile = await fileModel.create({
      originalname: req.file.originalname,
      user: req.user.userId,
    });

    res.json(newFile);
  }
);


router.get('/download/:path',authMiddleware,async(req,res )=>{
    const loggedInUserId= req.user.userId;
    const path= req.params.path;


    const file =await fileModel.findOne({
        user:loggedInUserId,
        path:path
    })

    if (!file){
        return res.status(401).json({
            message:'unauthorised'
        })
    }
  const signedUrl = await Firebase.storage().bucket().file(path).getSignedUrl({
     action:'read',
     expires:Date.now()+60*1000
  })

  res.redirect(signedUrl[0])

})

module.exports = router;
