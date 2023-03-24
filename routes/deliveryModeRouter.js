const express = require("express");
const deliveryModeRouter = express.Router();

const deliveryModeDb = require("../database/deliveryModeData");

deliveryModeRouter.get("/", async (req, res, next) => {
  try {
    const deliveryModes = await deliveryModeDb.getAll();
    res.status(200).json({ deliveryModes: deliveryModes });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

deliveryModeRouter.get("/:dmId", async (req, res, next) => {
  try {
    const deliveryMode = await deliveryModeDb.getById(req.params.dmId);
    res.status(200).json({ deliveryMode: deliveryMode });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

deliveryModeRouter.get("/shop/:shopId", async (req, res, next) => {
  try {
    const deliveryMode = await deliveryModeDb.getByShopId(req.params.shopId);
    res.status(200).json({ deliveryMode: deliveryMode });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

deliveryModeRouter.post("/", async (req, res, next) => {
  try {
    const shopId = req.body.deliveryMode.shop_id;
    const delivery = req.body.deliveryMode.delivery;
    const deliveryTime = req.body.deliveryMode.delivery_time;
    const pickup = req.body.deliveryMode.pickup;
    const pickupTime = req.body.deliveryMode.pickup_time;

    const deliveryMode = await deliveryModeDb
      .insertDeliveryMode(shopId, delivery, deliveryTime, pickup, pickupTime)
      .then((insertId) => {
        return deliveryModeDb.getById(insertId);
      });
    res.json({ deliveryMode: deliveryMode });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

deliveryModeRouter.put("/:deliveryModeId", async (req, res, next) => {
  try {
    const shopId = req.body.deliveryMode.shop_id;
    const delivery = req.body.deliveryMode.delivery;
    const deliveryTime = req.body.deliveryMode.delivery_time;
    const pickup = req.body.deliveryMode.pickup;
    const pickupTime = req.body.deliveryMode.pickup_time;
    const deliveryModeId = req.params.deliveryModeId;

    const deliveryMode = await deliveryModeDb
      .updateDeliveryMode(
        shopId,
        delivery,
        deliveryTime,
        pickup,
        pickupTime,
        deliveryModeId
      )
      .then(() => {
        return deliveryModeDb.getById(deliveryModeId);
      });
    res.json({ deliveryMode: deliveryMode });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

deliveryModeRouter.delete("/:deliveryModeId", async (req, res, next) => {
  try {
    const deliveryModeId = req.params.deliveryModeId;
    const response = await deliveryModeDb.deleteDeliveryMode(deliveryModeId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = deliveryModeRouter;
