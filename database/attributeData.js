const pool = require("./db.js");

let attributeData = {};

attributeData.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM attribute ", (error, attributesData) => {
      if (error) {
        return reject(error);
      }
      return resolve(attributesData);
    });
  });
};

attributeData.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM attribute WHERE a_id= ?",
      [id],
      (error, attributeData) => {
        if (error) {
          return reject(error);
        }
        return resolve(attributeData);
      }
    );
  });
};

attributeData.getByCategoryId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM attribute WHERE a_category_id= ?",
      [id],
      (error, attributesData) => {
        if (error) {
          return reject(error);
        }
        return resolve(attributesData);
      }
    );
  });
};

attributeData.insertAttribute = (
  categoryId,
  attributeName,
  charge,
  availability
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO attribute (a_category_id, a_id, a_name, charge, availability) VALUES (?,NULL,?,?,?)",
      [categoryId, attributeName, charge, availability],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.insertId);
      }
    );
  });
};

attributeData.updateAttribute = (
  categoryId,
  attributeName,
  charge,
  availability,
  attributeId
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE attribute SET a_category_id=?, a_name=?, charge=?, availability=? WHERE a_id=?",
      [categoryId, attributeName, charge, availability, attributeId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

attributeData.deleteAttribute = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM attribute WHERE a_id= ?", [id], (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

module.exports = attributeData;
