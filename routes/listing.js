const express = require("express");
const Listing = require("../models/listing");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

const listingsController = require("../controllers/listings.js");

const {
  isloggedIn,
  isValidObjectId,
  isListingExists,
  isOwner,
} = require("../middleware.js");

// Index route
router.get("/", wrapAsync(listingsController.index));

//New route
router.get("/new", isloggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Search Route
router.get("/search", async (req, res) => {
  const { q } = req.query;
  const regex = new RegExp(q, "i"); // case-insensitive search
  const listings = await Listing.find({
    $or: [{ title: regex }, { location: regex }, { description: regex }],
  });

  if (listings.length === 0) {
    req.flash("error", "No listings found for this search.");
    return res.redirect("/listings");
  }

  res.render("listings/index", { allListings: listings });
});

//Show Listing Route
router.get(
  "/:id",
  isValidObjectId,
  isListingExists,
  wrapAsync(listingsController.showPage)
);

//Create new listing route
router.post(
  "/",
  isloggedIn,
  upload.single("listing[image]"),
  wrapAsync(listingsController.createListing)
);

//Edit listing Route
router.get(
  "/:id/edit",
  isValidObjectId,
  isloggedIn,
  wrapAsync(listingsController.editListing)
);

//Update listing route
router.put(
  "/:id",
  isValidObjectId,
  isloggedIn,
  isOwner,
  upload.single("listing[image]"),
  wrapAsync(listingsController.updateListing)
);

//Delete listing route
router.delete(
  "/:id",
  isValidObjectId,
  isloggedIn,
  wrapAsync(listingsController.deleteListing)
);

module.exports = router;
