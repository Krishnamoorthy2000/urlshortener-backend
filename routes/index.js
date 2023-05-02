const express = require("express");

const router = express.Router();
const shortid = require("shortid");
const UrlPair = require("../schema/schema");




// Route to handle URL shortening requests
router.post("/shorten", async (req, res) => {
  const longUrl = req.body.url;

  // Generate a short ID for the URL
  const shortId = shortid.generate();

  // Create a new URL pair document
  const urlPair = new UrlPair({
    longUrl: longUrl,
    shortId: shortId,
  });

  // Save the URL pair to the database
  await urlPair.save();

  // Return the short URL to the client
  res.send(`https://urlshortener-backend-uesn.onrender.com/${shortId}`);
});

// Route to handle short URL redirection
router.get("/:shortId", async (req, res) => {
  const urlPair = await UrlPair.findOne({ shortId: req.params.shortId });

  // If the short ID is not found in the database, return a 404 response
  if (!urlPair) {
    return res.status(404).send("URL not found");
  }

  // Redirect the client to the long URL
  res.redirect(urlPair.longUrl);
});

module.exports = router;
