const ApiError = require('../api-error');
const userAdjust = require('../adjust/user.adjust');
const jsend = require('../jsend');

//Danh sách người dùng
exports.getAllUsers = async (req, res, next) => {
    let results = {
        users: [],
        metadata: {},
    }
    try{
        results = await userAdjust.getAllUsers(req.query);
        res.status(200).json(jsend.success(results));
    }catch(err){
        console.log(err);
        return next(new ApiError(500, 'Không thể lấy danh sách người dùng'));
    }
};

//Thêm người dùng
exports.createUser = async (req, res, next) => {
    if(!req.body?.username || !req.body?.email || !req.body?.password || !req.body?.phone || !req.body?.address || !req.body?.role_id){
        return next(new ApiError(400, 'Thiếu thông tin người dùng'));
    }
    try{
        const user = await userAdjust.makeUser(req.body);
        res.status(201).set('Location', `/api/users/${user.id}`).json(jsend.success(user));
    }catch(err){
        console.log(err);
        return next(new ApiError(500, 'Không thể tạo người dùng'));
    }
}

//Sửa người dùng
exports.editUser = async (req, res, next) => {
    if (!req.params?.id) {
        return next(new ApiError(400, 'Thiếu ID người dùng'));
    }
    try {
        const userId = req.params.id;
        const updatedUser = await userAdjust.editUser(userId, req.body);
        if (!updatedUser) {
            return next(new ApiError(404, 'Không tìm thấy người dùng'));
        }
        res.status(200).json(jsend.success(updatedUser));
    } catch (err) {
        console.log(err);
        return next(new ApiError(500, 'Không thể cập nhật thông tin người dùng'));
    }
};

//Xóa người dùng
exports.deleteUser = async (req, res, next) => {
    if (!req.params?.id) {
        return next(new ApiError(400, 'Thiếu ID người dùng'));
    }
    try {
        const userId = req.params.id;
        const deletedUser = await userAdjust.deleteUser(userId);
        if (!deletedUser) {
            return next(new ApiError(404, 'Không tìm thấy người dùng'));
        }
        res.status(200).json(jsend.success({ message: 'Người dùng đã được xóa thành công', deletedUser }));
    } catch (err) {
        console.log(err);
        return next(new ApiError(500, 'Không thể xóa người dùng'));
    }
};
