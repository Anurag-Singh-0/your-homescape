const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const axios = require("axios");

//Get Index page
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index", {
    allListings,
    layout: "layouts/boilerplate",
  });
};

//To show index page
module.exports.showPage = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  res.render("listings/show.ejs", {
    listing,
    layout: "layouts/boilerplate",
  });
};

// To Create new listings
module.exports.createListing = async (req, res) => {
  const { location, country } = req.body.listing;
  let url = req.file.path;
  let filename = req.file.filename;

  const geoResponse = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: `${location}, ${country}`,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "HomeScape",
      },
    }
  );

  const coordinates = geoResponse.data[0]
    ? [parseFloat(geoResponse.data[0].lon), parseFloat(geoResponse.data[0].lat)]
    : [80.9462, 26.8467]; // fallback: Lucknow

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = {
    type: "Point",
    coordinates: coordinates, // [longitude, latitude]
  };

  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
  console.log("Request body:", req.body);
};

// For Edit Listing
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Page Not Found");
  res.render("listings/edit.ejs", { listing });
};

// For update listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = { url, filename };
    await listing.save();
  }

  if (!listing) throw new ExpressError(404, "Page Not Found");
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// For Delete listing
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndDelete(id);
  if (!listing) throw new ExpressError(404, "Page Not Found");
  req.flash("success", "Listing Deleted");

  res.redirect("/listings");
};
