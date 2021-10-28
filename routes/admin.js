const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const { addProduct, getAllProducts, getMensCollection,
  getWomenCollection, getKidsCollection
} = require('../controllers/product');

router.post('/upload',[
  body('name').notEmpty().withMessage('Name is required'),
  body('brand').notEmpty().withMessage('Brand is required'),
  body('price').notEmpty().withMessage('Price is required'),
  body('qty').notEmpty().withMessage('Qty is required'),
  body('image').notEmpty().withMessage('Image is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('usage').notEmpty().withMessage('Usage is required'),
],addProduct);

router.get('/', getAllProducts);
router.get('/men', getMensCollection);
router.get('/women', getWomenCollection);
router.get('/kid', getKidsCollection);


module.exports = router;
