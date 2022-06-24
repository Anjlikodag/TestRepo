require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const auth = require("./middleware/auth");
const productrouter=require("./productroute");
const productsc=require("./models/product");

app.use(productrouter);
const app = express();

app.use(express.json());

app.post("/welcome", auth, (req, res) => { //if user is exist then ye msg milega
  res.status(200).send("Welcome valide user");
});

app.post("/auth/register", async (req, res) => {

  
    try {
      // Get user input
      const { title, name, email, password} = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        title,                                     
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        
      });
  
      // Create token
      const token = jwt.sign(                 // firstname: req.body.firstname,
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    
  });

  app.post("/auth/login", async (req, res) => {

    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    
  });
  

module.exports = app;