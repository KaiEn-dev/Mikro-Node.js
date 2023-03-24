const express = require("express");
const productCategoryRouter = express.Router();

const productCategoryDb = require("../database/productCategoryData");

productCategoryRouter.get("/", async (req, res, next) => {
  try {
    const productCategories = await productCategoryDb.getAll();
    res.status(200).json({ productCategories: productCategories });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

productCategoryRouter.get("/:productCategoryId", async (req, res, next) => {
  try {
    const productCategory = await productCategoryDb.getById(
      req.params.productCategoryId
    );
    res.status(200).json({ productCategory: productCategory });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

productCategoryRouter.get("/shop/:shopId", async (req, res, next) => {
  try {
    const categories = await productCategoryDb.getByShopId(req.params.shopId);
    res.status(200).json({ categories: categories });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

productCategoryRouter.post("/", async (req, res, next) => {
  try {
    const shopId = req.body.productCategory.shop_id;
    const productCategoryName = req.body.productCategory.p_category_name;
    const products = req.body.productCategory.products;
    const availability = req.body.productCategory.availability;

    const productCategory = await productCategoryDb
      .insertProductCategory(
        shopId,
        productCategoryName,
        products,
        availability
      )
      .then((insertId) => {
        return productCategoryDb.getById(insertId);
      });
    res.json({ productCategory: productCategory });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

productCategoryRouter.put("/:productCategoryId", async (req, res, next) => {
  try {
    const shopId = req.body.productCategory.shop_id;
    const productCategoryName = req.body.productCategory.p_category_name;
    const products = req.body.productCategory.products;
    const availability = req.body.productCategory.availability;
    const productCategoryId = req.params.productCategoryId;

    const productCategory = await productCategoryDb
      .updateProductCategory(
        shopId,
        productCategoryName,
        products,
        availability,
        productCategoryId
      )
      .then(() => {
        return productCategoryDb.getById(productCategoryId);
      });
    res.json({ productCategory: productCategory });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

productCategoryRouter.put(
  "/products/:productCategoryId",
  async (req, res, next) => {
    try {
      const products = req.body.productCategory.products;
      const productCategoryId = req.params.productCategoryId;

      const productCategory = await productCategoryDb
        .updateProductCategoryProducts(
          products,

          productCategoryId
        )
        .then(() => {
          return productCategoryDb.getById(productCategoryId);
        });
      res.json({ productCategory: productCategory });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
);

productCategoryRouter.delete("/:productCategoryId", async (req, res, next) => {
  try {
    const productCategoryId = req.params.productCategoryId;
    const response = await productCategoryDb.deleteProductCategory(
      productCategoryId
    );
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = productCategoryRouter;
