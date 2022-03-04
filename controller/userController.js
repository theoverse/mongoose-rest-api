const bcrypt = require('bcryptjs');
const User = require('../model/User');

exports.createUser = async (req, res) => {

    try {
        const user = new User(req.body)
        await user.save()

        return res.status(201).json({ success: true, user })
    }
    catch (e) {
        return res.status(400).json({ success: false, message: e.message })
    }
}

exports.getAllUsers = async (req, res) => {
    const users = await User.find()
    return res.json({ success: true, users })
}

exports.getSingleUser = async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    return res.json({ success: true, user })
}

exports.updateUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        const keys = Object.keys(req.body);

        for (let key of keys) {
            user[key] = req.body[key]
        }
        await user.save();

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
}

exports.deleteUser = async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.json({ success: true, user })
    }

    catch (e) {
        return res.status(404).json({
            success: false,
            message: e.message,
        })
    }
}

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Email'
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Password'
        });
    }

    return res.status(200).json({
        success: true,
        user,
    });
}