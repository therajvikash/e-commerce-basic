const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//register or add user
const Register = async (req , res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(401).json({errors : errors.array()});
  }
  try {
    // read the form data
    let {name , email , password} = req.body;

    // user already exists or not
    let user = await User.findOne({email : email});
    if(user){
      return res.status(401).json({errors : [{msg : 'User already exists'}]});
    }
    // encode the password
    let salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password , salt);

    // insert into database
    user = new User({name , email , password});
    user = await user.save();
    res.status(200).json({
      result : 'success',
      user : user
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({errors : [{msg : 'Server Error'}]});
  }
};

///login
const Login = async (req , res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(401).json({errors : errors.array()});
  }
  try {
    // get the form data
    let {email , password} = req.body;

    // check email is exists or not
    let user = await User.findOne({email : email});
    if(!user){
      return res.status(401).json({ errors : [ {msg : 'Invalid Credentials'}]});
    }
    // verify the password
    let isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
      return res.status(401).json({ errors : [ {msg : 'Invalid Credentials'}]});
    }
    // create a token and send to client
    let payload = {
      user : {
        id : user.id
      }
    };
    jwt.sign(payload, process.env.JWT_SECRET_KEY, (err, token) => {
      if(err) throw err;
      res.status(200).json({
        result : 'Login Success',
        token : token
      });
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({errors : [{msg : 'Server Error'}]});
  }
};

module.exports = {
  Register, Login
}
