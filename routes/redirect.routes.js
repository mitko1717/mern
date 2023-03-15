const { Router } = require("express");
const Link = require("../models/Link");
const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code }); // getting unique link

    if (link) {
      link.clicks++;
      await link.save();
      return res.redirect(link.from); // link added from input
    }

    res.status(404).json("link not found");
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
