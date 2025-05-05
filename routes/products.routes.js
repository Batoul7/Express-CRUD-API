const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

// Definition of product paths
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);
router.get('/export/json', productsController.exportToJson);

module.exports = router;