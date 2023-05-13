const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Harryisagoodb$oy";

const connectToMongo = require("../db"); // y import hogya
connectToMongo(); // y call hogya aur niche dekh database se connect bhi hogya dekh rhi h ?? haa aarha h?haa good ab models dekh kya hote h
// y teri server file h main ab m cbhah rha hu
//  toh same idhar h tumeh ek basic schema bna dena h jisme wo uss schema ko bhar bhar k data bnega
// Create a User using : POST "/api/auth/createuser". No login required
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
    // If there are errors , return Bad request and the errors
    //  y req, res y yahi h req means request, respoonse res ab dekhna
    // console.log(req.body); // ab y dekh y h server jo request lega client se  toh req.body krke hume wo data mil jata h jo bheja gya h request m client ki tarafs e
    // const user = User(req.body);
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with this email  exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name, // rs mtlb server restart krne k liye m aaya 2 min
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
      res.json({ authtoken });
      // res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
    // .then((user) => res.json(user))
    // .catch(err => {console.log(err)
    //  res.json({error:'Please entera unique value for email',message: err.message})})

    // res.send(req.body); //toh response m mene req.body hi wapas bhej diya  aaya ??haa krta khud  haa kro nhi aaye toh aajana raat m aaunga abhi wait krte m tym chla jata h raat m aaunga ohk
  }
);
// toh humne api hit ki thunder m thunder clieint hogya jisne request ki kisse jidahr y api bni h mtlb yahi hjo h ab usne jo hit kraya uske hissaab se humne response bhej diya ohk ok ab bss thoda kri aajaega itna hi tha y baar baar send kr rha tha toh iska data aata jaa rha mera nhi aarha yaad h mene kaha tha hum log  api hit krate m chahe toh data bhi bhej skte h toh hum log data bhejte h body k andar bhejte h  jb hit krate h  y data bhejugna m jb hit kraunga
// konsa h tera

// Authenticate a User using : POST "/api/auth/login". No login required
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be  blank").exists()
  ],
  async (req, res) => {
    // If there are errors , return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
      let user = User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Sorry"})
      }
    } catch (error) {
      
    }
  }
);
module.exports = router;
