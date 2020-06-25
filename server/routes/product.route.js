const express = require('express');
const router = express.Router();

const productController = require('../controller/product.controller');

router.route('/addProduct').post(productController.addProduct);

router.route('/getAllProduct').get(productController.getAllProduct);

router.route('/updateProduct').put(productController.updateProduct);

router.route('/deleteProduct').delete(productController.deleteProduct);

module.exports = router;
