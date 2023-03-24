const pool = require("./db.js");

let image = {};

image.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM image ", (error, images) => {
      if (error) {
        return reject(error);
      }
      return resolve(images);
    });
  });
};

image.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM image WHERE image_id= ?",
      [id],
      (error, image) => {
        if (error) {
          return reject(error);
        }
        return resolve(image);
      }
    );
  });
};

image.insertImage = (imageLink) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO image (image_id, image_link) VALUES (NULL, ?)",
      [imageLink],
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.insertId);
      }
    );
  });
};

image.updateImage = (imageLink, imageId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE image SET image_link = ? WHERE image_id = ?",
      [imageLink, imageId],
      (error) => {
        if (error) {
          return reject(error);
        }

        return resolve();
      }
    );
  });
};

image.deleteImage = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM image WHERE image_id= ?", [id], (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

module.exports = image;
