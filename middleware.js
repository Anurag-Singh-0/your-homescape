const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");

// Middleware to check for valid ObjectId
const isValidObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ExpressError(404, "Page Not Found"));
  }
  next();
};

// Middleware to check if listing exists
const isListingExists = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return next(new ExpressError(404, "Page Not Found"));
  }
  res.locals.listing = listing; // Pass listing to route handler if needed
  next();
};

// Middleware to check if user is logged in or not
const isloggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to create a listing!");
    return res.redirect("/login");
  }
  next();
};

const isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listings = await Listing.findById(id);
  if (!listings.owner._id.equals(res.locals.currentUser._id)) {
    req.flash(
      "error",
      "You don't have permission, You are not the owner of this listing"
    );
    return res.redirect(`/listings/${id}`);
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { id, reviewID } = req.params;

  const review = await Review.findById(reviewID);
  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You don't have permission to delete this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports = {
  isValidObjectId,
  isListingExists,
  isloggedIn,
  isOwner,
  isReviewAuthor,
};
