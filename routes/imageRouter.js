const express = require("express");
const imageRouter = express.Router();

const imageDb = require("../database/imageData");

imageRouter.get("/", async (req, res, next) => {
  try {
    const images = await imageDb.getAll();
    res.status(200).json({ images: images });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

imageRouter.get("/:imageId", async (req, res, next) => {
  try {
    const image = await imageDb.getById(req.params.imageId);
    res.status(200).json({ image: image });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

imageRouter.post("/", async (req, res, next) => {
  try {
    const imageLink = req.body.image.image_link;

    if (!imageLink) {
      return res.sendStatus(400);
    }

    const image = await imageDb.insertImage(imageLink).then((insertId) => {
      return imageDb.getById(insertId);
    });
    res.json({ image: image });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

imageRouter.put("/:imageId", async (req, res, next) => {
  try {
    const imageLink = req.body.image.image_link;
    const imageId = req.params.imageId;

    if (!imageLink || !imageId) {
      return res.sendStatus(400);
    }

    const image = await imageDb.updateImage(imageLink, imageId).then(() => {
      return imageDb.getById(imageId);
    });
    res.json({ image: image });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

imageRouter.delete("/:imageId", async (req, res, next) => {
  try {
    const imageId = req.params.imageId;
    const response = await imageDb.deleteImage(imageId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = imageRouter;
