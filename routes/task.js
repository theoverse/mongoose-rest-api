const express = require('express');
const router = express.Router();

const {
    storeTask,
    fetchAllTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require('../controller/taskController')

router.post('/task', storeTask);
router.get('/task', fetchAllTask);
router.get('/task/:id', getSingleTask);
router.patch('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

module.exports = router;