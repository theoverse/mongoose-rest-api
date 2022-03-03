const express = require('express');
const router = express.Router();

const {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
} = require('../controller/userController')

router.post('/user', createUser);
router.get('/user', getAllUsers);
router.get('/user/:id', getSingleUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser)

module.exports = router