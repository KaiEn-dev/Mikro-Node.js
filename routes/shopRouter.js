const express = require("express");
const shopRouter = express.Router();

const shopDb = require("../database/shopData");

shopRouter.get("/", async (req, res, next) => {
  try {
    const shops = await shopDb.getAll();
    res.status(200).json({ shops: shops });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

shopRouter.get("/:shopId", async (req, res, next) => {
  try {
    const shop = await shopDb.getById(req.params.shopId);
    res.status(200).json({ shop: shop });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

shopRouter.get("/user/:userId", async (req, res, next) => {
  try {
    const shop = await shopDb.getByUser(req.params.userId);
    res.status(200).json({ shop: shop });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

shopRouter.post("/", async (req, res, next) => {
  try {
    const userId = req.body.shop.user_id;
    const shopName = req.body.shop.shop_name;
    const shopImage = req.body.shop.shop_image;
    const shopDescription = req.body.shop.shop_description;
    const availability = req.body.shop.availability;
    const productCategory = req.body.shop.p_category;
    const address = req.body.shop.address;

    const shop = await shopDb
      .insertShop(
        userId,
        shopName,
        shopImage,
        shopDescription,
        availability,
        productCategory,
        address
      )
      .then((insertId) => {
        return shopDb.getById(insertId);
      });
    res.json({ shop: shop });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

shopRouter.put("/:shopId", async (req, res, next) => {
  try {
    const userId = req.body.shop.user_id;
    const shopName = req.body.shop.shop_name;
    const shopImage = req.body.shop.shop_image;
    const shopDescription = req.body.shop.shop_description;
    const availability = req.body.shop.availability;
    const productCategory = req.body.shop.p_category;
    const address = req.body.shop.address;
    const shopId = req.params.shopId;

    const shop = await shopDb
      .updateShop(
        userId,
        shopName,
        shopImage,
        shopDescription,
        availability,
        productCategory,
        address,
        shopId
      )
      .then(() => {
        return shopDb.getById(shopId);
      });
    res.json({ shop: shop });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

shopRouter.put("/putAddress/:shopId", async (req, res, next) => {
  try {
    const address = req.body.shop.address;
    const shopId = req.params.shopId;

    if (!address || !shopId) {
      return res.sendStatus(400);
    }

    const shop = await shopDb.updateShopAddress(address, shopId).then(() => {
      return shopDb.getById(shopId);
    });
    res.json({ shop: shop });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

shopRouter.put("/putLink/:shopId", async (req, res, next) => {
  try {
    const shopLink = req.body.shop.shop_link;
    const shopId = req.params.shopId;

    if (!shopLink || !shopId) {
      return res.sendStatus(400);
    }

    const shop = await shopDb.updateShopLink(shopLink, shopId).then(() => {
      return shopDb.getById(shopId);
    });
    res.json({ shop: shop });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

shopRouter.put("/availability/:shopId", async (req, res, next) => {
  try {
    const availability = req.body.shop.availability;
    const shopId = req.params.shopId;

    const shop = await shopDb
      .updateShopAvailability(availability, shopId)
      .then(() => {
        return shopDb.getById(shopId);
      });
    res.json({ shop: shop });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

shopRouter.delete("/:shopId", async (req, res, next) => {
  try {
    const shopId = req.params.shopId;
    const response = await shopDb.deleteShop(shopId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = shopRouter;
