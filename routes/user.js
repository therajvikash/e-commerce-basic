const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const { Register, Login} = require('../controllers/user');

router.post('/register', [
  body('name').notEmpty().withMessage('User Name is Required'),
  body('email').isEmail().withMessage('Enter a proper Email'),
  body('password').isLength({min : 6}).withMessage('Enter a proper Password'),
], Register);

router.post('/login',[
    body('email').isEmail().withMessage('Enter a proper Email'),
    body('password').isLength({min : 6}).withMessage('Enter a proper Password')
  ],Login)





module.exports = router;
