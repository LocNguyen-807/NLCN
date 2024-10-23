const inventoryAdjust = require('../adjust/inventory.adjust');
const ApiError = require('../api-error');
const jsend = require('jsend');

// Lấy tất cả inventory
exports.getAllInventory = async (req, res, next) => {
    try {
        const inventories = await inventoryAdjust.getAllInventory();
        res.status(200).json(jsend.success(inventories));
    } catch (err) {
        return next(new ApiError(500, 'Không thể lấy danh sách inventory'));
    }
};

// Tạo inventory mới
exports.createInventory = async (req, res, next) => {
    try {
        const data = {
            product_id: req.body.product_id,
            stock_quantity: req.body.stock_quantity || 0,
            restock_level: req.body.restock_level || 10,
            restock_quantity: 0, // Mặc định là 0 khi tạo mới
            sold_quantity: 0, // Mặc định là 0
            last_restock_date: null
        };

        const newInventory = await inventoryAdjust.makeInventory(data);
        res.status(201).json(jsend.success(newInventory));
    } catch (err) {
        return next(new ApiError(500, 'Lỗi khi tạo inventory'));
    }
};

// Cập nhật inventory
exports.updateInventory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const currentInventory = await inventoryAdjust.inventory().where({ id }).first();
        
        if (!currentInventory) {
            return next(new ApiError(404, 'Không tìm thấy inventory'));
        }

        const data = {
            product_id: req.body.product_id || currentInventory.product_id,
            restock_level: req.body.restock_level || currentInventory.restock_level,
        };

        // Nếu có restock_quantity mới
        if (req.body.restock_quantity) {
            data.restock_quantity = req.body.restock_quantity;
            data.stock_quantity = currentInventory.stock_quantity + req.body.restock_quantity;
            data.last_restock_date = new Date();
        }

        const updatedInventory = await inventoryAdjust.editInventory(id, data);
        res.status(200).json(jsend.success(updatedInventory));
    } catch (err) {
        return next(new ApiError(500, 'Lỗi khi cập nhật inventory'));
    }
};

// Xóa inventory
exports.deleteInventory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedInventory = await inventoryAdjust.deleteInventory(id);
        
        if (!deletedInventory) {
            return next(new ApiError(404, 'Không tìm thấy inventory'));
        }

        res.status(200).json(jsend.success(deletedInventory));
    } catch (err) {
        return next(new ApiError(500, 'Lỗi khi xóa inventory'));
    }
};

// Lấy sản phẩm bán chạy
// exports.getTopSelling = async (req, res, next) => {
//     try {
//         const limit = parseInt(req.query.limit) || 10;
//         const topSelling = await inventoryAdjust.getTopSellingProducts(limit);
//         res.status(200).json(jsend.success(topSelling));
//     } catch (err) {
//         return next(new ApiError(500, 'Lỗi khi lấy danh sách sản phẩm bán chạy'));
//     }
// };

// Kiểm tra hàng tồn kho thấp
exports.checkLowStock = async (req, res, next) => {
    try {
        const lowStockItems = await inventoryAdjust.inventory()
            .where('stock_quantity', '<=', knex.raw('restock_level'))
            .select('*');
        
        res.status(200).json(jsend.success(lowStockItems));
    } catch (err) {
        return next(new ApiError(500, 'Lỗi khi kiểm tra hàng tồn kho'));
    }
};

// Cập nhật số lượng đã bán (chỉ dành cho admin hoặc hệ thống)
// exports.updateSoldQuantity = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const currentInventory = await inventoryAdjust.inventory().where({ id }).first();
        
//         if (!currentInventory) {
//             return next(new ApiError(404, 'Không tìm thấy inventory'));
//         }

//         // Kiểm tra quyền admin
//         if (!req.user || !req.user.isAdmin) {
//             return next(new ApiError(403, 'Không có quyền thực hiện thao tác này'));
//         }

//         const soldQuantity = req.body.sold_quantity;
//         if (soldQuantity > currentInventory.stock_quantity) {
//             return next(new ApiError(400, 'Số lượng bán vượt quá số lượng tồn kho'));
//         }

//         const data = {
//             sold_quantity: soldQuantity,
//             stock_quantity: currentInventory.stock_quantity - soldQuantity
//         };

//         const updatedInventory = await inventoryAdjust.editInventory(id, data);
//         res.status(200).json(jsend.success(updatedInventory));
//     } catch (err) {
//         return next(new ApiError(500, 'Lỗi khi cập nhật số lượng đã bán'));
//     }
// };