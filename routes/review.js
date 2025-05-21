const express = require("express");
// const Listing = require("../models/listing");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
// const ExpressError = require("../utils/ExpressError");
// const mongoose = require("mongoose");
// const Review = require("../models/review");
const { isloggedIn, isReviewAuthor } = require("../middleware.js");

const reviewControllers = require("../controllers/reviews.js");

// Reviews route
router.post("/", isloggedIn, reviewControllers.createReview);

// Delete review route
router.delete(
  "/:reviewID",
  isloggedIn,
  isReviewAuthor,
  wrapAsync(reviewControllers.deleteReview)
);

module.exports = router;
