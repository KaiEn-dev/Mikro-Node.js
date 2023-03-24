const pool = require("./db.js");

let shop = {};

shop.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM shop ", (error, shops) => {
      if (error) {
        return reject(error);
      }
      return resolve(shops);
    });
  });
};

shop.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM shop WHERE shop_id= ?", [id], (error, shop) => {
      if (error) {
        return reject(error);
      }
      return resolve(shop);
    });
  });
};

shop.getByUser = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM shop WHERE user_id= ?", [id], (error, shop) => {
      if (error) {
        return reject(error);
      }
      return resolve(shop);
    });
  });
};

shop.insertShop = (
  userId,
  shopName,
  shopImage,
  shopDescription,
  availability,
  productCategory,
  address
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO shop (user_id, shop_id, shop_name, shop_image, shop_description, availability, p_category, address) VALUES (?, NULL, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        shopName,
        shopImage,
        shopDescription,
        availability,
        productCategory,
        address,
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

shop.updateShop = (
  userId,
  shopName,
  shopImage,
  shopDescription,
  availability,
  productCategory,
  address,
  shopId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE shop SET user_id = ?, shop_name = ?, shop_image = ?, shop_description = ?, availability = ?, p_category = ?, address = ? WHERE shop_id = ?",
      [
        userId,
        shopName,
        shopImage,
        shopDescription,
        availability,
        productCategory,
        address,
        shopId,
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

shop.updateShopAddress = (address, shopId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE shop SET address = ? WHERE shop_id = ?",
      [address, shopId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

shop.updateShopLink = (link, shopId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE shop SET shop_link = ? WHERE shop_id = ?",
      [link, shopId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

shop.updateShopAvailability = (availability, shopId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE shop SET availability = ? WHERE shop_id = ?",
      [availability, shopId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

shop.deleteShop = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM shop WHERE shop_id= ?", [id], (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

module.exports = shop;
