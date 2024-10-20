const express = require('express');
const productController = require('../controllers/productController');
const errorController = require('../controllers/errorController');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/products', router);

    router.get('/', productController.getAllProducts);
    router.post('/', productController.createProduct);
    router.put('/:id', productController.editProduct);
    router.delete('/:id', productController.deleteProduct);

    router.all('*', errorController.methodNotAllowed);
}
