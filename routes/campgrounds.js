const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const campgroundCtrl = require('../controllers/campgrounds_c');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

router.route('/')
    // Serve index page
    .get(catchAsync(campgroundCtrl.index))
    // Create new campground
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgroundCtrl.create));

// Serve new campground form
router.get('/new', isLoggedIn, campgroundCtrl.newForm);

router.route('/:id')
    // Serve show page
    .get(catchAsync(campgroundCtrl.show))
    // Update campground
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgroundCtrl.update))
    // Delete campground
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundCtrl.delete));

// Render edit form
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundCtrl.editForm));

module.exports = router;