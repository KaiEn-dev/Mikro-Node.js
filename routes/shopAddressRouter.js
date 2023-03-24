const express = require("express");
const addressRouter = express.Router();

const addressDb = require("../database/shopAddressData");

addressRouter.get("/", async (req, res, next) => {
  try {
    const addresses = await addressDb.getAll();
    res.status(200).json({ addresses: addresses });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

addressRouter.get("/:addressId", async (req, res, next) => {
  try {
    const address = await addressDb.getById(req.params.addressId);
    res.status(200).json({ address: address });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

addressRouter.get("/shop/:shopId", async (req, res, next) => {
  try {
    const address = await addressDb.getByShopId(req.params.shopId);
    res.status(200).json({ address: address });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

addressRouter.post("/", async (req, res, next) => {
  try {
    const shopId = req.body.address.shop_id;
    const address = req.body.address.address;
    const postcode = req.body.address.postcode;
    const latitude = req.body.address.latitude;
    const longitude = req.body.address.longitude;

    if (!shopId || !address || !postcode || !latitude || !longitude) {
      return res.sendStatus(400);
    }

    const shopAddress = await addressDb
      .insertAddress(shopId, address, postcode, latitude, longitude)
      .then((insertId) => {
        return addressDb.getById(insertId);
      });
    res.json({ address: shopAddress });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

addressRouter.put("/:addressId", async (req, res, next) => {
  try {
    const shopId = req.body.address.shop_id;
    const address = req.body.address.address;
    const postcode = req.body.address.postcode;
    const latitude = req.body.address.latitude;
    const longitude = req.body.address.longitude;
    const addressId = req.params.addressId;

    if (
      !shopId ||
      !address ||
      !postcode ||
      !latitude ||
      !longitude ||
      !addressId
    ) {
      return res.sendStatus(400);
    }

    const shopAddress = await addressDb
      .updateAddress(shopId, address, postcode, latitude, longitude, addressId)
      .then(() => {
        return addressDb.getById(addressId);
      });
    res.json({ address: shopAddress });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

addressRouter.delete("/:addressId", async (req, res, next) => {
  try {
    const addressId = req.params.addressId;
    const response = await addressDb.deleteAddress(addressId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = addressRouter;
