const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task')
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log(err));

const User = require('./model/User');
const Task = require('./model/Task');

async function db() {

    try {
        const user = new User({
            name: 'Dorian',
            age: 31,
            email: 'dgray@gmail.com',
            password: '12345'
        })
        await user.save();
        console.log(user)
    }

    catch (e) {
        console.log(e.message)
    }
}

db()