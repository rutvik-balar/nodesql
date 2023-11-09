const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/login', userController.loginUsers);
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.patch('/', userController.updateUser);
router.delete('/', userController.deleteUser);

module.exports = router;

