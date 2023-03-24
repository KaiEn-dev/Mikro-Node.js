const pool = require("./db.js");

let orderMode = {};

orderMode.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM order_mode ", (error, orderModes) => {
      if (error) {
        return reject(error);
      }
      return resolve(orderModes);
    });
  });
};

orderMode.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM order_mode WHERE om_id= ?",
      [id],
      (error, orderMode) => {
        if (error) {
          return reject(error);
        }
        return resolve(orderMode);
      }
    );
  });
};

orderMode.getByShopId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM order_mode WHERE shop_id= ?",
      [id],
      (error, ordermode) => {
        if (error) {
          return reject(error);
        }
        return resolve(ordermode);
      }
    );
  });
};

orderMode.insertOrderMode = (shopId, orderNow, preorder, preorderOption) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO order_mode (shop_id, om_id, order_now, preorder, preorder_option) VALUES (?, NULL, ?, ?, ?)",
      [shopId, orderNow, preorder, preorderOption],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.insertId);
      }
    );
  });
};

orderMode.updateOrderMode = (
  shopId,
  orderNow,
  preorder,
  preorderOption,
  orderModeId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE order_mode SET shop_id = ?, order_now = ?, preorder = ?, preorder_option = ? WHERE om_id = ?",
      [shopId, orderNow, preorder, preorderOption, orderModeId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

orderMode.deleteOrderMode = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM order_mode WHERE om_id= ?", [id], (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

module.exports = orderMode;
