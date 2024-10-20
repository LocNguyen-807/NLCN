const ApiError = require('../api-error');
const reviewAdjust = require('../adjust/review.adjust');
const jsend = require('../jsend');

// Lấy tất cả đánh giá
// exports.getAllReviews = async (req, res, next) => {
//     let results = {
//         reviews: [],
//         metadata: {}
//     }
//     try {
//         results = await reviewAdjust.getAllReviews(req.query);
//         res.status(200).json(jsend.success(results));
//     } catch (err) {
//         console.log(err);
//         return next(new ApiError(500, 'Không thể lấy danh sách đánh giá'));
//     }
// };

// Thêm đánh giá
exports.createReview = async (req, res, next) => {
    if (!req.body?.user_id || !req.body?.product_id || !req.body?.rating || !req.body?.comment) {
        return next(new ApiError(400, 'Thiếu thông tin đánh giá'));
    }
    try {
        const review = await reviewAdjust.makeReview(req.body);
        res.status(201).set('Location', `/api/reviews/${review.id}`).json(jsend.success(review));
    } catch (err) {
        console.log(err);
        return next(new ApiError(500, 'Không thể tạo đánh giá'));
    }
};

// Sửa đánh giá
exports.editReview = async (req, res, next) => {
    if (!req.params?.id) {
        return next(new ApiError(400, 'Thiếu ID đánh giá'));
    }
    try {
        const reviewId = req.params.id;
        const updatedReview = await reviewAdjust.editReview(reviewId, req.body);
        if (!updatedReview) {
            return next(new ApiError(404, 'Không tìm thấy đánh giá'));
        }
        res.status(200).json(jsend.success(updatedReview));
    } catch (err) {
        console.log(err);
        return next(new ApiError(500, 'Không thể cập nhật đánh giá'));
    }
};

// Xóa đánh giá
exports.deleteReview = async (req, res, next) => {
    if (!req.params?.id) {
        return next(new ApiError(400, 'Thiếu ID đánh giá'));
    }
    try {
        const reviewId = req.params.id;
        const deletedReview = await reviewAdjust.deleteReview(reviewId);
        if (!deletedReview) {
            return next(new ApiError(404, 'Không tìm thấy đánh giá'));
        }
        res.status(200).json(jsend.success({ message: 'Đánh giá đã được xóa thành công', deletedReview }));
    } catch (err) {
        console.log(err);
        return next(new ApiError(500, 'Không thể xóa đánh giá'));
    }
};

