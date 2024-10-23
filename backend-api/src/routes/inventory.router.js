const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports.setup = (app) => {
    app.use('/api/inventory', router);
    
    router.get('/', inventoryController.getAllInventory);
    router.post('/', inventoryController.createInventory);
    router.put('/:id', inventoryController.updateInventory);
    router.delete('/:id', inventoryController.deleteInventory);
    // router.get('/top-selling', inventoryController.getTopSelling);
    router.get('/low-stock', inventoryController.checkLowStock);
    // router.put('/:id/sold', authMiddleware.isAdmin, inventoryController.updateSoldQuantity);

}


module.exports = router;