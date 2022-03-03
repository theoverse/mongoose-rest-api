const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/task')
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log(err));

const User = require('./model/User');
const Task = require('./model/Task');

app.post('/task', async (req, res) => {

    try {
        const task = new Task(req.body)
        await task.save()

        return res.status(201).json({ success: true, task })
    }
    catch (e) {
        return res.status(400).json({ success: false, message: e.message })
    }
})

app.post('/user', async (req, res) => {

    try {
        const user = new User(req.body)
        await user.save()

        return res.status(201).json({ success: true, user })
    }
    catch (e) {
        return res.status(400).json({ success: false, message: e.message })
    }
})

app.get('/task', async (req, res) => {
    const tasks = await Task.find()
    return res.json({ success: true, tasks })
});

app.get('/task/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (!task) {
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }

    return res.json({ success: true, task })
});

app.patch('/task/:id', async (req, res) => {

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        return res.json({ success: true, task })
    }

    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        })
    }
})

app.get('/user', async (req, res) => {
    const users = await User.find()
    return res.json({ success: true, users })
});

app.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    return res.json({ success: true, user })
});

app.patch('/user/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.json({ success: true, user })
    }

    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        })
    }
})


const host = '127.0.0.1';
const port = process.env.PORT || 4040;

app.listen(port, () => console.log(`Server is runing at http://${host}:${port}`));