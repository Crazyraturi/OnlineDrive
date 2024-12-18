const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//register page code

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 8 }),
  body("username").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      username,
      password: hashPassword,
    });

    res.json({ newUser });
  }
);

//login page code

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().isLength({ min: 5 }),
  body("password").trim().isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid credentials",
      });
    }

    const { username, password } = req.body;

    

    const user = await userModel.findOne({ username: username });

    if (!user) {
      console.log("User not found for username:", username);
      return res.status(400).json({
        message: "Incorrect username or password" ,
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email, 
        username: user.username,


      },
     
      process.env.JWT_SECRET
    );
     
    console.log(user.id)
    res.cookie('token',token)
    res.send("Logged in")
  }
);

module.exports = router;
