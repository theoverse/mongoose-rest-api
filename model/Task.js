const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
})
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;