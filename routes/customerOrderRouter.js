const express = require("express");
const customerOrderRouter = express.Router();

const customerOrderDb = require("../database/customerOrderData");

customerOrderRouter.get("/", async (req, res, next) => {
  try {
    const customerOrders = await customerOrderDb.getAll();
    res.status(200).json({ customerOrders: customerOrders });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

customerOrderRouter.get("/:orderId", async (req, res, next) => {
  try {
    const customerOrder = await customerOrderDb.getById(req.params.orderId);
    res.status(200).json({ customerOrder: customerOrder });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

customerOrderRouter.get("/shop/:shopId", async (req, res, next) => {
  try {
    const customerOrders = await customerOrderDb.getByShopId(req.params.shopId);
    res.status(200).json({ customerOrders: customerOrders });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

customerOrderRouter.post("/", async (req, res, next) => {
  try {
    const shopId = req.body.customerOrder.shopId;
    const customerInfo = req.body.customerOrder.customerInfo;
    const deliveryMethod = req.body.customerOrder.deliveryMethod;
    const orderMethod = req.body.customerOrder.orderMethod;
    const schedule = req.body.customerOrder.schedule;
    const items = req.body.customerOrder.items;
    const paymentMethod = req.body.customerOrder.paymentMethod;
    const totalPrice = req.body.customerOrder.totalPrice;
    const status = req.body.customerOrder.status;

    if (
      !shopId ||
      !customerInfo ||
      !deliveryMethod ||
      !orderMethod ||
      !schedule ||
      !items ||
      !paymentMethod ||
      !totalPrice ||
      !status
    ) {
      return res.sendStatus(400);
    }

    const customerOrder = await customerOrderDb
      .insertCustomerOrder(
        shopId,
        customerInfo,
        deliveryMethod,
        orderMethod,
        schedule,
        items,
        paymentMethod,
        totalPrice,
        status
      )
      .then((insertId) => {
        return customerOrderDb.getById(insertId);
      });
    res.json({ customerOrder: customerOrder });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

customerOrderRouter.put("/:orderId", async (req, res, next) => {
  try {
    const customerInfo = req.body.customerOrder.customer_info;
    const deliveryMethod = req.body.customerOrder.delivery_method;
    const orderMethod = req.body.customerOrder.order_method;
    const schedule = req.body.customerOrder.schedule;
    const items = req.body.customerOrder.items;
    const paymentMethod = req.body.customerOrder.payment_method;
    const totalPrice = req.body.customerOrder.total_price;
    const status = req.body.customerOrder.status;
    const orderId = req.params.orderId;

    if (
      !customerInfo ||
      !deliveryMethod ||
      !orderMethod ||
      !schedule ||
      !items ||
      !paymentMethod ||
      !totalPrice ||
      !status ||
      !orderId
    ) {
      return res.sendStatus(400);
    }

    const customerOrder = await customerOrderDb
      .updateCustomerOrder(
        customerInfo,
        deliveryMethod,
        orderMethod,
        schedule,
        items,
        paymentMethod,
        totalPrice,
        status,
        orderId
      )
      .then(() => {
        return customerOrderDb.getById(orderId);
      });
    res.json({ customerOrder: customerOrder });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

customerOrderRouter.delete("/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const response = await customerOrderDb.deleteCustomerOrder(orderId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = customerOrderRouter;
