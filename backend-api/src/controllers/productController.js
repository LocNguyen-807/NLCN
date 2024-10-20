const ApiError = require('../api-error');
const productAdjust = require('../adjust/product.adjust');
const jsend = require('../jsend');

exports.getAllProducts = async (req, res, next) => {
    let results = {
        products: [],
        metadata: {}
    }
    try{
        results = await productAdjust.getAllProducts(req.query);
        res.status(200).json(jsend.success(results));
    }catch(err){
        console.log(err);
        return next(new ApiError(500, 'Không thể lấy danh sách sản phẩm'));
    }
}

exports.createProduct = async (req, res, next) => {
    if(!req.body?.name || !req.body?.description || !req.body?.price || !req.body?.category_id){
        return next(new ApiError(400, 'Thiếu thông tin sản phẩm'));
    }
    try{
        const product = await productAdjust.createProduct(req.body);
        res.status(201).set('Location', `/api/products/${product.id}`).json(jsend.success(product));
    }catch(err){
        console.log(err);
        return next(new ApiError(500, 'Không thể tạo sản phẩm'));
    }
}

exports.editProduct = async (req, res, next) => {
    if(!req.params?.id){
        return next(new ApiError(400, 'Thiếu ID sản phẩm'));
    }
    try{
        const productId = req.params.id;
        const updatedProduct = await productAdjust.editProduct(productId, req.body);
        if(!updatedProduct){
            return next(new ApiError(404, 'Không tìm thấy sản phẩm'));
        }
        res.status(200).json(jsend.success(updatedProduct));
    }catch(err){
        console.log(err);
        return next(new ApiError(500, 'Không thể cập nhật sản phẩm'));
    }
}

exports.deleteProduct = async (req, res, next) => {
    if(!req.params?.id){
        return next(new ApiError(400, 'Thiếu ID sản phẩm'));
    }
    try{
        const productId = req.params.id;
        const deletedProduct = await productAdjust.deleteProduct(productId);
        if(!deletedProduct){
            return next(new ApiError(404, 'Không tìm thấy sản phẩm'));
        }
        res.status(200).json(jsend.success(deletedProduct));
    }catch(err){
        console.log(err);
        return next(new ApiError(500, 'Không thể xóa sản phẩm'));
    }
}
