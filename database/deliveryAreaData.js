const pool = require("./db.js");

let deliveryArea = {};

deliveryArea.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM delivery_area ", (error, deliveryAreas) => {
      if (error) {
        return reject(error);
      }
      return resolve(deliveryAreas);
    });
  });
};

deliveryArea.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM delivery_area WHERE da_id= ?",
      [id],
      (error, deliveryArea) => {
        if (error) {
          return reject(error);
        }
        return resolve(deliveryArea);
      }
    );
  });
};

deliveryArea.getByShopId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM delivery_area WHERE shop_id= ?",
      [id],
      (error, deliveryArea) => {
        if (error) {
          return reject(error);
        }
        return resolve(deliveryArea);
      }
    );
  });
};

deliveryArea.insertDeliveryArea = (shopId, wholeMalaysia, area) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO delivery_area (shop_id, da_id, whole_malaysia, area) VALUES (?, NULL, ?, ?)",
      [shopId, wholeMalaysia, area],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.insertId);
      }
    );
  });
};

deliveryArea.updateDeliveryArea = (
  shopId,
  wholeMalaysia,
  area,
  deliveryAreaId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE delivery_area SET shop_id = ?, whole_malaysia= ?, area = ? WHERE da_Id = ?",
      [shopId, wholeMalaysia, area, deliveryAreaId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

deliveryArea.updateAreaByShop = (wholeMalaysia, area, shopId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE delivery_area SET whole_malaysia= ?, area = ? WHERE shop_Id = ?",
      [wholeMalaysia, area, shopId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

deliveryArea.deleteDeliveryArea = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM delivery_area WHERE da_id= ?", [id], (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

module.exports = deliveryArea;
