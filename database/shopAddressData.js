const pool = require("./db.js");

let address = {};

address.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM shop_address ", (error, addresses) => {
      if (error) {
        return reject(error);
      }
      return resolve(addresses);
    });
  });
};

address.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM shop_address WHERE address_id= ?",
      [id],
      (error, address) => {
        if (error) {
          return reject(error);
        }
        return resolve(address);
      }
    );
  });
};

address.getByShopId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM shop_address WHERE shop_id= ?",
      [id],
      (error, address) => {
        if (error) {
          return reject(error);
        }
        return resolve(address);
      }
    );
  });
};

address.insertAddress = (shopId, address, postcode, latitude, longitude) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO shop_address (shop_id, address_id, address, postcode, latitude, longitude) VALUES (?, NULL, ?, ?, ?, ?)",
      [shopId, address, postcode, latitude, longitude],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.insertId);
      }
    );
  });
};

address.updateAddress = (
  shopId,
  address,
  postcode,
  latitude,
  longitude,
  addressId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE shop_address SET shop_id = ?, address = ?, postcode = ?, latitude = ?, longitude = ? WHERE address_id = ?",
      [shopId, address, postcode, latitude, longitude, addressId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

address.deleteAddress = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM shop_address WHERE address_id= ?",
      [id],
      (error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};

module.exports = address;
