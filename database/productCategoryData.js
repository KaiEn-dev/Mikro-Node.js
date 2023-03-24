const pool = require("./db.js");

let productCategory = {};

productCategory.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM product_category ",
      (error, productCategories) => {
        if (error) {
          return reject(error);
        }
        return resolve(productCategories);
      }
    );
  });
};

productCategory.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM product_category WHERE p_category_id= ?",
      [id],
      (error, productCategory) => {
        if (error) {
          return reject(error);
        }
        return resolve(productCategory);
      }
    );
  });
};

productCategory.getByShopId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM product_category WHERE shop_id= ?",
      [id],
      (error, productCategories) => {
        if (error) {
          return reject(error);
        }
        return resolve(productCategories);
      }
    );
  });
};

productCategory.insertProductCategory = (
  shopId,
  productCategoryName,
  products,
  availability
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO product_category (shop_id, p_category_id, p_category_name, products, availability) VALUES (?, NULL, ?, ?, ?)",
      [shopId, productCategoryName, products, availability],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.insertId);
      }
    );
  });
};

productCategory.updateProductCategory = (
  shopId,
  productCategoryName,
  products,
  availability,
  productCategoryId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE product_category SET shop_id = ?, p_category_name = ?, products = ?, availability = ? WHERE p_category_id = ?",
      [shopId, productCategoryName, products, availability, productCategoryId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

productCategory.updateProductCategoryProducts = (
  products,
  productCategoryId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE product_category SET products = ? WHERE p_category_id = ?",
      [products, productCategoryId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

productCategory.deleteProductCategory = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM product_category WHERE p_category_id= ?",
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

module.exports = productCategory;
