var express = require("express");
var router = express.Router();
var fetchArtists = require("../lib/fetchArtists");
router.get("/", (req, res) => {
  var artistUrls = [
    "https://e.snmc.io/i/150/w/ed9c8f3f7ac4a4dbbc0364a4b25fb0e4/5196436",
    "https://e.snmc.io/i/150/w/1b4108569782341e9531e7df7c41ba85/5349268",
    "https://e.snmc.io/i/150/w/d0b0ac67afc27e2d6b24ede5abc0e0c1/6951983",
    "https://e.snmc.io/i/150/w/dacb91f7deb123b38a937a462224ce33/5805553",
    "https://e.snmc.io/i/150/w/920c3d7a41b6f4f9b2494ec35b3e8b7f/5375436"
  ];

  res.render("main", { layout: "index", artistUrls });
});

router.get("/bearer/:bearer", async (req, res, next) => {
  // Get 25 music names and imgurls
  var bearerToken = req.params.bearer;

  // Fetch artisttable
  var artists = await fetchArtists(bearerToken);
  console.log(artists);
  var artistTable;
  res.render("main", { layout: "index", artistTable, bearerToken });
});

router.post("/", async (req, res, next) => {
  // Get 25 music names and imgurls
  var bearer = req.body.bearer;
  return res.redirect("/bearer/" + bearer);
});

module.exports = router;
