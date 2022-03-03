const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/task')
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log(err));

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

app.use(userRoutes);
app.use(taskRoutes);

const host = '127.0.0.1';
const port = process.env.PORT || 4040;

app.listen(port, () => console.log(`Server is runing at http://${host}:${port}`));