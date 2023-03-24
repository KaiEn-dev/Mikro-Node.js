const pool = require("./db.js");

let operatingHour = {};

operatingHour.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM operating_hours ", (error, operatingHours) => {
      if (error) {
        return reject(error);
      }
      return resolve(operatingHours);
    });
  });
};

operatingHour.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM operating_hours WHERE oh_id= ?",
      [id],
      (error, operatingHour) => {
        if (error) {
          return reject(error);
        }
        return resolve(operatingHour);
      }
    );
  });
};

operatingHour.getByShopId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM operating_hours WHERE shop_id= ?",
      [id],
      (error, operatingHours) => {
        if (error) {
          return reject(error);
        }
        return resolve(operatingHours);
      }
    );
  });
};

operatingHour.insertOperatingHour = (
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
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO operating_hours (shop_id, oh_id, mon, mon_open, mon_close, tues, tues_open, tues_close, wed, wed_open, wed_close, thur, thur_open, thur_close, fri, fri_open, fri_close, sat, sat_open, sat_close, sun, sun_open, sun_close) VALUES (?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
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
      ],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.insertId);
      }
    );
  });
};

operatingHour.updateOperatingHour = (
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
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE operating_hours SET shop_id = ?, mon = ?, mon_open = ?, mon_close = ?, tues = ?, tues_open = ?, tues_close = ?, wed = ?, wed_open = ?, wed_close = ?, thur = ?, thur_open = ?, thur_close = ?, fri = ?, fri_open = ?, fri_close = ?, sat = ?, sat_open = ?, sat_close = ?, sun = ?, sun_open = ?, sun_close = ? WHERE oh_id = ?",
      [
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
        operatingHourId,
      ],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

operatingHour.deleteOperatingHour = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM operating_hours WHERE oh_id= ?", [id], (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

module.exports = operatingHour;
