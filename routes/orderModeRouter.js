const express = require("express");
const orderModeRouter = express.Router();

const orderModeDb = require("../database/orderModeData");

orderModeRouter.get("/", async (req, res, next) => {
  try {
    const orderModes = await orderModeDb.getAll();
    res.status(200).json({ orderModes: orderModes });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

orderModeRouter.get("/:orderModeId", async (req, res, next) => {
  try {
    const orderMode = await orderModeDb.getById(req.params.orderModeId);
    res.status(200).json({ orderMode: orderMode });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

orderModeRouter.get("/shop/:shopId", async (req, res, next) => {
  try {
    const ordeMode = await orderModeDb.getByShopId(req.params.shopId);
    res.status(200).json({ orderMode: ordeMode });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

orderModeRouter.post("/", async (req, res, next) => {
  try {
    const shopId = req.body.orderMode.shop_id;
    const orderNow = req.body.orderMode.order_now;
    const preorder = req.body.orderMode.preorder;
    const preorderOption = req.body.orderMode.preorder_option;

    const orderMode = await orderModeDb
      .insertOrderMode(shopId, orderNow, preorder, preorderOption)
      .then((insertId) => {
        return orderModeDb.getById(insertId);
      });
    res.json({ orderMode: orderMode });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

orderModeRouter.put("/:orderModeId", async (req, res, next) => {
  try {
    const shopId = req.body.orderMode.shop_id;
    const orderNow = req.body.orderMode.order_now;
    const preorder = req.body.orderMode.preorder;
    const preorderOption = req.body.orderMode.preorder_option;
    const orderModeId = req.params.orderModeId;

    const orderMode = await orderModeDb
      .updateOrderMode(shopId, orderNow, preorder, preorderOption, orderModeId)
      .then(() => {
        return orderModeDb.getById(orderModeId);
      });
    res.json({ orderMode: orderMode });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

orderModeRouter.delete("/:orderModeId", async (req, res, next) => {
  try {
    const orderModeId = req.params.orderModeId;
    const response = await orderModeDb.deleteOrderMode(orderModeId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = orderModeRouter;
