const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task')
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log(err));

const User = require('./model/User');
const Task = require('./model/Task')