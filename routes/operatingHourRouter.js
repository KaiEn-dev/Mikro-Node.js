const express = require("express");
const operatingHourRouter = express.Router();

const operatingHourDb = require("../database/operatingHourData");

operatingHourRouter.get("/", async (req, res, next) => {
  try {
    const operatingHours = await operatingHourDb.getAll();
    res.status(200).json({ operatingHours: operatingHours });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

operatingHourRouter.get("/:ohId", async (req, res, next) => {
  try {
    const operatingHour = await operatingHourDb.getById(req.params.ohId);
    res.status(200).json({ operatingHour: operatingHour });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

operatingHourRouter.get("/shop/:shopId", async (req, res, next) => {
  try {
    const operatingHour = await operatingHourDb.getByShopId(req.params.shopId);
    res.status(200).json({ operatingHour: operatingHour });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

operatingHourRouter.post("/", async (req, res, next) => {
  try {
    const shopId = req.body.operatingHour.shop_id;
    const mon = req.body.operatingHour.mon;
    const monOpen = req.body.operatingHour.mon_open;
    const monClose = req.body.operatingHour.mon_close;
    const tues = req.body.operatingHour.tues;
    const tuesOpen = req.body.operatingHour.tues_open;
    const tuesClose = req.body.operatingHour.tues_close;
    const wed = req.body.operatingHour.wed;
    const wedOpen = req.body.operatingHour.wed_open;
    const wedClose = req.body.operatingHour.wed_close;
    const thur = req.body.operatingHour.thur;
    const thurOpen = req.body.operatingHour.thur_open;
    const thurClose = req.body.operatingHour.thur_close;
    const fri = req.body.operatingHour.fri;
    const friOpen = req.body.operatingHour.fri_open;
    const friClose = req.body.operatingHour.fri_close;
    const sat = req.body.operatingHour.sat;
    const satOpen = req.body.operatingHour.sat_open;
    const satClose = req.body.operatingHour.sat_close;
    const sun = req.body.operatingHour.sun;
    const sunOpen = req.body.operatingHour.sun_open;
    const sunClose = req.body.operatingHour.sun_close;

    const operatingHour = await operatingHourDb
      .insertOperatingHour(
        shopId,
        mon,
        monOpen,
        monClose,
        tues,
        tuesOpen,
        tuesClose,
        wed,
        wedOpen,
        wedClose,
        thur,
        thurOpen,
        thurClose,
        fri,
        friOpen,
        friClose,
        sat,
        satOpen,
        satClose,
        sun,
        sunOpen,
        sunClose
      )
      .then((insertId) => {
        return operatingHourDb.getById(insertId);
      });
    res.json({ operatingHour: operatingHour });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

operatingHourRouter.put("/:operatingHourId", async (req, res, next) => {
  try {
    const shopId = req.body.operatingHour.shop_id;
    const mon = req.body.operatingHour.mon;
    const monOpen = req.body.operatingHour.mon_open;
    const monClose = req.body.operatingHour.mon_close;
    const tues = req.body.operatingHour.tues;
    const tuesOpen = req.body.operatingHour.tues_open;
    const tuesClose = req.body.operatingHour.tues_close;
    const wed = req.body.operatingHour.wed;
    const wedOpen = req.body.operatingHour.wed_open;
    const wedClose = req.body.operatingHour.wed_close;
    const thur = req.body.operatingHour.thur;
    const thurOpen = req.body.operatingHour.thur_open;
    const thurClose = req.body.operatingHour.thur_close;
    const fri = req.body.operatingHour.fri;
    const friOpen = req.body.operatingHour.fri_open;
    const friClose = req.body.operatingHour.fri_close;
    const sat = req.body.operatingHour.sat;
    const satOpen = req.body.operatingHour.sat_open;
    const satClose = req.body.operatingHour.sat_close;
    const sun = req.body.operatingHour.sun;
    const sunOpen = req.body.operatingHour.sun_open;
    const sunClose = req.body.operatingHour.sun_close;
    const operatingHourId = req.params.operatingHourId;

    const operatingHour = await operatingHourDb
      .updateOperatingHour(
        shopId,
        mon,
        monOpen,
        monClose,
        tues,
        tuesOpen,
        tuesClose,
        wed,
        wedOpen,
        wedClose,
        thur,
        thurOpen,
        thurClose,
        fri,
        friOpen,
        friClose,
        sat,
        satOpen,
        satClose,
        sun,
        sunOpen,
        sunClose,
        operatingHourId
      )
      .then(() => {
        return operatingHourDb.getById(operatingHourId);
      });
    res.json({ operatingHour: operatingHour });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

operatingHourRouter.delete("/:operatingHourId", async (req, res, next) => {
  try {
    const operatingHourId = req.params.operatingHourId;
    const response = await operatingHourDb.deleteOperatingHour(operatingHourId);
    return res.sendStatus(204);
  } catch (e) {
    console.log(e);
  }
});

module.exports = operatingHourRouter;
