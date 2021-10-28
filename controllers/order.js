const {validationResult} = require('express-validator');
const Order = require('../models/Order');
const User = require('../models/User');


//localhost:5000/order/
const placeAnOrder =  async (request , response) => {
  // To Place an Order logic
  let errors = validationResult(request);
  if(!errors.isEmpty()){
    return response.status(401).json({errors : errors.array()});
  }
  try {
    // get user info from database
    let user = await User.findById(request.user.id); // id received from token thru authenticate.js
    // create an order & save to DB
    let order = new Order({
      name : user.name,
      email : user.email,
      items : request.body.items,
      tax : request.body.tax,
      total : request.body.total
    });
    order = await order.save();
    response.status(200).json({
      result : 'success',
      order : order
    });
  }
  catch (error) {
    console.error(error);
    response.status(500).json({errors : [{msg : 'Server Error'}]});
  }
};

//localhost:5000/order/
const orderDetails = async (request , response) => {
  // To Get All Orders	Logic
  try {
    let orders = await Order.find();
    response.status(200).json({
      result : 'success',
      orders : orders
    });
  }
  catch (error) {
    console.error(error);
    response.status(500).json({errors : [{msg : 'Server Error'}]});
  }
};
module.exports = {
  placeAnOrder,
  orderDetails
};
