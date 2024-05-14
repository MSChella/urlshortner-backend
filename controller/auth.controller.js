
require('dotenv').config();
// const express = require('express');
// const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');

const User = require('../models/user.model');


const register = async (req, res) => {
    try {
        const { username, password,
            firstName,
            lastName,
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,

        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const protectedRoute = (verifyToken, (req, res) => {

    res.json({ message: 'You have access to this protected route.' });
});



const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.username, userId: user._id }, 'mySecretKey123', { expiresIn: '1h' });


        res.status(200).json({ message: 'Signin successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = randomstring.generate(10);
    user.resetToken = resetToken;
    await user.save();

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ message: 'Email sent successfully' });
        }
    });
};

const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;
    const user = await User.findOne({ resetToken });

    if (!user) {
        return res.status(404).json({ message: 'Invalid or expired token' });
    }

    user.password = newPassword;
    user.resetToken = '';
    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
};

module.exports = {

    register,
    login,
    forgetPassword,
    resetPassword,
    protectedRoute

};

