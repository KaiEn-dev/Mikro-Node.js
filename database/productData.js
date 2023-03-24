const pool = require("./db.js");

let product = {};

product.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM product ", (error, products) => {
      if (error) {
        return reject(error);
      }
      return resolve(products);
    });
  });
};

product.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM product WHERE product_id= ?",
      [id],
      (error, product) => {
        if (error) {
          return reject(error);
        }
        return resolve(product);
      }
    );
  });
};

product.getByShopId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM product WHERE shop_id= ?",
      [id],
      (error, products) => {
        if (error) {
          return reject(error);
        }
        return resolve(products);
      }
    );
  });
};

product.insertProduct = (
  shopId,
  productName,
  productImage,
  productDescription,
  price,
  productAttribute,
  availability
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO product (shop_id, product_id, product_name, product_image, product_description, price, product_attribute, availability) VALUES (?, NULL, ?, ?, ?, ?, ?, ?)",
      [
        shopId,
        productName,
        productImage,
        productDescription,
        price,
        productAttribute,
        availability,
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

product.updateProduct = (
  shopId,
  productName,
  productImage,
  productDescription,
  price,
  productAttribute,
  availability,
  productId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE product SET shop_id = ?, product_name = ?, product_image = ?, product_description = ?, price = ?, product_attribute = ?, availability = ? WHERE product_id = ?",
      [
        shopId,
        productName,
        productImage,
        productDescription,
        price,
        productAttribute,
        availability,
        productId,
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

product.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM product WHERE product_id = ?", [id], (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

module.exports = product;
