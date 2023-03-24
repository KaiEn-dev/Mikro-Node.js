const express = require("express");
const attributeRouter = express.Router();

const attributeDb = require("../database/attributeData");

attributeRouter.get("/", async (req, res, next) => {
  try {
    const attributes = await attributeDb.getAll();
    res.status(200).json({ attributes: attributes });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

attributeRouter.get("/:attributeId", async (req, res, next) => {
  try {
    const attribute = await attributeDb.getById(req.params.attributeId);
    res.status(200).json({ attribute: attribute });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

attributeRouter.get("/category/:categoryId", async (req, res, next) => {
  try {
    const attributes = await attributeDb.getByCategoryId(req.params.categoryId);
    res.status(200).json({ attributes: attributes });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

attributeRouter.post("/", async (req, res, next) => {
  try {
    const categoryId = req.body.attribute.a_category_id;
    const attributeName = req.body.attribute.a_name;
    const charge = req.body.attribute.charge;
    const availability = req.body.attribute.availability;

    const attribute = await attributeDb
      .insertAttribute(categoryId, attributeName, charge, availability)
      .then((insertId) => {
        return attributeDb.getById(insertId);
      });
    res.json({ attribute: attribute });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

attributeRouter.put("/:attributeId", async (req, res, next) => {
  try {
    const categoryId = req.body.attribute.a_category_id;
    const attributeName = req.body.attribute.a_name;
    const charge = req.body.attribute.charge;
    const availability = req.body.attribute.availability;
    const attributeId = req.params.attributeId;

    const attribute = await attributeDb
      .updateAttribute(
        categoryId,
        attributeName,
        charge,
        availability,
        attributeId
      )
      .then(() => {
        return attributeDb.getById(attributeId);
      });
    res.json({ attribute: attribute });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

attributeRouter.delete("/:attributeId", async (req, res, next) => {
  try {
    const attributeId = req.params.attributeId;
    const response = await attributeDb.deleteAttribute(attributeId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = attributeRouter;
