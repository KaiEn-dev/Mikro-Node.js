const express = require("express");
const attributeCategoryRouter = express.Router();

const attributeCategoryDb = require("../database/attributeCategoryData");

attributeCategoryRouter.get("/", async (req, res, next) => {
  try {
    const attributeCategories = await attributeCategoryDb.getAll();
    res.status(200).json({ attributeCategories: attributeCategories });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

attributeCategoryRouter.get("/:attributeCategoryId", async (req, res, next) => {
  try {
    const attributeCategory = await attributeCategoryDb.getById(
      req.params.attributeCategoryId
    );
    res.status(200).json({ attributeCategory: attributeCategory });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

attributeCategoryRouter.get("/shop/:shopId", async (req, res, next) => {
  try {
    const attributeCategory = await attributeCategoryDb.getByShopId(
      req.params.shopId
    );
    res.status(200).json({ attributeCategory: attributeCategory });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

attributeCategoryRouter.post("/", async (req, res, next) => {
  try {
    const shopId = req.body.attributeCategory.shop_id;
    const attributeCategoryName = req.body.attributeCategory.a_category_name;
    const note = req.body.attributeCategory.note;
    const optional = req.body.attributeCategory.optional;
    const minimum = req.body.attributeCategory.minimum;
    const maximum = req.body.attributeCategory.maximum;
    const attributes = req.body.attributeCategory.attributes;
    const availability = req.body.attributeCategory.availability;
    const products = req.body.attributeCategory.products;

    const attributeCategory = await attributeCategoryDb
      .insertAttributeCategory(
        shopId,
        attributeCategoryName,
        note,
        optional,
        minimum,
        maximum,
        attributes,
        availability,
        products
      )
      .then((insertId) => {
        return attributeCategoryDb.getById(insertId);
      });
    res.json({ attributeCategory: attributeCategory });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

attributeCategoryRouter.put("/:attributeCategoryId", async (req, res, next) => {
  try {
    const attributeCategoryName = req.body.attributeCategory.a_category_name;
    const note = req.body.attributeCategory.note;
    const optional = req.body.attributeCategory.optional;
    const minimum = req.body.attributeCategory.minimum;
    const maximum = req.body.attributeCategory.maximum;
    const attributes = req.body.attributeCategory.attributes;
    const availability = req.body.attributeCategory.availability;
    const products = req.body.attributeCategory.products;
    const attributeCategoryId = req.params.attributeCategoryId;

    const attributeCategory = await attributeCategoryDb
      .updateAttributeCategory(
        attributeCategoryName,
        note,
        optional,
        minimum,
        maximum,
        attributes,
        availability,
        products,
        attributeCategoryId
      )
      .then(() => {
        return attributeCategoryDb.getById(attributeCategoryId);
      });
    res.json({ attributeCategory: attributeCategory });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

attributeCategoryRouter.put(
  "/products/:attributeCategoryId",
  async (req, res, next) => {
    try {
      const products = req.body.attributeCategory.products;
      const attributeCategoryId = req.params.attributeCategoryId;

      const attributeCategory = await attributeCategoryDb
        .updateAttributeCategoryProducts(products, attributeCategoryId)
        .then(() => {
          return attributeCategoryDb.getById(attributeCategoryId);
        });
      res.json({ attributeCategory: attributeCategory });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
);

attributeCategoryRouter.delete(
  "/:attributeCategoryId",
  async (req, res, next) => {
    try {
      const attributeCategoryId = req.params.attributeCategoryId;
      const response = await attributeCategoryDb.deleteAttributeCategory(
        attributeCategoryId
      );
      return res.sendStatus(204);
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = attributeCategoryRouter;
