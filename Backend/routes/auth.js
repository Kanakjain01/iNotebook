const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "ThisIsJWTSecret";

const connectToMongo = require("../db");
connectToMongo();
// ROUTE 1 : Create a User using : POST "/api/auth/createuser". No login required
//  Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors , return Bad request and the errors

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //Check whether the user with this email  exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData);
      success = true;
      res.json({ success, authtoken });
      // res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
    // .then((user) => res.json(user))
    // .catch(err => {console.log(err)
    //  res.json({error:'Please entera unique value for email',message: err.message})})

    // res.send(req.body);
  }
);

// ROUTE 2 : Authenticate a User using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be  blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    console.log("here 89", email, password);
    try {
      let user = await User.findOne({ email });
      console.log(user, 92);
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credential" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credential",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error ");
    }
  }
);

// ROUTE 3 : Get loggedin User Details using : POST "/api/auth/getuser".login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    console.log(127);
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    console.log(user, 129);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error ");
  }
});
module.exports = router;
