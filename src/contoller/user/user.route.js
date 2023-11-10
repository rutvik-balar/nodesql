const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { verifyToken } = require('./user.middleware');

router.post('/login', userController.loginUsers);
router.get('/', verifyToken(['admin']), userController.getUsers);
router.post('/', userController.createUser);
router.patch('/', verifyToken, userController.updateUser);
router.delete('/', verifyToken, userController.deleteUser);

module.exports = router;

