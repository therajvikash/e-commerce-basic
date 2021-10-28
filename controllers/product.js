const Product = require('../models/Product')
const {validationResult} = require('express-validator')


//Add Product http://localhost:5000/admin/upload/
const addProduct = async (req, res )=> {
  let errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(401).json({errors : errors.array()});
  }
  try {
    // get the form data
    let newProduct = {
      name : req.body.name,
      brand : req.body.brand,
      price : req.body.price,
      qty : req.body.qty,
      image : req.body.image,
      category : req.body.category,
      description : req.body.description,
      usage : req.body.usage
    };
    // check any product is already exists or not
    let product = await Product.findOne({name : newProduct.name});
    if(product){
      return res.status(401).json({
        msg : 'Product is already exists'
      })
    }

    // insert into database
    product = new Product(newProduct);
    product = await product.save();
    res.status(200).json({
      result : 'Successfully Uploaded',
      product : product
    });
  }
  catch (error) {
    res.status(500).json({
      errors : [
        {msg : error.message}
      ]
    })
  }
};

//get all Product  http://localhost:5000/admin/upload/
const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json(products);
  }
  catch (error) {
    res.status(500).json({
      errors : [
        {msg : error.message}
      ]
    });
  }
};


//get category by wise data
const getMensCollection = async (req, res) => {
  try {
    let products = await Product.find({category : 'MEN'});
    res.status(200).json(products);
  }
  catch (error) {
    res.status(500).json({
      errors : [
        {msg : error.message}
      ]
    });
  }
};
const getWomenCollection = async (req, res) => {
  try {
    let products = await Product.find({category : 'WOMEN'});
    res.status(200).json(products);
  }
  catch (error) {
    res.status(500).json({
      errors : [
        {msg : error.message}
      ]
    });
  }
};
const getKidsCollection = async (req, res) => {
  try {
    let products = await Product.find({category : 'KID'});
    res.status(200).json(products);
  }
  catch (error) {
    res.status(500).json({
      errors : [
        {msg : error.message}
      ]
    });
  }
};
module.exports = {
  addProduct,
  getAllProducts,
  getMensCollection,
  getWomenCollection,
  getKidsCollection
}
