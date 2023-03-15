const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const router = Router();

// auth - middleware to get acces to format of Link
// it's needed to avoid not authorized could create links
router.post("/generate", auth, async (req, res) => {
  try {
    // getting server link from config
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();

    // check if this link already exists
    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }
    const to = baseUrl + "/t/" + code;

    // create new object of link
    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    // need to get user from front firstly
    const links = await Link.find({ owner: req.user.userId }); // i signed it with jwt.sign in auth.routes:76
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
