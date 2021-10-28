const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {body} = require('express-validator')
const { orderDetails, placeAnOrder } = require('../controllers/order')

router.post('/',[
  body('items').notEmpty().withMessage('please provide items'),
  body('tax').notEmpty().withMessage('please provide tax'),
  body('total').notEmpty().withMessage('please provide total'),
] , authenticate, placeAnOrder)

router.get('/', authenticate, orderDetails)

module.exports = router
