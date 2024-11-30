const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');
const router = express.Router();
const authController = require('../controller/auth');

router.put('/signup', [
    body('email')
        .trim()
        .isEmail()
        .withMessage('please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-Mail Adress is Already exists.')
                }
            })
        })
        .normalizeEmail(),

        body('password')
        .trim()
        .isLength({min: 8}),

        body('name')
        .trim()
        .not()
        .isEmpty()
], authController.signup)

router.post('/login', authController.Login)

module.exports = router;
