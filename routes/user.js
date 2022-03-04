const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    login,
} = require('../controller/userController')

router.post('/user', createUser);
router.post('/user/login', login);
router.get('/user', getAllUsers);
router.get('/user/:id', getSingleUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser)

module.exports = router