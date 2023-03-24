const express = require("express");
const profileRouter = express.Router();

const profileDb = require("../database/profileData");

profileRouter.get("/", async (req, res, next) => {
  try {
    const profiles = await profileDb.getAll();
    res.status(200).json({ profiles: profiles });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

profileRouter.get("/:profileId", async (req, res, next) => {
  try {
    const profile = await profileDb.getById(req.params.profileId);
    res.status(200).json({ profile: profile });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

profileRouter.post("/", async (req, res, next) => {
  try {
    const username = req.body.profile.username;
    const email = req.body.profile.email;
    const password = req.body.profile.password;

    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    const profile = await profileDb
      .insertProfile(username, email, password)
      .then((insertId) => {
        return profileDb.getById(insertId);
      });
    res.json({ profile: profile });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

profileRouter.put("/:userId", async (req, res, next) => {
  try {
    const username = req.body.profile.username;
    const email = req.body.profile.email;
    const password = req.body.profile.password;
    const userId = req.params.userId;

    if (!username || !email || !password || !userId) {
      return res.sendStatus(400);
    }

    const profile = await profileDb
      .updateProfile(username, email, password, userId)
      .then(() => {
        return profileDb.getById(userId);
      });
    res.json({ profile: profile });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

profileRouter.delete("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const response = await profileDb.deleteProfile(userId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = profileRouter;
