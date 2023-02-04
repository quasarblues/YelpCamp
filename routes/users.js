const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const userCtrl = require('../controllers/users_c');

router.route('/register')
    // Render user registration form
    .get(userCtrl.newUserForm)
    // Create new user
    .post(catchAsync(userCtrl.create))


router.route('/login')
    // Render login form
    .get(userCtrl.loginForm)
    // User login
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), userCtrl.login);
// Logout user
router.get('/logout', userCtrl.logout)

module.exports = router;