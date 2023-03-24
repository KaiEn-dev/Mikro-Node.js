const pool = require("./db.js");

let deliveryMode = {};

deliveryMode.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM delivery_mode ", (error, deliverModes) => {
      if (error) {
        return reject(error);
      }
      return resolve(deliverModes);
    });
  });
};

deliveryMode.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM delivery_mode WHERE dm_id= ?",
      [id],
      (error, deliveryMode) => {
        if (error) {
          return reject(error);
        }
        return resolve(deliveryMode);
      }
    );
  });
};

deliveryMode.getByShopId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM delivery_mode WHERE shop_id= ?",
      [id],
      (error, deliveryMode) => {
        if (error) {
          return reject(error);
        }
        return resolve(deliveryMode);
      }
    );
  });
};

deliveryMode.insertDeliveryMode = (
  shopId,
  delivery,
  deliveryTime,
  pickup,
  pickupTime
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO delivery_mode (shop_id, dm_id, delivery, delivery_time, pickup, pickup_time) VALUES (?, NULL, ?, ?, ?, ?)",
      [shopId, delivery, deliveryTime, pickup, pickupTime],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.insertId);
      }
    );
  });
};

deliveryMode.updateDeliveryMode = (
  shopId,
  delivery,
  deliveryTime,
  pickup,
  pickupTime,
  deliveryModeId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE delivery_mode SET shop_id = ?, delivery = ?, delivery_time = ?, pickup = ?, pickup_time = ? WHERE dm_id = ?",
      [shopId, delivery, deliveryTime, pickup, pickupTime, deliveryModeId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

deliveryMode.deleteDeliveryMode = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM delivery_mode WHERE dm_id= ?", [id], (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

module.exports = deliveryMode;
