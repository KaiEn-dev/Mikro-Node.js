const express = require("express");
const deliveryAreaRouter = express.Router();

const deliveryAreaDb = require("../database/deliveryAreaData");

deliveryAreaRouter.get("/", async (req, res, next) => {
  try {
    const deliveryAreas = await deliveryAreaDb.getAll();
    res.status(200).json({ deliveryAreas: deliveryAreas });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

deliveryAreaRouter.get("/:deliveryAreaId", async (req, res, next) => {
  try {
    const deliveryArea = await deliveryAreaDb.getById(
      req.params.deliveryAreaId
    );
    res.status(200).json({ deliveryArea: deliveryArea });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

deliveryAreaRouter.get("/shop/:shopId", async (req, res, next) => {
  try {
    const deliveryArea = await deliveryAreaDb.getByShopId(req.params.shopId);
    res.status(200).json({ deliveryArea: deliveryArea });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

deliveryAreaRouter.post("/", async (req, res, next) => {
  try {
    const shopId = req.body.deliveryArea.shop_id;
    const wholeMalaysia = req.body.deliveryArea.whole_malaysia;
    const area = req.body.deliveryArea.area;

    const deliveryArea = await deliveryAreaDb
      .insertDeliveryArea(shopId, wholeMalaysia, area)
      .then((insertId) => {
        return deliveryAreaDb.getById(insertId);
      });
    res.json({ deliveryArea: deliveryArea });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

deliveryAreaRouter.put("/:deliveryAreaId", async (req, res, next) => {
  try {
    const shopId = req.body.deliveryArea.shop_id;
    const wholeMalaysia = req.body.deliveryArea.whole_malaysia;
    const area = req.body.deliveryArea.area;
    const deliveryAreaId = req.params.deliveryAreaId;

    const deliveryArea = await deliveryAreaDb
      .updateDeliveryArea(shopId, wholeMalaysia, area, deliveryAreaId)
      .then(() => {
        return deliveryAreaDb.getById(deliveryAreaId);
      });
    res.json({ deliveryArea: deliveryArea });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

deliveryAreaRouter.put("/shop/:shopId", async (req, res, next) => {
  try {
    const wholeMalaysia = req.body.deliveryArea.whole_malaysia;
    const area = req.body.deliveryArea.area;
    const shopId = req.params.shopId;

    const deliveryArea = await deliveryAreaDb
      .updateAreaByShop(wholeMalaysia, area, shopId)
      .then(() => {
        return deliveryAreaDb.getById(shopId);
      });
    res.json({ deliveryArea: deliveryArea });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

deliveryAreaRouter.delete("/:deliveryAreaId", async (req, res, next) => {
  try {
    const deliveryAreaId = req.params.deliveryAreaId;
    const response = await deliveryAreaDb.deleteDeliveryArea(deliveryAreaId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = deliveryAreaRouter;
