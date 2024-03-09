const express = require('express');
const userRouter = express.Router()
const { userLogin, userRegister } = require('../controller/userController');

/* Routes */
userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);

module.exports = { userRouter }