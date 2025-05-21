const Listing = require("../models/listing");
const Review = require("../models/review");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");

module.exports.createReview = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review Added!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteReview = async (req, res, next) => {
  let { id, reviewID } = req.params;

  // Validate IDs
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(reviewID)
  ) {
    return next(new ExpressError(404, "Invalid ID"));
  }

  // Removing review reference from listing
  const listing = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewID },
  });

  if (!listing) {
    return next(new ExpressError(404, "Listing not found"));
  }

  // Deleting the review
  const review = await Review.findByIdAndDelete(reviewID);
  if (!review) {
    return next(new ExpressError(404, "Review not found"));
  }
  req.flash("success", "Review Deleted!");

  res.redirect(`/listings/${id}`);
};
