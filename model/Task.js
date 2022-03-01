const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: String,
    isCompleted: Boolean,
})
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;