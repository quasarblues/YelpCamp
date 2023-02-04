const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviewCtrl = require('../controllers/reviews_c');

const Campground = require('../models/campground');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

// Post new review
router.post('/', isLoggedIn, validateReview, catchAsync(reviewCtrl.newReview))

// Delete review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewCtrl.delete))

module.exports = router;