const express = require('express');
const userController = require('../controllers/userController');
const errorController = require('../controllers/errorController');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/users', router);

    router.get('/', userController.getAllUsers);
    router.post('/', userController.createUser);
    router.put('/:id', userController.editUser);
    router.delete('/:id', userController.deleteUser);


    router.all('*', errorController.methodNotAllowed);
}
