const express = require("express");
const productRouter = express.Router();

const productDb = require("../database/productData");

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await productDb.getAll();
    res.status(200).json({ products: products });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

productRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await productDb.getById(req.params.productId);
    res.status(200).json({ product: product });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

productRouter.get("/shop/:shopId", async (req, res, next) => {
  try {
    const products = await productDb.getByShopId(req.params.shopId);
    res.status(200).json({ products: products });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

productRouter.post("/", async (req, res, next) => {
  try {
    const shopId = req.body.product.shop_id;
    const productName = req.body.product.product_name;
    const productImage = req.body.product.product_image;
    const productDescription = req.body.product.product_description;
    const price = req.body.product.price;
    const productAttribute = req.body.product.product_attribute;
    const availability = req.body.product.availability;

    const product = await productDb
      .insertProduct(
        shopId,
        productName,
        productImage,
        productDescription,
        price,
        productAttribute,
        availability
      )
      .then((insertId) => {
        return productDb.getById(insertId);
      });
    res.json({ product: product });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

productRouter.put("/:productId", async (req, res, next) => {
  try {
    const shopId = req.body.product.shop_id;
    const productName = req.body.product.product_name;
    const productImage = req.body.product.product_image;
    const productDescription = req.body.product.product_description;
    const price = req.body.product.price;
    const productAttribute = req.body.product.product_attribute;
    const availability = req.body.product.availability;
    const productId = req.params.productId;

    const product = await productDb
      .updateProduct(
        shopId,
        productName,
        productImage,
        productDescription,
        price,
        productAttribute,
        availability,
        productId
      )
      .then(() => {
        return productDb.getById(productId);
      });
    res.json({ product: product });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

productRouter.delete("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const response = await productDb.deleteProduct(productId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = productRouter;
