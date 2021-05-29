const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Password = require("../models/Password");
const auth = require("../middleware/auth");

//  @route        GET api/passwords
//  @desc         Get all user passwords
//  @access       Private
router.get("/", auth, async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(passwords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/passwords/:team
router.get("/:team", auth, async (req, res) => {
  try {
    const passwords = await Password.find({ team: req.params.team }).sort({
      date: -1,
    });
    res.json(passwords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  @route      POST api/passwords
//  @desc       Add new password
//  @access     Private
router.post(
  "/",
  [
    auth,
    [
      check("siteUrl", "URL is required").not().isEmpty(),
      check("username", "Username is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { siteUrl, username, pword, team } = req.body;
    try {
      const newPassword = new Password({
        siteUrl,
        username,
        pword,
        team,
        user: req.user.id,
      });
      const newPass = await newPassword.save();
      res.json(newPass);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/passwords/:id
// @desc      Update contact
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { siteUrl, username, pword, team } = req.body;

  // Build password object
  const passwordFields = {};
  if (siteUrl) passwordFields.siteUrl = siteUrl;
  if (username) passwordFields.username = username;
  if (pword) passwordFields.pword = pword;
  if (team) passwordFields.team = team;

  try {
    let password = await Password.findById(req.params.id);

    if (!password) return res.status(404).json({ msg: "Password not found" });

    // Make sure user owns password
    if (password.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    password = await Password.findByIdAndUpdate(
      req.params.id,
      { $set: passwordFields },
      { new: true }
    );

    res.json(password);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/passwords/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let password = await Password.findById(req.params.id);

    if (!password) return res.status(404).json({ msg: "Password not found" });

    // Make sure user owns password
    if (password.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Password.findByIdAndRemove(req.params.id);

    res.json({ msg: "Password removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
