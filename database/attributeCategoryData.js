const pool = require("./db.js");

let attributeCategory = {};

attributeCategory.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM attribute_category ",
      (error, attributeCategories) => {
        if (error) {
          return reject(error);
        }
        return resolve(attributeCategories);
      }
    );
  });
};

attributeCategory.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM attribute_category WHERE a_category_id= ?",
      [id],
      (error, attributeCategory) => {
        if (error) {
          return reject(error);
        }
        return resolve(attributeCategory);
      }
    );
  });
};

attributeCategory.getByShopId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM attribute_category WHERE shop_id= ?",
      [id],
      (error, attributeCategory) => {
        if (error) {
          return reject(error);
        }
        return resolve(attributeCategory);
      }
    );
  });
};

attributeCategory.insertAttributeCategory = (
  shopId,
  attributeCategoryName,
  note,
  optional,
  minimum,
  maximum,
  attributes,
  availability,
  products
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO attribute_category (shop_id,a_category_id, a_category_name, note, optional, minimum, maximum, attributes, availability, products) VALUES (?,NULL, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        shopId,
        attributeCategoryName,
        note,
        optional,
        minimum,
        maximum,
        attributes,
        availability,
        products,
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

attributeCategory.updateAttributeCategory = (
  attributeCategoryName,
  note,
  optional,
  minimum,
  maximum,
  attributes,
  availability,
  attributeCategoryId,
  products
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE attribute_category SET a_category_name = ?, note = ?, optional = ?, minimum = ?, maximum = ?, attributes = ?, availability = ?, products = ? WHERE a_category_id = ?",
      [
        attributeCategoryName,
        note,
        optional,
        minimum,
        maximum,
        attributes,
        availability,
        attributeCategoryId,
        products,
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

attributeCategory.updateAttributeCategoryProducts = (
  attributeCategoryId,
  products
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE attribute_category SET products = ? WHERE a_category_id = ?",
      [attributeCategoryId, products],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

attributeCategory.deleteAttributeCategory = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM attribute_category WHERE a_category_id= ?",
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

module.exports = attributeCategory;
